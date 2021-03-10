import * as axios from 'axios';

class HttpClass {
  headers = {
    Accept: 'application/json',
    'Accept-Language': 'fa',
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json; charset=utf-8',
    'x-trigger': 'CORS'
    // TODO-qp:: set default headers
  };

  instance = null;

  setAuthorization = (token) => {
    this.headers.Authorization = `Bearer ${token}`;
  };

  removeAuthorization = () => {
    const { Authorization, ...otherHeaders } = this.headers;
    this.headers = otherHeaders;
  };

  setHeaders = (headers) => {
    this.headers = {
      ...this.headers,
      ...headers
    };
  };

  createInstance = () => {
    this.instance = axios.create({
      baseURL: process.env.NEXT_PUBLIC_HTTP_BASE_URL || 'localhost',
      headers: this.headers,
      timeout: process.env.NEXT_PUBLIC_HTTP_TIMEOUT || 30000,
      withCredentials: true
    });
    this.setInterceptors();
  };

  changeInstanceAuthorization = (token) => {
    this.instance.defaults.headers.common.Authorization = `Bearer ${token}`;
  };

  changeInstanceLanguage = (lang) => {
    this.instance.defaults.headers.common['Accept-Language'] = lang;
  };

  setInterceptors = () => {
    this.instance.interceptors.request.use((config) => config,
      (error) => Promise.reject(error));

    this.instance.interceptors.response.use((response) => response,
      (error) => Promise.reject(error));
  };
}

export default new HttpClass();
