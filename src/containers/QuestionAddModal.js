import React, { useState } from "react";
import ReactDom from "react-dom";
import "./style/Modal.css";
import axios from "axios";
import { useHistory } from "react-router-dom";
import BaseApi from "../common/BaseApi";
import { useDispatch } from "react-redux";
import { ActionTypes } from "../redux/constants/action-types";

const QuestionAddModal = (props) => {
  const [responseBody, setResponseBody] = useState({
    title: "",
    description: "",
  });

  const dispatch = useDispatch();
  const history = useHistory();

  const inputChangeHandler = (event) => {
    const { name, value } = event.target;
    setResponseBody({
      ...responseBody,
      [name]: value,
    });
  };

  const fetchQuestionAdd = async (title, description) => {
    const response = await axios
      .post(BaseApi + `questions`, {
        title,
        description,
        dateTime: new Date().toISOString(),
        answersCount: 0,
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

  const onSubmitQuestionHandler = (event) => {
    event.preventDefault();
    fetchQuestionAdd(responseBody.title, responseBody.description).then(
      (response) => {
        history.push(`/question/${response.id}`);
        props.onClose();
      }
    );
  };

  if (!props.show) {
    return null;
  }
  return ReactDom.createPortal(
    <div className="modal" onClick={props.onClose}>
      <div onClick={(e) => e.stopPropagation()} className="bg-gray-100 shadow w-6/12 m-8 rounded-xl">
<nav className="bg-white py-2 md:py-4 rounded-xl">
      <div className="container px-14 mx-auto md:flex md:items-center">
        <div
          className="hidden md:flex flex-auto md:ml-auto mt-3 md:mt-0 flex items-center"
          id="navbar-collapse "
        >
             <button onClick={props.onClose} type='submit' >
              X</button>
        </div>
        <ul className="hidden md:flex flex-col md:flex-row space-x-6 items-center">
          <li className="text-black-600 font-bold" style={{direction:'rtl'}}>ایجاد سوال جدید</li>
        </ul>
      </div>
    </nav>
              <div className=" mx-12 my-6">
                <div className="text-right">
                     <form onSubmit={onSubmitQuestionHandler}>
          <div className="modal-body">
          <div>
              <label htmlFor="title" style={{direction:'rtl'}}>موضوع:</label>
            </div>
            <div className="my-3 w-full grid rounded-lg">
              <input
              className="p-10 rounded-lg"
                id="title"
                name="title"
                onChange={(e) => inputChangeHandler(e)}
                type="text"
              />
            </div>
            <div>
              <label htmlFor="description">متن سوال</label>
            </div>
            <div className="my-3 w-full grid rounded-lg">
              <input
              className="p-10 rounded-lg"
                id="description"
                name="description"
                onChange={(e) => inputChangeHandler(e)}
                type="text"
              />
            </div>
            <div className="mt-6">
              <div className="flex flex-row gap-4">
              <button type='submit' className="text-white border font-bold bg-green-600 cursor-pointer px-6 py-2 font-normal rounded-lg flex items-center">
              ایجاد سوال</button>

              <button onClick={props.onClose} type='submit' className="text-green-600 font-bold cursor-pointer px-6 py-2 flex items-center">
               انصراف</button>

              </div>
            </div>
          </div>
        </form>
                     </div>
          </div>
        </div>
    </div>,
    document.getElementById("root")
  );
};

export default QuestionAddModal;
