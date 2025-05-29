import React from "react";
import { CONTACT_INFO } from "../utils/index.js";
function Footer() {
  return (
    <>
      <footer className="max-w-7xl mx-auto" id="contact">
        <div className="my-20">
          <h2 className="text-xl lg:text-3xl tracking-tight text-center uppercase mb-12">
            Contact Us
          </h2>
          <p className="mxx-w-2xl text-lg mb-12 text-center mx-auto">
            {CONTACT_INFO.text}
          </p>
          <div className="flex flex-col lg:flex-row justify-around mx-4">
            <div className="flex mb-8 lg:mb-0">
              <p className="text-3xl mr-4">☎️</p>
              <div>
                <p className="text-lg font-semibold">
                  {CONTACT_INFO.phone.label}
                </p>
                <p className="text-neutral-600">{CONTACT_INFO.phone.value}</p>
              </div>
            </div>
            <div className="flex mb-8 lg:mb-0">
              <p className="text-3xl mr-4">📧</p>
              <div>
                <p className="text-lg font-semibold">
                  {CONTACT_INFO.email.label}
                </p>
                <p className="text-neutral-600">{CONTACT_INFO.email.value}</p>
              </div>
            </div>
            <div className="flex ">
              <p className="text-3xl mr-4">🗺️</p>
              <div>
                <p className="text-lg font-semibold">
                  {CONTACT_INFO.address.label}
                </p>
                <p className="text-neutral-600">{CONTACT_INFO.address.value}</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
