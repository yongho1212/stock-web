import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://stock-prj-server-1a605441f6ae.herokuapp.com/',
  // baseURL: 'http://localhost:5001/',

  
});

export default instance;
