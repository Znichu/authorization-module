import axios from 'axios'

const instance = axios.create({
    // baseURL: "http://localhost:7542/1.0/",
    baseURL: "https://cards-nya-back.herokuapp.com/1.0/"
});

export const resetPasswordApi = {
    resetPassword (resetPasswordToken: string, password: string) {
        return instance.post('/auth/set-new-password', {resetPasswordToken, password})
            .then(res=> res.data)
    }
}