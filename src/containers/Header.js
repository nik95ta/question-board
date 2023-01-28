import React, { useState } from "react";
import QuestionAddModal from "./QuestionAddModal";
import { useHistory } from "react-router-dom";
import GIRL from "../assets/girl.svg";

const Header = () => {
  const [showModal, setShowModal] = useState(false);
  const history = useHistory();

  return (
    <>
    <nav className="bg-white shadow py-4">
      <div className="container px-12 mx-auto md:flex md:items-center">
        <ul className="hidden md:flex flex-auto space-x-6 items-center">
          <li className="text-black-600 font-bold"> نیکتا هاشمی </li>
          <li>
           <img src={GIRL} alt="girl" />
          </li>
          <button onClick={() => setShowModal(true)} className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 leading-3 text-white bg-green-600 cursor-pointer px-6 py-3 font-normal shadow-md rounded display-flex">
            سوال جدید +
          </button>
          <QuestionAddModal show={showModal} onClose={() => setShowModal(false)} />
        </ul>
        <div
          className="hidden md:flex flex-col md:flex-row md:ml-auto mt-3 md:mt-0"
          id="navbar-collapse"
        >
          <h1
            className=" text-4xl font-bold"
          >
            لیست سوالات
          </h1>
        </div>
      </div>
    </nav>

    </>
  );
};

export default Header;
