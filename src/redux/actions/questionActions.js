import { ActionTypes } from "../constants/action-types"

export const setQuestions = (questions) => {
    return {
        type : ActionTypes.SET_QUESTIONS,
        payload : questions
    };
};

export const selectedQuestion = (question) => {
    return {
        type : ActionTypes.SELECTED_QUESTION,
        payload : question
    };
};

export const removeSelectedQuestion = () => {
    return {
        type : ActionTypes.REMOVE_SELECTED_QUESTION,
    };
};
