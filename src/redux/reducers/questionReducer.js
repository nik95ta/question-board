import { ActionTypes } from "../constants/action-types";

const initialState = {
    questions: [],
    loading: true
}

export const questionReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case ActionTypes.SET_QUESTIONS:
            return {
                ...state,
                questions: payload,
                loading:false
            };
        case ActionTypes.QUESTIONS_ERROR:
            return{
                loading: false,
                error: payload
            }
        default:
            return state;
    };
};

export const selectedQuestionReducer = (state = {}, {type, payload}) => {
    switch (type) {
        case ActionTypes.SELECTED_QUESTION:
            return {
                ...state,
                ...payload,
                loading:false
            };
        case ActionTypes.QUESTIONS_ERROR:
            return {
                loading: false,
                error: payload
            };
        case ActionTypes.REMOVE_SELECTED_QUESTION:
            return { };

        default:
            return state;
    };
};
