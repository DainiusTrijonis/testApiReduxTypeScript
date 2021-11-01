import axios from 'axios'
import {Kitten} from '../reducers/kittens'
import {randomNames} from '../data/names'
import { Buffer } from "buffer"

const API = axios.create({
  headers: {
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache',
    'Expires': '0',
  },
});
API.interceptors.request.use(
  config => {
    return config;
  },
  error => Promise.reject(error)
);

export type ApiClient = {
	getKittens: (number:number) => Promise<Kitten[]>;
}

export const createApiClient = (): ApiClient => {
	return {
		getKittens: async (number) => {
      let promises = new Array<Promise<Kitten>>();
      for(let i=1; i<=number; i++) {
        promises.push(new Promise(async (resolve, reject) => {
          const response = await getBase64(`http://placekitten.com/200/300?image=${i}`)
          if(!response.startsWith(`Error: `)) {
            const imageBase64Converted = `data:image/png;base64,${response}`
            const recievedKitten:Kitten = {Name: randomNames[Math.floor(Math.random() * randomNames.length-1)] , Image: imageBase64Converted} 
            resolve(recievedKitten) 
          }
          else {
            reject(response)
          }
        }))
      }
      return Promise.all(promises).then((data) => {
        console.log(data);
        return data
      })
		},
	}
}


async function getBase64(url:string):Promise<string> {
  let response = await API
    .get(url, {
      responseType: 'arraybuffer'
    }).catch((error) => {
      if(error.response) {
        //console.log('Error response data: ',error.response.data);
        //console.log('Error response status: ',error.response.status);
        //console.log('Error response headers: ',error.response.headers);
      } else if (error.request) {
        //console.log('Error request: ',error.request);
        //console.log('Error request status: ',error.request.status);
      } else {
        //console.log('Error message: ', error.message);
      }
      return error
      //console.log('Error Config:',error.config)
  });
  if(response instanceof Error){
    return `${response}`
  } else {
    return new Buffer(response.data).toString("base64");
  }
}