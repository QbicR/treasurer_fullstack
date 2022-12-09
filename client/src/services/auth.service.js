import { $host } from "./http.service";
import jwt_decode from 'jwt-decode'

const authEndpoint = 'api/user/'

const authService = {
    registration: async (login, nickName, password) => {
        const { data } = await $host.post(authEndpoint + 'registration', { login, nickName, password })
        localStorage.setItem('token', data.token)
        return jwt_decode(data.token)
    },
    logIn: async (login, password) => {
        const { data } = await $host.post(authEndpoint + 'login', { login, password })
        localStorage.setItem('token', data.token)
        return jwt_decode(data.token)
    }
}

export default authService