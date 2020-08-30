import axios from 'axios';

const instance = axios.create({
    /*baseURL: 'http://localhost:7542/1.0/'*/
    baseURL: "https://cards-nya-back.herokuapp.com/1.0/"
});

type ResponseType = {
    _id: string
    email: string
    rememberMe: boolean
    isAdmin: boolean
    name: string
    verified: string
    publicCardPacksCount: number
    token: string
    success: boolean
};

export const authAPI = {
    signIn(email: string, password: string, rememberMe: boolean) {
        return instance.post<ResponseType>(`auth/login`, {email, password, rememberMe})
            .then(res => res.data)
    },
    getAuth (token: string) {
        return instance.post(`auth/me`, {token})
            .then(res => res.data)
    },
};