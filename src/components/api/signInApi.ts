import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:7542/1.0/'
});

type authAPIType = {
    signIn: any
    signOut: any
}

export const authAPI: authAPIType = {
    signIn(email: string, password: string, rememberMe: boolean) {
        return instance.post(`auth/login`, {email, password, rememberMe})
            .then(res => res.data)
            .catch(e => e)
    },
    signOut() {
        return instance.delete(`auth/login`)
            .then(res => res.data)
            .catch(e => e)
    }
};