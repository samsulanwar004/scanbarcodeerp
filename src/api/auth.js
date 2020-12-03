import axios from 'axios';
import {API_URL} from '@env';

function processResponse(response) {
  const code = response.status;
  const result = response.data;
  return Promise.all([code, result]).then(res => ({
    code: res[0],
    result: res[1]
  }));
}

export const login = async(data) => {
  console.log(API_URL);
  return axios({
    method: 'post',
    url: API_URL+'/auth/login',
    data: data
  }).then(processResponse)
  .then(function (response) {
    return response;
  })
  .catch(error => processResponse(error.response))
  .catch(function (error) {
    return error;
  });
}