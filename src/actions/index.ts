import axios, { AxiosRequestConfig } from 'axios'
import {Dispatch} from 'redux'
import * as actionTypes from './actionTypes'
import { Buffer } from "buffer"
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
    await getImagesFromAPI(number).then(data => {
      dispatch(setKittens(data))
    }).catch((err) => {
      console.log("lmao")
    })
  };
}

function setKittens(data:string[]) {
  return {
    type: actionTypes.SET_KITTENS,
    payload: data
  }
}

async function getImagesFromAPI(number:number) {
  let promises = new Array<Promise<string>>();
  for(let i=1; i<=number; i++) {
    promises.push(new Promise(async (resolve, reject) => {
      const response = await getBase64(`http://placekitten.com/200/300?image=${i}`)
      if(response.statusCode == 200) {
        const imageBase64Converted = `data:image/png;base64,${response.responseBody}`
        resolve(imageBase64Converted)
      }
      else {
        console.log(response);
        reject(response)
      }
    }))
  }
  return Promise.all(promises).then((data) => {
    return data
  })
}
type ResponseData = {
  statusCode: number
  responseBody?: string
}
async function getBase64(url:string):Promise<ResponseData> {
  const x:AxiosRequestConfig = {
    responseType:'arraybuffer',
  }
  let response = await axios
    .get(url, {
      responseType: 'arraybuffer'
      
    }).catch((error) => {
      console.log(error)
      return error
    });
  if(response) {
    return {statusCode:response.status, responseBody:new Buffer(response.data).toString("base64") || response.statusText};
  }
  else {
    return {statusCode:0, responseBody:'Network error'}
  }
}