import React, { useState } from "react";
import QuestionAddModal from "./QuestionAddModal";
import { useHistory, useLocation } from "react-router-dom";
import GIRL from "../assets/girl.svg";

const Header = () => {
  const [showModal, setShowModal] = useState(false);
  const history = useHistory();
  const location = useLocation();

  const renderHeader = () => {
     if (location && location.pathname.includes('question')) {
      return 'جزئیات سوال';
     } else {
       return 'لیست سوالات';
     }
  };

  return (
    <>
    <nav className="bg-white shadow py-4">
      <div className="container px-12 mx-auto md:flex md:items-center">
        <ul className="hidden md:flex flex-auto space-x-6 items-center">
          <li className="text-black-600 font-bold"> نیکتا هاشمی </li>
          <li>
           <img src={GIRL} alt="girl" />
          </li>
          <button onClick={() => setShowModal(true)} className="leading-3 text-white bg-green-600 cursor-pointer px-6 py-3 font-normal shadow-md rounded display-flex">
            سوال جدید +
          </button>
          <QuestionAddModal show={showModal} onClose={() => setShowModal(false)} />
        </ul>
        <div
          className="hidden md:flex flex-col md:flex-row md:ml-auto mt-3 md:mt-0"
          id="navbar-collapse"
        >
          <h1
          style={{fontFamily:'IRANYekan'}}
            className=" text-4xl font-bold font-IRANYekan">
            {renderHeader()}
          </h1>
        </div>
      </div>
    </nav>

    </>
  );
};

export default Header;
