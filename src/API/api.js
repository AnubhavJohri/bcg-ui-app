import axios from 'axios';

//USE process.env.BASE_URL when deploying
const axiosInstance = axios.create({
    baseURL : 'http://localhost:1111/policy/',
    headers : {
        Pragma: 'no-cache',
    }
})

export default axiosInstance;