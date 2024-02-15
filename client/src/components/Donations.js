import React from "react";

export default function Donations() {
  return (
    <div className="min-h-screen flex flex-col mt-28 m-auto items-center">
      <h1 className="text-4xl text-marron">Donations</h1>

      <p className="text-xl text-justify mt-4 max-w-xs sm:max-w-xl">
        We are a non-profit organization and we rely on donations to keep our
        website running. If you would like to donate, please click the button
        below. Thank you for your support!
      </p>
      <button className="bg-marron hover:bg-marron hover:bg-opacity-85 text-white p-4 rounded-lg mt-4">
        Help the world!
      </button>

      <hr className="w-[50%] m-auto mt-8 mb-4 bg-noir block h-0.5 opacity-40" />

      <div className="flex flex-col text-center gap-4 mt-8">
        <h2 className="text-3xl text-marron">Our Collaborators</h2>
        <p className="text-xl text-justify mt-4 max-w-xs sm:max-w-xl">
          We aren't alone in this fight. We have the support of many
          organizations and individuals who believe in our cause. Associations,
          companies, and individuals who have helped us in our mission to
          protect the environment. We are grateful for their support and
          collaboration. Don't hesitate to help them as well!
        </p>

        <div className="flex gap-4 mt-8 m-auto">
          <div className="flex gap-4">
            <img
              src="https://www.irishecologicalassociation.org/authors/admin/avatar_hu136b233a79d8748394b69d660ed6bf8f_20151_250x250_fill_q90_lanczos_center.jpg"
              alt="avatar"
              className="w-20 h-20 rounded-full cursor-pointer"
            />
          </div>
          <div className="flex gap-4">
            <img
              src="https://www.ensemblepourlesanimaux.org/wp-content/uploads/2017/06/logo-wwf.jpg"
              alt="avatar"
              className="w-20 h-20 rounded-full cursor-pointer"
            />
          </div>
          <div className="flex gap-4">
            <img
              src="https://www.grainepaca.org/wp-content/uploads/2018/03/greenpeace-logo.jpg"
              alt="avatar"
              className="w-20 h-20 rounded-full cursor-pointer"
            />
          </div>
        </div>
      </div>

      <hr className="w-[50%] m-auto mt-8 mb-4 bg-noir block h-0.5 opacity-40" />

      <div className="flex flex-col gap-4 mt-8 justify-center items-center">
        <h2 className="text-3xl text-marron">Our Donors</h2>
        <div className="grid grid-cols-2 gap-2 mt-8">
          <div className="flex flex-col gap-4 items-center justify-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/1077/1077114.png"
              alt="avatar"
              className="w-20 h-20 rounded-full"
            />
            <p>Ahmed Khan</p>
          </div>
          <div className="flex flex-col gap-4 items-center justify-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/1077/1077114.png"
              alt="avatar"
              className="w-20 h-20 rounded-full"
            />
            <p>Sofia Rodriguez</p>
          </div>
          <div className="flex flex-col gap-4 items-center justify-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/1077/1077114.png"
              alt="avatar"
              className="w-20 h-20 rounded-full"
            />
            <p>Yuki Tanaka</p>
          </div>
          <div className="flex flex-col gap-4 items-center justify-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/1077/1077114.png"
              alt="avatar"
              className="w-20 h-20 rounded-full"
            />
            <p>Maria Silva</p>
          </div>
          <div className="flex flex-col gap-4 items-center justify-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/1077/1077114.png"
              alt="avatar"
              className="w-20 h-20 rounded-full"
            />
            <p>Chinonso Okonkwo</p>
          </div>
          <div className="flex flex-col gap-4 items-center justify-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/1077/1077114.png"
              alt="avatar"
              className="w-20 h-20 rounded-full"
            />
            <p>Ayumi Kimura</p>
          </div>
          <div className="flex flex-col gap-4 items-center justify-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/1077/1077114.png"
              alt="avatar"
              className="w-20 h-20 rounded-full"
            />
            <p>Antonio Lopez</p>
          </div>
          <div className="flex flex-col gap-4 items-center justify-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/1077/1077114.png"
              alt="avatar"
              className="w-20 h-20 rounded-full"
            />
            <p>Lina Petrov</p>
          </div>
          <div className="flex flex-col gap-4 items-center justify-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/1077/1077114.png"
              alt="avatar"
              className="w-20 h-20 rounded-full"
            />
            <p>Mohammed Al-Farsi</p>
          </div>
          <div className="flex flex-col gap-4 items-center justify-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/1077/1077114.png"
              alt="avatar"
              className="w-20 h-20 rounded-full"
            />
            <p>Isabella da Silva</p>
          </div>
          <div className="flex flex-col gap-4 items-center justify-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/1077/1077114.png"
              alt="avatar"
              className="w-20 h-20 rounded-full"
            />
            <p>Kazuki Yamamoto</p>
          </div>
          <div className="flex flex-col gap-4 items-center justify-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/1077/1077114.png"
              alt="avatar"
              className="w-20 h-20 rounded-full"
            />
            <p>Camila Hernandez</p>
          </div>
        </div>

        <hr className="w-[50%] m-auto mt-8 mb-4 bg-noir block h-0.5 opacity-40" />

        <p className="text-xl text-justify mt-4 mb-4 max-w-xs sm:max-w-xl">
          And more... We are grateful for the support of our donors. Thanks to
          them, we can continue our mission to protect the environment. Don't
          hesitate to join them!
        </p>
      </div>
    </div>
  );
}
