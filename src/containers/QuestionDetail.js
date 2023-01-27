import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import axios from "axios";
import BaseApi from "../api/BaseApi";
import { useDispatch, useSelector } from "react-redux";
import { selectedQuestion, removeSelectedQuestion } from "../redux/actions/questionActions";
import { ActionTypes } from "../redux/constants/action-types";
import { renderDate, renderTime} from '../common/DateTime';

const QuestionDetail = () => {
    const question = useSelector(state => state.question);
    const { title, description, answers, dateTime } = question;
    const { questionId } = useParams();
    const [ answer, setAnswer ] = useState('');

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

    const fetchAnswerUpdate = async (answer, plus, minus) => {
        const response = await axios
            .put(BaseApi + `answers/${answer.id}`, { ...answer, plus, minus })
            .catch((err) => {
                dispatch( {
                    type: ActionTypes.QUESTIONS_ERROR,
                    payload: err,
                })
                console.log("Err", err);
            });
        return response.data;
    };

    const onScoreSubmit = (answer, isPlus) => {
        let plus = answer.plus;
        let minus = answer.minus;
        if (isPlus) {
            plus++;
        } else {
            minus++;
        }
        fetchAnswerUpdate(answer, plus, minus).then(response => {
            const index = question.answers.findIndex(obj => obj.id === answer.id);
            question.answers[index] = response;
            dispatch(selectedQuestion(question));
        });
    };

    const renderAnswersList = () => {
        const { answers } = question;
        if (answers && answers.length > 0) {
            return (
                <>
                {answers.map((item) =>
                    <div className="wide" key={item.id}>
                        <div className="ui cards">
                            <div className="card">
                                <div className="content">
                                    <div>
                                        <div>Positive: {item.plus}</div>
                                        <div>Negative: {item.minus}</div>
                                    </div>
                                    <div>
                                        <div>time: {renderTime(item.dateTime)}</div>
                                        <div>date: {renderDate(item.dateTime)}</div>
                                    </div>
                                    <div className="header">answer: {item.answer}</div>
                                    <div>
                                        <button onClick={() => onScoreSubmit(item, true)}>+</button>
                                        <button className="link" onClick={() => onScoreSubmit(item, false)}>-</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>)}
                </>
            );
        }
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
        });
    }

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
                    {renderAnswersList()}
                    {renderAddAnswer()}
                </div>
            )}
        </div>
    );
};

export default QuestionDetail;
