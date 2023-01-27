import { combineReducers } from "redux";
import { questionReducer, selectedQuestionReducer } from "./questionReducer";

const reducers = combineReducers({
    allQuestions : questionReducer,
    question : selectedQuestionReducer,
});

export default reducers;
