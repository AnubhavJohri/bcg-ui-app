import axios from 'axios';

//USE process.env.BASE_URL when deploying
/**
 * Used this to handle/set headers according to the environment
 * app's deployed in. Created kept in mind the details and complexities
 * required in each request body, headers, domain while the app is being handled
 * differently in each environment.
 */
const axiosInstance = axios.create({
    baseURL : 'http://localhost:1111/policy/',
    headers : {
        Pragma: 'no-cache',
    }
})

export default axiosInstance;