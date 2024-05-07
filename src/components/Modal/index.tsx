import { useState } from "react";
import { countries } from "@/utils/countries";
interface ModalProps {
  imageUrl: string;
  nickname: string;
  introduce: string;
  language: string[];
  major: string;
  country: string;
}

export default function Modal({
  imageUrl,
  nickname,
  introduce,
  language,
  major,
  country,
}: ModalProps) {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      {imageUrl ? (
        <img
          className="object-cover object-center shadow-lg rounded-lg"
          // src={imageUrl}
          // src={`${import.meta.env.VITE_SERVER_HOST}:${
          //   import.meta.env.VITE_SERVER_PORT
          // }/uploads/${imageUrl}`}
          src={imageUrl}
          onClick={() => setShowModal(true)}
        />
      ) : (
        <span>Loading...</span>
      )}
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">GlobeTalk 🌏</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  ></button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <div className="float-left whitespace-normal ">
                    <span className="text-lg text-blue-800">Name </span>
                    <span>| {nickname}</span>
                  </div>
                  <br />
                  <br />
                  <div className="float-left whitespace-normal ">
                    <span className="text-lg text-blue-800">Country </span>
                    <span>
                      | {country} {}
                    </span>
                  </div>
                  <br />
                  <br />
                  <div className="float-left">
                    <span className="text-lg text-blue-800">Languages </span>
                    <span>
                      |
                      {language.map((lan) => {
                        if (lan === "en") return " 🇺🇸 ";
                        if (lan === "ja") return " 🇯🇵 ";
                        if (lan === "ko") return " 🇰🇷 ";
                        if (lan === "zh") return " 🇨🇳 ";
                        if (lan === "es") return " 🇪🇸 ";
                        if (lan === "fr") return " 🇫🇷 ";
                        if (lan === "de") return " 🇩🇪 ";
                      })}
                    </span>
                  </div>
                  <br />
                  <br />
                  <div className="float-left">
                    <span className="text-lg text-blue-800">Major </span>
                    <span>| {major}</span>
                  </div>
                  <br />
                  <br />
                  <div className="float-left">
                    <span className="text-lg text-blue-800">Introduce </span>
                    <span>| {introduce}</span>
                  </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Send Chat Request
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
