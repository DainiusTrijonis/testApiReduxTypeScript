import {Dispatch} from 'redux'
import * as actionTypes from './actionTypes'
import {Kitten} from '../reducers/kittens'
import {createApiClient} from '../api/index'

const api = createApiClient()

export function increment() {
  return {
    type: actionTypes.INCREMENT
  }
}
export const decrement = () => ({
    type: actionTypes.DECREMENT
})

export function fetchCount(number:number) {
    return function(dispatch:Dispatch) {
        dispatch(setCount(number));
    };
  }
  
function setCount(data:number) {
  return {
    type: actionTypes.SET_COUNT,
    payload: data
  };
}

export function fetchKittens(number:number) {
  return async function(dispatch:Dispatch) {
    await api.getKittens(number).then(data => {
      dispatch(setKittens(data))
    }).catch((err) => {
      console.log(err)
    })
  };
}

function setKittens(data:Kitten[]) {
  return {
    type: actionTypes.SET_KITTENS,
    payload: data
  }
}