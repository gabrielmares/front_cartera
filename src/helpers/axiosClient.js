import axios from 'axios'

let axiosClient = axios.create({
    baseURL: process.env.REACT_APP_SERVIDOR,
    withCredentials: true,
    timeout: 2500,
    timeoutErrorMessage: { codigo: 512 }
});

export default axiosClient;