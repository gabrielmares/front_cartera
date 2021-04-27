 import axios from 'axios'

let axiosClient = axios.create({
    baseURL: process.env.REACT_APP_SERVIDOR,
    withCredentials: true
});

export default axiosClient;