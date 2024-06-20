import axios from 'axios';

const HOST = 'http://localhost:4000/'

const axiosGet = async (url: string) => {
    const res = await axios.get(HOST + url)
    return res;
}

export {
    axiosGet,
}