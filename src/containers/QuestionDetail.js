import React, {useEffect} from "react";
import {Link, useParams} from "react-router-dom";
import axios from "axios";
import BaseApi from "../api/BaseApi";
import { useDispatch, useSelector } from "react-redux";
import { selectedQuestion, removeSelectedQuestion } from "../redux/actions/questionActions";
import { ActionTypes } from "../redux/constants/action-types";

const QuestionDetail = () => {
    const question = useSelector(state => state.question);
    const { title, description} = question;
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

    const renderAnswersList = () => {
        const { answers } = question;
        if (answers && answers.length > 0) {
            return (
                <>
                    {answers.map((answer) =>
                        <div className="wide" key={answer.id}>
                            <div className="ui link cards">
                                <div className="card">
                                    <div className="content">
                                        <div className="header">{answer.description}</div>
                                    </div>
                                </div>
                            </div>
                    </div>)}
                </>
            );
        }
    };

    useEffect(() => {
        if (questionId && questionId !=="") {
            fetchQuestionDetail();
        }
        return () => {
            dispatch(removeSelectedQuestion())
        }
    }, [questionId]);

    return (
        <div className="ui grid container">
            {Object.keys(question).length === 0 ? (
                <div>Loading...</div>
            ) : (
                <div className="ui placeholder segment">
                    <div className="ui two column stackable center aligned grid">
                        <div className="middle aligned row">
                            <div className="column rp">
                                <h1>{title}</h1>
                                <p>{description}</p>
                            </div>
                        </div>
                    </div>
                    {renderAnswersList()}
                </div>
            )}
        </div>
    );
};

export default QuestionDetail;
