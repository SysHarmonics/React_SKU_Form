import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: "/api",
    headers: {
        'Content-Type': "application/json",
    },
});

axiosInstance.interceptors.request.use(
    response => response, error => {
        const oops = error.response?.data?.message || error.message;
        return Promise.reject(new Error(oops));
    }
);

export const lambdaAxios = axios.create({
    baseURL: "/api", //PLACEHOLDERRRRRRRRRRR
    headers: {
        'Content-Type': 'application/json',
    }
});
