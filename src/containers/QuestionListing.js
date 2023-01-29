import React, {useEffect} from "react";
import axios from "axios";
import BaseApi from "../common/BaseApi";
import { useDispatch, useSelector } from "react-redux";
import { setQuestions } from "../redux/actions/questionActions";
import QuestionComponent from "./QuestionComponent";
import { ActionTypes } from "../redux/constants/action-types";


const QuestionListing = () => {
    const dispatch = useDispatch();

    const fetchQuestions = async () => {
        const response = await axios
            .get(BaseApi + 'questions?_sort=id&_order=desc')
            .catch((err) => {
                dispatch( {
                    type: ActionTypes.QUESTIONS_ERROR,
                    payload: err,
                })
                console.log("Err", err);
            });
        dispatch(setQuestions(response.data));
    };

    useEffect(() => {
        fetchQuestions();
    }, []);
    return (
        <div className="flex items-center justify-center mx-12 flex-col">
            <QuestionComponent />
        </div>
    );
};

export default QuestionListing;
