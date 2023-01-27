import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import BaseApi from "../common/BaseApi";
import { useDispatch, useSelector } from "react-redux";
import { selectedQuestion, removeSelectedQuestion } from "../redux/actions/questionActions";
import { ActionTypes } from "../redux/constants/action-types";
import { renderDate, renderTime} from '../common/DateTime';
import AnswerListing from "./AnswerListing";

const QuestionDetail = () => {
    const question = useSelector(state => state.question);
    const { title, description, answers, dateTime } = question;
    const { questionId } = useParams();

    const dispatch = useDispatch();

    const fetchQuestionDetail = async () => {
        const response = await axios
            .get(BaseApi + `questions/${questionId}?_embed=answers`)
            .catch((err) => {
                dispatch( {
                    type: ActionTypes.QUESTIONS_ERROR,
                    payload: err,
                })
                console.log("Err", err);
            });
        dispatch(selectedQuestion(response.data));
    };

    useEffect(() => {
        if (questionId && questionId !=="") {
            fetchQuestionDetail();
        }
        return () => {
            dispatch(removeSelectedQuestion())
        }
    }, [questionId]);

    console.log('question', question);
    return (
        <div className="ui grid container">
            {Object.keys(question).length === 0 ? (
                <div>Loading...</div>
            ) : (
                <div className="ui placeholder segment">
                    <div className="ui two column stackable center aligned grid">
                        <div className="middle aligned row">
                            <div className="column rp">
                                <h1>title: {title}</h1>
                                <p>description: {description}</p>
                                <br />
                                <p>answer count: {answers.length}</p>
                                <p>time: {renderTime(dateTime)}</p>
                                <p>date: {renderDate(dateTime)}</p>
                            </div>
                        </div>
                    </div>
                    <AnswerListing />
                </div>
            )}
        </div>
    );
};

export default QuestionDetail;
