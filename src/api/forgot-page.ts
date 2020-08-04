import axios from 'axios'

const instance = axios.create({
    // baseURL: "http://localhost:7542/1.0/",
    baseURL: "https://cards-nya-back.herokuapp.com/1.0/"
});


export const forgotPageAPI = {
    forgot (email: string, html1 = "<a href='http://localhost:3000/authorization-module#/set-new-password'", html2 = ">reset-password-link</a>") {
        return instance.post("/auth/forgot", {email, html1, html2})
            .then(response => response.data)
    }
}