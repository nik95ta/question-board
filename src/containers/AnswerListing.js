import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import BaseApi from "../common/BaseApi";
import { useDispatch, useSelector } from "react-redux";
import { selectedQuestion } from "../redux/actions/questionActions";
import { ActionTypes } from "../redux/constants/action-types";
import AnswerComponent from "./AnswerComponent";

const AnswerListing = () => {
  const question = useSelector((state) => state.question);
  const { questionId } = useParams();
  const [answer, setAnswer] = useState("");

  const dispatch = useDispatch();

  const renderAnswersList = () => {
    const { answers } = question;
    if (answers && answers.length > 0) {
      return (
        <>
          {" "}
          {answers.map((answer) => (
            <AnswerComponent key={answer.id} answer={answer} />
          ))}{" "}
        </>
      );
    }
  };

  const fakeUpdateAnswersCount = async () => {
    const answersCount = question.answersCount ? question.answersCount : 0;
    const updatedQuestion = Object.assign({}, question, {});
    delete updatedQuestion["loading"];
    delete updatedQuestion["answers"];
    const response = await axios
      .put(BaseApi + `questions/${question.id}`, {
        ...updatedQuestion,
        answersCount: answersCount + 1,
      })
      .catch((err) => {
        dispatch({
          type: ActionTypes.QUESTIONS_ERROR,
          payload: err,
        });
        console.log("Err", err);
      });
  };

  const fetchAnswerAdd = async (answer) => {
    const response = await axios
      .post(BaseApi + `answers`, {
        answer,
        questionId: Number(questionId),
        dateTime: new Date().toISOString(),
        plus: 0,
        minus: 0,
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

  const onSubmitAnswerHandler = (event) => {
    event.preventDefault();
    fetchAnswerAdd(answer).then((response) => {
      setAnswer("");
      const answers =
        question.answers && Array.isArray(question.answers)
          ? question.answers.slice()
          : [];
      answers.push(response);
      dispatch(
        selectedQuestion({
          ...question,
          answers,
        })
      );
      fakeUpdateAnswersCount();
    });
  };

  const renderAddAnswer = () => {
    return (
      <form onSubmit={onSubmitAnswerHandler}>
        <div className="modal-header">
          <h4 className="modal-title"> </h4>
        </div>
        <div className="w-full flex mx-8 flex-col">
            <label
              className=" mx-20 flex text-3xl justify-end font-bold"
              htmlFor="title"
            >
              پاسخ خود را ثبت کنید
            </label>
            <p className="flex justify-end mx-20 my-4">
              پاسخ خود را بنویسید
            </p>

          <div className="rounded-lg grid">
            <textarea
              className="rounded-lg mr-20 ml-4 my-4 p-6"
              style={{
                direction: "rtl",
              }}
              id="title"
              name="title"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              type="text"
              placeholder="متن پاسخ ..."
            />
          </div>
        </div>
        <div className="flex justify-end">
        <button type="submit" className="leading-3 text-white bg-green-600 cursor-pointer px-16 py-4 font-normal rounded-lg flex justify-end mx-12 my-6 items-center">
          ارسال پاسخ
        </button>
        </div>
      </form>
    );
  };

  return (
    <div className="">
      <div className="">
        {renderAnswersList()} {renderAddAnswer()}
      </div>
    </div>
  );
};

export default AnswerListing;
