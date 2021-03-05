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

export async function postMethod(url, data) {
  const res = await axios.post(url, data);
  return res.data;
}

export async function updateMethod(url, data) {
  const res = await axios.put(url, data);
  return res.data;
}

export async function deleteMethod(url, data) {
  const res = await axios.delete(url, data);
  return res.data;
}
