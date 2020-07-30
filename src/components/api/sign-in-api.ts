import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:7542/1.0/'
});

export const authAPI = {
    signIn(email: string, password: string, rememberMe = false) {
        return instance.post(`auth/login`, {email, password, rememberMe})
    }
};