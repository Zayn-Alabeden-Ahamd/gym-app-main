// شرح لل functions

/*
 دالة exercisesFlattener(exercisesObj) - تسوية التمارين
هذه الدالة هي جزء ذكي يقوم بإنشاء تمارين "جديدة" من "تنوعات" التمارين الموجودة.

الهدف: إذا كان لديك تمرين مثل dumbbell_bench_press وله عدة variants (مثل incline, horizontal, decline)، فهذه الدالة تقوم بتحويل كل variant إلى تمرين منفصل بذاته (مثال: incline_dumbbell_bench_press, horizontal_dumbbell_bench_press).
كيف تعمل؟
تقوم بإنشاء كائن فارغ جديد flattenedObj لتخزين التمارين المسطحة.
تتكرر على كل تمرين في exercisesObj (التمارين الأصلية).
التحقق من variants:
إذا كان التمرين ليس لديه variants أو كان كائن variants فارغًا، يتم إضافته كما هو إلى flattenedObj.
إذا كان لديه variants:
تقوم بالدوران على كل variant داخل التمرين.
لكل variant:
يتم إنشاء اسم تمرين جديد (newExerciseName) عن طريق دمج اسم الـ variant مع اسم التمرين الأصلي (مثال: incline + barbell_bench_press يصبح incline_barbell_bench_press).
يتم دمج وصف الـ variant مع الوصف الأصلي للتمرين.
يتم إنشاء قائمة substitutes (بدائل) جديدة لهذا التمرين المسطح:
تبدأ بالبدائل الموجودة (existingSubstitutes).
تضيف إليها جميع الـ variants الأخرى لنفس التمرين الأصلي، ولكن بأسماءها المسطحة الجديدة (مثال: إذا كنت في incline_barbell_bench_press، فستكون flat_barbell_bench_press و decline_barbell_bench_press بدائل).
تستخدم new Set لإزالة أي تكرارات في قائمة البدائل.
يتم تقييد قائمة البدائل إلى أول 5 عناصر (.slice(0, 5)).
يتم إضافة هذا التمرين الجديد المسطح إلى flattenedObj مع جميع خصائص التمرين الأصلي، وتحديث الوصف والبدائل.
الناتج: كائن جديد يحتوي على جميع التمارين، مع فصل الـ variants كتمارين مستقلة. هذا يجعل من السهل اختيار أي "نسخة" من التمرين بشكل مباشر لاحقًا.
*/

function exercisesFlattener(exercisesObj) {
  const flattenedObj = {};

  for (const [key, val] of Object.entries(exercisesObj)) {
    if (!("variants" in val) || Object.keys(val.variants).length === 0) {
      flattenedObj[key] = val;
    } else {
      for (const variantNameFromDb in val.variants) {
        let descriptionFromVariant = val.variants[variantNameFromDb];

        let newExerciseName = `${variantNameFromDb}_${key}`;

        let existingSubstitutes = val.substitutes || [];

        let variantSubstitutes = Object.keys(val.variants)
          .map((element) => {
            return `${element}_${key}`;
          })
          .filter((element) => element !== newExerciseName);

        flattenedObj[newExerciseName] = {
          ...val,
          description: val.description + "___" + descriptionFromVariant,
          substitutes: [
            ...new Set([...existingSubstitutes, ...variantSubstitutes]),
          ].slice(0, 5),
        };
      }
    }
  }
  return flattenedObj;
}

export let EXERCISES = {};
export let SCHEMES = {};
export let TEMPOS = [];
export let WORKOUTS = {};

export async function fetchAllWorkoutData() {
  try {
    // جلب التمارين
    const exercisesResponse = await fetch(
      "http://localhost:8000/api/exercises/"
    );
    const exercisesData = await exercisesResponse.json();

    EXERCISES = exercisesData.reduce((acc, exercise) => {
      const formattedExercise = {
        type: exercise.exercise_type,
        meta: {
          environment: exercise.environment,
          level: exercise.level,
          equipment: exercise.equipment,
        },
        unit: exercise.unit,
        muscles: exercise.muscles.map((m) => m.name),
        description: exercise.description,
        substitutes: exercise.substitutes,
        variants: exercise.variants.reduce((vAcc, v) => {
          vAcc[v.name] = v.description;
          return vAcc;
        }, {}),
      };
      acc[exercise.name] = formattedExercise;
      return acc;
    }, {});
    EXERCISES = exercisesFlattener(EXERCISES);

    // جلب المخططات (Schemes)
    const schemesResponse = await fetch("http://localhost:8000/api/schemes/");
    const schemesData = await schemesResponse.json();
    SCHEMES = schemesData.reduce((acc, scheme) => {
      acc[scheme.name] = {
        repRanges: scheme.repRanges,
        ratio: scheme.ratio,
        rest: scheme.rest,
      };
      return acc;
    }, {});

    const workoutsResponse = await fetch("http://localhost:8000/api/workouts/");
    const workoutsData = await workoutsResponse.json();
    WORKOUTS = workoutsData.reduce((acc, workoutType) => {
      if (workoutType.is_individual) {
        acc[workoutType.name] = {};
      } else {
        const subTypeMuscles = {};
        workoutType.sub_types.forEach((subType) => {
          subTypeMuscles[subType.name] = subType.muscles.map((m) => m.name);
        });
        acc[workoutType.name] = subTypeMuscles;
      }
      return acc;
    }, {});

    const temposResponse = await fetch("http://localhost:8000/api/tempos/");
    const temposData = await temposResponse.json();
    TEMPOS = temposData.map((tempo) => tempo.value);

    console.log("Workout data fetched successfully!");
  } catch (error) {
    console.error("Error fetching workout data:", error);
  }
}

let exercises = {};

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

export function generateWorkout(args) {
  exercises = exercisesFlattener(EXERCISES);

  const { muscles, poison: workout, goal } = args;
  let exer = Object.keys(exercises);
  exer = exer.filter((key) => exercises[key].meta.environment !== "home");
  let includedTracker = [];
  let numSets = 5;
  let listOfMuscles;

  if (workout === "individual") {
    listOfMuscles = muscles;
  } else {
    listOfMuscles =
      WORKOUTS[workout] && WORKOUTS[workout][muscles[0]]
        ? WORKOUTS[workout][muscles[0]]
        : [];
  }

  if (!listOfMuscles || listOfMuscles.length === 0) {
    console.warn(
      "No muscle groups found for the selected workout type and muscle."
    );
    return [];
  }

  listOfMuscles = new Set(shuffleArray(listOfMuscles));
  let arrOfMuscles = Array.from(listOfMuscles);
  let scheme = goal;
  let sets = SCHEMES[scheme].ratio
    .reduce((acc, curr, index) => {
      return [
        ...acc,
        ...[...Array(parseInt(curr)).keys()].map((val) =>
          index === 0 ? "compound" : "accessory"
        ),
      ];
    }, [])
    .reduce((acc, curr, index) => {
      const muscleGroupToUse =
        index < arrOfMuscles.length
          ? arrOfMuscles[index]
          : arrOfMuscles[index % arrOfMuscles.length];
      return [
        ...acc,
        {
          setType: curr,
          muscleGroup: muscleGroupToUse,
        },
      ];
    }, []);

  const { compound: compoundExercises, accessory: accessoryExercises } =
    exer.reduce(
      (acc, curr) => {
        let exerciseHasRequiredMuscle = false;
        for (const musc of exercises[curr].muscles) {
          if (listOfMuscles.has(musc)) {
            exerciseHasRequiredMuscle = true;
          }
        }
        return exerciseHasRequiredMuscle
          ? {
              ...acc,
              [exercises[curr].type]: {
                ...acc[exercises[curr].type],
                [curr]: exercises[curr],
              },
            }
          : acc;
      },
      { compound: {}, accessory: {} }
    );

  const genWOD = sets.map(({ setType, muscleGroup }) => {
    const data =
      setType === "compound" ? compoundExercises : accessoryExercises;
    const filteredObj = Object.keys(data).reduce((acc, curr) => {
      if (
        includedTracker.includes(curr) ||
        !data[curr].muscles.includes(muscleGroup)
      ) {
        return acc;
      }
      return { ...acc, [curr]: exercises[curr] };
    }, {});
    const filteredDataList = Object.keys(filteredObj);
    const filteredOppList = Object.keys(
      setType === "compound" ? accessoryExercises : compoundExercises
    ).filter((val) => !includedTracker.includes(val));

    let randomExercise =
      filteredDataList[Math.floor(Math.random() * filteredDataList.length)] ||
      filteredOppList[Math.floor(Math.random() * filteredOppList.length)];

    if (!randomExercise) {
      return {};
    }

    let repsOrDuraction =
      exercises[randomExercise].unit === "reps"
        ? Math.min(...SCHEMES[scheme].repRanges) +
          Math.floor(
            Math.random() *
              (Math.max(...SCHEMES[scheme].repRanges) -
                Math.min(...SCHEMES[scheme].repRanges))
          ) +
          (setType === "accessory" ? 4 : 0)
        : Math.floor(Math.random() * 40) + 20;
    const tempo = TEMPOS[Math.floor(Math.random() * TEMPOS.length)];

    if (exercises[randomExercise].unit === "reps") {
      const tempoSum = tempo
        .split(" ")
        .reduce((acc, curr) => acc + parseInt(curr), 0);
      if (tempoSum * parseInt(repsOrDuraction) > 85) {
        repsOrDuraction = Math.floor(85 / tempoSum);
      }
    } else {
      repsOrDuraction = Math.ceil(parseInt(repsOrDuraction) / 5) * 5;
    }
    includedTracker.push(randomExercise);

    return {
      name: randomExercise,
      tempo,
      rest: SCHEMES[scheme]["rest"][setType === "compound" ? 0 : 1],
      reps: repsOrDuraction,
      ...exercises[randomExercise],
    };
  });

  return genWOD.filter((element) => Object.keys(element).length > 0);
}
