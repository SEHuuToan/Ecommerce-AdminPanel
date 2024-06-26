import axios from 'axios';

const HOST = 'http://localhost:4000/api/products/'

const axiosGet = async (url: string) => {
    const res = await axios.get(HOST + url)
    return res;
}
const axiosGetWithParams = async (url: string, params?: Record<string, any>) => {
    const p = new URLSearchParams(params)
    const res = axios.get(HOST + url + '?' + p)
    return res;
}

// const axiosPost = (uri: string, model: Object) => {
//     return axios.post(HOST + uri, model, {
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     })
// }
// const axiosPut = (uri: string, params: Object) => {
//     return axios.put(HOST + uri, params, {
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     })
// }
const axiosDelete = async (id: string) => {
    const res = await axios.delete(HOST+id);
    return res;
}

export {
    axiosGet,
    axiosGetWithParams,
    // axiosPost,
    // axiosPut,
    axiosDelete,
}