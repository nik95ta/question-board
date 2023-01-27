import React from "react";
import {Link} from "react-router-dom";
import { useSelector } from "react-redux";
import { renderTime, renderDate } from "../common/DateTime";

const QuestionComponent = () => {
    const questions = useSelector(state => state.allQuestions.questions);
    if (questions != null) {
        const renderList = questions.map((question) => {
            const {id, title, description, dateTime} = question;
            return(
                <div className="wide" key={id}>
                    <Link to={`/question/${id}`}>
                        <div className="ui cards">
                            <div className="card">
                                <div className="content">
                                    <div>time: {renderTime(dateTime)}</div>
                                    <div>date: {renderDate(dateTime)}</div>
                                    <div className="header">title: {title}</div>
                                    <div>description: {description}</div>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
            );

        })


        return (
            <>
                {renderList}
            </>
        );

    };
};

export default QuestionComponent;
