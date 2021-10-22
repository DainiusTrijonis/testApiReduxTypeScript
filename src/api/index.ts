import axios from 'axios'

const client = (url:string) => {
  return function get(count:number) {
     getImagesFromAPI(count) 
  }
};


async function getImagesFromAPI(number:number) {
  let imageArray = new Array<string>()
  
  const imageBase64 = await getBase64(`http://placekitten.com/200/300?image=${number}`)
  const imageBase64Converted = `data:image/png;base64,${imageBase64}`
  imageArray.push(imageBase64Converted)
  return imageArray
}
async function getBase64(url:string) {
  try {
    const response = await axios
      .get(url, {
        responseType: 'arraybuffer'
      });
    return new Buffer(response.data).toString("base64");
  } catch (ex) {
    return ex;
  }
}

export default client;