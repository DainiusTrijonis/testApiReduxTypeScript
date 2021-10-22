import {SET_KITTENS} from '../actions/actionTypes'
export interface Kitten {
    Name:string,
    Image:string,
}
export interface KITTENSSTATE  {
    kittensArray:Kitten[]
    loading:boolean;
}
const INITIALSTATE:KITTENSSTATE = {
    kittensArray: new Array<Kitten>(),
    loading:false,
}

export const kittensReducer = (state = INITIALSTATE,  action: { type: string, payload: Kitten[]}) => {
    switch(action.type) {
        case SET_KITTENS: 
            return {kittensArray: action.payload, loading:false}
        default:
            return state   
    }
}