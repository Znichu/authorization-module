import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:7542/1.0/",
});

type addedUserResponseType = {
    created: string,
    email: string,
    isAdmin: boolean,
    name: string,
    publicCardPacksCount: number,
    rememberMe: boolean,
    updated: string,
    verified: boolean,
    __v: number,
    _id: string,
}

type ResponseType = {
    addedUser: addedUserResponseType,
    success: boolean
}

export const registerAPI = {
    register: (email: string, password: string) => instance.post<ResponseType>(`auth/register`, {email: email, password: password})
        .then(res => res.data)
};