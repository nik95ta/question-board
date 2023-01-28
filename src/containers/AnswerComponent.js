import React from "react";
import axios from "axios";
import BaseApi from "../common/BaseApi";
import { useDispatch, useSelector } from "react-redux";
import { selectedQuestion } from "../redux/actions/questionActions";
import { ActionTypes } from "../redux/constants/action-types";
import { renderDate, renderTime } from "../common/DateTime";

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
              <div> Positive: {answer.plus} </div>
              <div className="mr-16 ml-8"> Negative: {answer.minus} </div>
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
                className="text-black-600 text-lg font-bold"
                style={{
                  direction: "rtl",
                }}
              >
                علی کیا {/* {description}{" "} */}{" "}
              </h2>
              <li className="rounded-lg">
                <img
                  src="https://www.soccerbible.com/media/55837/ramos-interview-4.jpg"
                  className="object-contain rounded-lg w-16 h-16"
                />
              </li>
            </ul>
          </div>
        </nav>
        <div className=" mx-12 my-6">
          <div className="text-right"> {answer.answer} </div>
          <div className="flex flex-row gap-4">
          <button onClick={() => onScoreSubmit(true)} className="text-green-600 border border-2 font-bold border-green-600 bg-transparent cursor-pointer px-4 py-1 font-normal shadow-md rounded-lg flex my-8">
            nice
          </button>
          <button onClick={() => onScoreSubmit(false)} className="text-red-900 border border-2 font-bold border-red-900 bg-transparent cursor-pointer px-4 py-1 font-normal shadow-md rounded-lg flex my-8">
            bad
          </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AnswerComponent;
