import React, { useState } from "react";
import ReactDom from 'react-dom';
import './style/Modal.css';
import axios from "axios";
import { useHistory } from "react-router-dom";
import BaseApi from "../api/BaseApi";
import { useDispatch } from "react-redux";
import {ActionTypes} from "../redux/constants/action-types";

const Modal = (props) => {

    const [ responseBody, setResponseBody ] = useState({ title: '', description: '' });

    const dispatch = useDispatch();
    const history = useHistory();


    const inputChangeHandler = (event) => {
        const {name, value} = event.target
        setResponseBody({...responseBody, [name]: value})
    }

    const fetchQuestionAdd = async (title, description) => {
        const response = await axios
            .post(BaseApi + `questions`, { title, description, dateTime: new Date().toISOString(), answersCount: 0 })
            .catch((err) => {
                dispatch( {
                    type: ActionTypes.QUESTIONS_ERROR,
                    payload: err,
                })
                console.log("Err", err);
            });
        return response.data;
    };

    const onSubmitHandler = (event) => {
        event.preventDefault();
        fetchQuestionAdd(responseBody.title, responseBody.description).then((response) => {
            history.push(`/question/${response.id}`);
            props.onClose();
        });
    }

    if (!props.show) {
        return null;
    }
    return ReactDom.createPortal(
        <div className="modal" onClick={props.onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <form onSubmit={onSubmitHandler}>
                    <div className="modal-header">
                        <h4 className="modal-title">Add New Question</h4>
                    </div>
                    <div className="modal-body">
                        <div><label htmlFor="title">Title</label></div>
                        <div><input id="title" name="title" onChange={(e)=>inputChangeHandler(e)} type="text"/></div>
                        <div><label htmlFor="description">Description</label></div>
                        <div><input id="description" name="description" onChange={(e)=>inputChangeHandler(e)} type="text"/></div>
                        <div className="modal-footer">
                            <input type="submit"/>
                            <button onClick={props.onClose} className="button">
                                Close
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>, document.getElementById("root")
    );
};

export default Modal
