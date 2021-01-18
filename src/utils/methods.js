import axios from 'axios';
import { API_URL } from '../constants/config';

axios.interceptors.request.use(
  async (config) => {
    config.headers = {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    return config;
  },
  (error) => {
    Promise.reject(error);
  },
);

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    const originalRequest = error.config;
    const status = error.response ? error.response.status : null;

    if (!status) {
      console.log('Backend not started yet!');
    }
    const refreshToken = localStorage.getItem('refreshToken');

    if (refreshToken && status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      return axios
        .post(
          `${API_URL}/auth/refreshToken`,
          { refreshToken },
          {
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          },
        )
        .then((res) => {
          if (res.data.status === 200) {
            localStorage.setItem('accessToken', res.data.data.accessToken);
            return axios(originalRequest);
          }
        })
        .catch((err) => {
          localStorage.clear();
          return err.response.data;
        });
    }
    return Promise.reject(error);
  },
);

export async function getMethod(url) {
  const res = await axios(url);
  return res.data;
}

export function postMethod(url, data) {
  return true;
}

export function updateMethod(url, data) {
  return true;
}

export function deleteMethod(url, data) {
  return true;
}
