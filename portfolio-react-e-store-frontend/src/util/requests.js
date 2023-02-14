import axios from 'axios'

export const postData = async (url = '', data = {}) => {
    const response = await axios.post(url, data);
    return response;
  }

export const deleteRequest = async (url = '', data = {}) => {
  const response = await axios.delete(url, {data:data});
  return response;
}