import axios from 'axios'

const http = axios.create({
    // baseURL: 'https://m.z200083.xyz'
    baseURL: 'http://127.0.0.1:20083'
});

http.interceptors.request.use(
    config => {
        if(window.localStorage.getItem('token')){
            config.headers.authorization = window.localStorage.getItem('token');
        }
        return config
    },
    err => {
        return Promise.reject(err)
    }
)

export const userLogin = ({ loginName, password }) => {
    return http.post(`/login`, { loginName, password })
}
export const signUser = ({ signName, signPassword, signEmail }) => {
    return http.post(`/sign`, { signName, signPassword, signEmail })
}
export const verifyUser = (signName) => {
    return http.post(`/verify`, {signName})
}