import React from "react";
import {Link} from "react-router-dom";
import { useSelector } from "react-redux";

const QuestionComponent = () => {
    const questions = useSelector(state => state.allQuestions.questions);
    if (questions != null) {
        const renderList = questions.map((question) => {
            const {id, title} = question;
            return(
                <div className="wide" key={id}>
                    <Link to={`/question/${id}`}>
                        <div className="ui link cards">
                            <div className="card">
                                <div className="content">
                                    <div className="header">{title}</div>
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
