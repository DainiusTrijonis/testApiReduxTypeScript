import * as actionTypes from '../actions/actionTypes'
export interface COUNTERSTATE  {
    value: number;
}

const INITIALSTATE:COUNTERSTATE = {
    value:0,
}

export const counterReducer = (state = INITIALSTATE,  action: { type: string, payload:number }) => {
    switch(action.type) {
        case actionTypes.INCREMENT:
            return {value: state.value+1}
        case actionTypes.SET_COUNT:
            return {value: action.payload}
        default:
            return state   
    }
}