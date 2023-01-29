import React from "react";
import axios from "axios";
import BaseApi from "../common/BaseApi";
import { useDispatch, useSelector } from "react-redux";
import { selectedQuestion } from "../redux/actions/questionActions";
import { ActionTypes } from "../redux/constants/action-types";
import { renderDate, renderTime } from "../common/DateTime";
import HAPPY from "../assets/happy.svg";
import SAD from "../assets/sad.svg";
import SAD_2 from "../assets/sad-2.svg";
import MAN from "../assets/man.svg";

const AnswerComponent = (props) => {
  const answer = props.answer;
  const question = useSelector((state) => state.question);

  const dispatch = useDispatch();

  const fetchAnswerScoreUpdate = async (answer, plus, minus) => {
    const response = await axios
      .put(BaseApi + `answers/${answer.id}`, {
        ...answer,
        plus,
        minus,
      })
      .catch((err) => {
        dispatch({
          type: ActionTypes.QUESTIONS_ERROR,
          payload: err,
        });
        console.log("Err", err);
      });
    return response.data;
  };

  const onScoreSubmit = (isPlus) => {
    let plus = answer.plus;
    let minus = answer.minus;
    if (isPlus) {
      plus++;
    } else {
      minus++;
    }
    fetchAnswerScoreUpdate(answer, plus, minus).then((response) => {
      const index = question.answers.findIndex((obj) => obj.id === answer.id);
      question.answers[index] = response;
      dispatch(selectedQuestion(question));
    });
  };

  return (
    <>
      <div className="bg-gray-100 shadow mx-12 my-8 rounded-xl">
        <nav className="bg-white py-2 md:py-4 rounded-xl">
          <div className="container px-12 mx-auto md:flex md:items-center">
            <div
              className="hidden md:flex flex-auto md:ml-auto mt-3 md:mt-0 flex items-center"
              id="navbar-collapse "
            >
              <div className="flex flex-row gap-2 justify-center items-center">{answer.plus} <img src={HAPPY} alt='happy' /></div>
              <div className="mr-16 ml-8 flex flex-row gap-2 justify-center items-center">{answer.minus}  <img src={SAD_2} alt='sad' /></div>
              <p className="font-bold">
                <span className="text-gray-400"> تاریخ: </span>
                {renderDate(answer.dateTime)}
              </p>
              <div className="h-[20px] bg-gray-200 w-[1px] mx-6"> </div>
              <p href="#" className=" font-bold">
                <span className="text-gray-400"> ساعت: </span>
                {renderTime(answer.dateTime)}
              </p>
            </div>
            <ul className="hidden md:flex flex-col md:flex-row space-x-6 items-center">
              <h2
                className="text-black-600 text-lg font-900 font-IRANYekan"
              >
                علی کیا
              </h2>
              <li className="rounded-lg">
                <img
                  src={MAN}
                  alt="man"
                />
              </li>
            </ul>
          </div>
        </nav>
        <div className=" mx-12 my-6">
          <div className="text-right"> {answer.answer} </div>
          <div className="flex flex-row gap-4">
          <button onClick={() => onScoreSubmit(false)} className="text-red-500 border border-2 font-bold border-red-500 bg-transparent cursor-pointer px-4 py-1 font-normal shadow-md rounded-lg flex my-8">
          <div className="flex flex-row gap-2 justify-center items-center">
            خوب نبود <img src={SAD} alt="sad" />
            </div>

          </button>
          <button onClick={() => onScoreSubmit(true)} className="text-green-400 border border-2 font-bold border-green-400 bg-transparent cursor-pointer px-4 py-1 font-normal shadow-md rounded-lg flex my-8">
          <div className="flex flex-row gap-2 justify-center items-center">
            خوب بود <img src={HAPPY} alt="happy" />
            </div>

          </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AnswerComponent;
