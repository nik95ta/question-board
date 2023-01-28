import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { renderTime, renderDate } from "../common/DateTime";

const QuestionComponent = () => {
  const questions = useSelector((state) => state.allQuestions.questions);
  if (questions != null) {
    const renderList = questions.map((question) => {
      const { id, title, description, dateTime, answersCount } = question;
      return (
        <>

<div className="bg-gray-100 shadow w-full m-8 rounded-xl" key={id}>
<nav className="bg-white py-2 md:py-4 rounded-xl">
      <div className="container px-12 mx-auto md:flex md:items-center">

        <div
          className="hidden md:flex flex-auto md:ml-auto mt-3 md:mt-0 flex items-center"
          id="navbar-collapse "
        >

           <p className="mr-6">answer: {answersCount}</p>
             <p
            href="#"
            className="md:mx-2 font-bold"
          >
           <span className="text-gray-400">تاریخ:</span>  {renderDate(dateTime)}
          </p>
          <div className="h-[20px] bg-gray-200 w-[1px] mx-6"></div>
          <p
            href="#"
            className="md:mx-2 font-bold"
          >
           <span className="text-gray-400">ساعت:</span>  {renderTime(dateTime)}
          </p>

        </div>
        <ul className="hidden md:flex flex-col md:flex-row space-x-6 items-center">
          <li className="text-black-600 font-bold" style={{direction:'rtl'}}> {description}</li>{" "}

            <li className="rounded-lg">
          <img src="https://www.soccerbible.com/media/55837/ramos-interview-4.jpg" className="object-contain rounded-lg w-16 h-16" />
          </li>
        </ul>
      </div>
    </nav>
              <div className=" mx-12 my-6">

                <div className="text-right">{title} </div>{" "}
                <button className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 leading-3 text-green-600 border border-2 font-bold border-green-600 bg-transparent cursor-pointer px-4 py-3 font-normal shadow-md rounded-lg flex my-8">
                <Link className="font-bold" to={`/question/${id}`}>

مشاهده جزییات        </Link>  </button>
          </div>
        </div>
        </>
      );
    });

    return <> {renderList} </>;
  }
};

export default QuestionComponent;
