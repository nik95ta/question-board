import React, {useEffect} from "react";
import axios from "axios";
import BaseApi from "../api/BaseApi";
import { useDispatch, useSelector } from "react-redux";
import { setQuestions } from "../redux/actions/questionActions";
import QuestionComponent from "./QuestionComponent";
import { ActionTypes } from "../redux/constants/action-types";


const QuestionListing = () => {
    const dispatch = useDispatch();

    const fetchQuestions = async () => {
        const response = await axios
            .get(BaseApi + 'questions')
            .catch((err) => {
                dispatch( {
                    type: ActionTypes.QUESTIONS_ERROR,
                    payload: err,
                })
                console.log("Err", err);
            });
        dispatch(setQuestions(response.data));
        console.log(response.data);
    };

    useEffect(() => {
        fetchQuestions();
    }, []);
    return (
        <div className="ui grid container">
            <QuestionComponent />
        </div>
    );
};

export default QuestionListing;
