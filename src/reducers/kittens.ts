import {SET_KITTENS,SET_LOADING} from '../actions/actionTypes'
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
            //console.log(action.payload[0].Name)
            return {kittensArray: action.payload, loading:false}
        case SET_LOADING:
            return {kittensArray: action.payload, loading:true}
        default:
            return state   
    }
}