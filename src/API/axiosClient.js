import axios from "axios";

const instance = axios.create({
    baseURL: process.env.REACT_APP_URL_API,
    timeout:30000
});
instance.interceptors.response.use(
    (response) =>{
        return response.data
    },
    (Error)=>{
        console.log(Error);
    }
);

export default instance;