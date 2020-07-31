import axios from 'axios'

const instance = axios.create({
    baseURL: "http://localhost:7542/1.0/",
});

type ResponseType = {
    success: boolean
    error: string
}

export const forgotPageAPI = {
    forgot (email: string, html1 = "<a href='http://localhost:3000/authorization-module#/forgot'", html2 = ">reset-password-link</a>") {
        return instance.post<ResponseType>("/auth/forgot", {email, html1, html2})
            .then(response => response.data)
    }
}