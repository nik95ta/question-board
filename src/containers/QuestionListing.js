import React, {useEffect} from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setQuestions } from '../redux/actions/questionActions';
import QuestionComponent from "./QuestionComponent";
import { ActionTypes } from "../redux/constants/action-types";


const QuestionListing = () => {
    const questions = useSelector(state => state);
    const dispatch = useDispatch();

    const fetchQuestions = async () => {

    };

    useEffect(() => {
        fetchQuestions();
    }, []);
    console.log(questions);
    return (
        <div className="ui grid container">
            <QuestionComponent />
        </div>
    );
};

export default QuestionListing;
