import axios from 'axios';
import Cookies from 'js-cookie';

axios.defaults.withCredentials = true

const HOST = import.meta.env.VITE_BACK_END_URL_API;
const getAxiosConfig = () => {
    const accessToken = localStorage.getItem('accessToken');
    const axiosConfig = {
        headers: {
            Authorization: accessToken || '',
        }
    }
    return axiosConfig;
}
axios.interceptors.request.use(
    async (config) => {
      const accessToken = localStorage.getItem("accessToken")
  
      if (accessToken) {
        config.headers.Authorization = accessToken;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
// Add a response interceptor
axios.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        // If the error status is 401 and there is no originalRequest._retry flag,
        // it means the token has expired and we need to refresh it
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const refreshToken = Cookies.get('refreshToken');
                const response = await axios.post(HOST + 'auth/refresh-token', { refreshToken });
                const { accessToken  } = response.data;
               // Cập nhật access token vào localStorage
               localStorage.setItem('accessToken', accessToken);
                // Retry the original request with the new token
                originalRequest.headers.Authorization = accessToken ;
                return axios(originalRequest);
            } catch (error) {
                // Handle refresh token error or redirect to login
                console.log(error);
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);   
    }
);
const axiosGet = async (url: string) => {
    const res = await axios.get(HOST + 'api/products/' + url, getAxiosConfig())
    return res;
}
const axiosPostProduct = async (url: string, data: object) => {
    const res = await axios.post(HOST + 'api/products/' + url, data, {
        headers: {
            'Content-Type': 'multipart/form-data',
            ...getAxiosConfig().headers
        }
    },);
    return res;
}
const axiosUpdateProduct = async (url: string, data: object) => {
    const res = await axios.put(HOST + 'api/products/' + url, data, {
        headers: {
            'Content-Type': 'multipart/form-data',
            ...getAxiosConfig().headers
        }
    },);
    return res;
}
const axiosPost = async (url: string, data: object) => {
    const res = await axios.post(HOST + url, data, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return res;
}
const axiosLogout = async () => {
    const res = await axios.post(HOST + 'auth/logout');
    return res;
}
const axiosDelete = async (url: string) => {
    const res = await axios.delete(HOST + 'api/products/' + url, getAxiosConfig());
    return res;
}
// Blog axios
const axiosGetBlog = async (url: string) => {
    const res = await axios.get(HOST + 'api/' + url, getAxiosConfig())
    return res;
}
const axiosPostBlog = async (url: string, data: object) => {
    const res = await axios.post(HOST + 'api/' + url, data, {
        headers: {
            'Content-Type': 'multipart/form-data',
            ...getAxiosConfig().headers
        }
    },);
    return res;
}
const axiosUpdateBlog = async (url: string, data: object) => {
    const res = await axios.put(HOST + 'api/' + url, data, {
        headers: {
            'Content-Type': 'multipart/form-data',
            ...getAxiosConfig().headers
        }
    },);
    return res;
}
const axiosDeleteBlog = async (id: string) => {
    const res = await axios.delete(HOST + 'api/' + id, getAxiosConfig());
    return res;
}
const axiosDeleteImageBlog = async (url: string) => {
    const res = await axios.delete(HOST + 'api/' + url, getAxiosConfig());
    return res;
}
export {
    axiosGet,
    axiosPostProduct,
    axiosUpdateProduct,
    axiosPost,
    axiosLogout,
    axiosDelete,
    // Blog axios
    axiosGetBlog,
    axiosPostBlog,
    axiosUpdateBlog,
    axiosDeleteBlog,
    axiosDeleteImageBlog,
}