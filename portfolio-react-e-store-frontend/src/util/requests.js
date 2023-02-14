import axios from 'axios'

const postData = async (url = '', data = {}) => {
    const response = await axios.post(url, data);
    return response;
  }

export default postData