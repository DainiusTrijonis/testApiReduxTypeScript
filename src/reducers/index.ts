import { counterReducer } from "./counter";
import { loggedInReducer } from "./isLoggedIn";
import { kittensReducer } from "./kittens"
import { combineReducers } from "redux";

export const allReducers = combineReducers({
    count: counterReducer,
    logIn: loggedInReducer,
    kittens: kittensReducer

})

export type allReducersState = ReturnType<typeof allReducers>