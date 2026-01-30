import axios from 'axios';
import  {STORAGE_KEYS} from "../localStorage/types.ts";

const apiUrl = import.meta.env.dev.VITE_API_URL;

const axiosClient = axios.create({
    baseURL: apiUrl,
    headers: {
        "Content-Type": "application/json",
    }
})

axiosClient.interceptors.request.use(
    (config) => {
        const isAuthEndpoint = config.url?.startsWith('/api/auth');

        if(!isAuthEndpoint){
            const stored = localStorage.getItem(STORAGE_KEYS.USER);

            if(stored){
                const authResponse = JSON.parse(stored);

                config.headers.Authorization = `Bearer ${authResponse.token}`

                console.log(' Token attached to request:', config.url);  // Debug

            }
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)

axiosClient.interceptors.response.use(
    (response) =>{
        return response;
    },
    (error) => {
        if(error.response?.status === 401){
            console.log("Unauthorized");
            localStorage.removeItem(STORAGE_KEYS.USER);
            window.location.href = '/signin';
        }

        return Promise.reject(error);
    }
)

export default axiosClient;