from django.contrib import admin
from django.contrib.auth.forms import UserCreationForm, UserChangeForm
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from api.models import User, Profile


class CustomUserAdmin(BaseUserAdmin):
    add_form = UserCreationForm
    form = UserChangeForm
    model = User
    list_display = ['username', 'email', 'is_staff', 'is_active']
    list_filter = ['is_staff', 'is_superuser', 'is_active']
    fieldsets = BaseUserAdmin.fieldsets
    add_fieldsets = BaseUserAdmin.add_fieldsets
    search_fields = ['username', 'email']
    ordering = ['username']


class ProfileAdmin(admin.ModelAdmin):
    list_editable = ['verified']
    list_display = ['user', 'full_name', 'verified']


admin.site.register(User, CustomUserAdmin)
admin.site.register(Profile, ProfileAdmin)
