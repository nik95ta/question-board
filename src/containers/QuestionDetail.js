import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import BaseApi from "../common/BaseApi";
import { useDispatch, useSelector } from "react-redux";
import {
  selectedQuestion,
  removeSelectedQuestion,
} from "../redux/actions/questionActions";
import { ActionTypes } from "../redux/constants/action-types";
import { renderDate, renderTime } from "../common/DateTime";
import AnswerListing from "./AnswerListing";
import MAN from "../assets/man.svg";

const QuestionDetail = () => {
  const question = useSelector((state) => state.question);
  const { title, description, answers, dateTime } = question;
  const { questionId } = useParams();

  const dispatch = useDispatch();

  const fetchQuestionDetail = async () => {
    const response = await axios
      .get(BaseApi + `questions/${questionId}?_embed=answers`)
      .catch((err) => {
        dispatch({
          type: ActionTypes.QUESTIONS_ERROR,
          payload: err,
        });
        console.log("Err", err);
      });
    dispatch(selectedQuestion(response.data));
  };

  useEffect(() => {
    if (questionId && questionId !== "") {
      fetchQuestionDetail();
    }
    return () => {
      dispatch(removeSelectedQuestion());
    };
  }, [questionId]);

  return (
    <div className="">
      {" "}
      {Object.keys(question).length === 0 ? (
        <div> Loading... </div>
      ) : (
        <div className="flex flex-col">
              <div
                className="bg-gray-100 shadow mx-12 my-8 rounded-xl"
              >
                <nav className="bg-white py-2 md:py-4 rounded-xl">
                  <div className="container px-12 mx-auto md:flex md:items-center">
                    <div
                      className="hidden md:flex flex-auto md:ml-auto mt-3 md:mt-0 flex items-center"
                      id="navbar-collapse "
                    >
                      <p href="#" className="md:mx-2 font-bold">
                        <span className="text-gray-400"> تاریخ: </span>
                        {renderDate(dateTime)}
                      </p>
                      <div className="h-[20px] bg-gray-200 w-[1px] mx-6"> </div>
                      <p href="#" className="md:mx-2 font-bold">
                        <span className="text-gray-400"> ساعت: </span>
                        {renderTime(dateTime)}
                      </p>
                    </div>
                    <ul className="hidden md:flex flex-col md:flex-row space-x-6 items-center">
                      <li
                        className="text-black-600 font-bold"
                        style={{
                          direction: "rtl",
                        }}
                      >
                        {description}
                      </li>
                      <li className="rounded-lg">
                        <img
                          src={MAN}
                          alt="man"
                        //   className="object-contain rounded-lg w-16 h-16"
                        />
                      </li>
                    </ul>
                  </div>
                </nav>
                <div className=" mx-12 my-6">
                  <div className="text-right"> {title} </div>
                </div>
              </div>


         <h1 className=" mx-12 my-2 flex text-3xl justify-end font-900 font-IRANYekan">پاسخ ها</h1>
          <AnswerListing />
        </div>
      )}
    </div>
  );
};

export default QuestionDetail;
