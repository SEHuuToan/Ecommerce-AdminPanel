import axios from 'axios';

const HOST = 'http://localhost:4000/api/products/'

const axiosGet = async (url: string) => {
    const res = await axios.get(HOST + url)
    return res;
}
const axiosGetWithParams = (url: string, params?: Record<string, any>) => {
    const p = new URLSearchParams(params)
    return axios.get(HOST + url + '?' + p)
}

const axiosPost = (uri: string, model: Object) => {
    return axios.post(HOST + uri, model, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}
const axiosPut = (uri: string, params: Object) => {
    return axios.put(HOST + uri, params, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export {
    axiosGet,
    axiosGetWithParams,
    axiosPost,
    axiosPut,
}