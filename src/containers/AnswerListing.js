import React, { useState} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import BaseApi from "../common/BaseApi";
import {useDispatch, useSelector} from "react-redux";
import { selectedQuestion } from "../redux/actions/questionActions";
import { ActionTypes } from "../redux/constants/action-types";
import AnswerComponent from "./AnswerComponent";

const AnswerListing = () => {
    const question = useSelector(state => state.question);
    const { questionId } = useParams();
    const [ answer, setAnswer ] = useState('');

    const dispatch = useDispatch();

    const renderAnswersList = () => {
        const { answers } = question;
        if (answers && answers.length > 0) {
            return (
                <>
                    {answers.map((answer) => <AnswerComponent key={answer.id} answer={answer} />)}
                </>
            );
        }
    };

    const fakeUpdateAnswersCount = async () => {
        const answersCount = question.answersCount ? question.answersCount : 0;
        const updatedQuestion = Object.assign({}, question, {});
        delete updatedQuestion['loading'];
        delete updatedQuestion['answers'];
        const response = await axios
            .put(BaseApi + `questions/${question.id}`, { ...updatedQuestion, answersCount: answersCount + 1 })
            .catch((err) => {
                dispatch( {
                    type: ActionTypes.QUESTIONS_ERROR,
                    payload: err,
                })
                console.log("Err", err);
            });
    };

    const fetchAnswerAdd = async (answer) => {
        const response = await axios
            .post(BaseApi + `answers`, { answer, questionId: Number(questionId) , dateTime: new Date().toISOString(), plus: 0, minus: 0 })
            .catch((err) => {
                dispatch( {
                    type: ActionTypes.QUESTIONS_ERROR,
                    payload: err,
                })
                console.log("Err", err);
            });
        return response.data;
    };

    const onSubmitAnswerHandler = (event) => {
        event.preventDefault();
        fetchAnswerAdd(answer).then((response) => {
            setAnswer('');
            const answers = question.answers && Array.isArray(question.answers) ? question.answers.slice() : [];
            answers.push(response);
            dispatch(selectedQuestion({ ...question, answers }));
            fakeUpdateAnswersCount();
        });
    };

    const renderAddAnswer = () => {
        return (<form onSubmit={onSubmitAnswerHandler}>
            <div className="modal-header">
                <h4 className="modal-title"></h4>
            </div>
            <div className="modal-body">
                <div><label htmlFor="title">Add New Answer</label></div>
                <div><input id="title" name="title" value={answer} onChange={(e)=>setAnswer(e.target.value)} type="text"/></div>
            </div>
            <input type="submit"/>
        </form>)
    };

    return (
        <div className="ui grid container">
            <div className="ui placeholder segment">
                {renderAnswersList()}
                {renderAddAnswer()}
            </div>
        </div>
    );
};

export default AnswerListing;
