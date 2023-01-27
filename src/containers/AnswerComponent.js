import React from "react";
import axios from "axios";
import BaseApi from "../common/BaseApi";
import { useDispatch, useSelector } from "react-redux";
import { selectedQuestion } from "../redux/actions/questionActions";
import { ActionTypes } from "../redux/constants/action-types";
import { renderDate, renderTime} from '../common/DateTime';

const AnswerComponent = (props) => {
    const answer = props.answer;
    const question = useSelector(state => state.question);

    const dispatch = useDispatch();

    const fetchAnswerScoreUpdate = async (answer, plus, minus) => {
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

    const onScoreSubmit = (isPlus) => {
        let plus = answer.plus;
        let minus = answer.minus;
        if (isPlus) {
            plus++;
        } else {
            minus++;
        }
        fetchAnswerScoreUpdate(answer, plus, minus).then(response => {
            const index = question.answers.findIndex(obj => obj.id === answer.id);
            question.answers[index] = response;
            dispatch(selectedQuestion(question));
        });
    };

    return (
        <>
            <div className="wide">
                <div className="ui cards">
                    <div className="card">
                        <div className="content">
                            <div>
                                <div>Positive: {answer.plus}</div>
                                <div>Negative: {answer.minus}</div>
                            </div>
                            <div>
                                <div>time: {renderTime(answer.dateTime)}</div>
                                <div>date: {renderDate(answer.dateTime)}</div>
                            </div>
                            <div className="header">answer: {answer.answer}</div>
                            <div>
                                <button onClick={() => onScoreSubmit(true)}>+</button>
                                <button className="link" onClick={() => onScoreSubmit(false)}>-</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AnswerComponent;
