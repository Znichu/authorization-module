import Cookie from 'universal-cookie'

const cookie = new Cookie();

class saveTokenInCookie {

    get (key: string) {
        return cookie.get(key)
    }

    set (key: string, value: string) {
        cookie.set(key, value)
    }

    remove(key: string) {
        cookie.remove(key)
    }
}

export default new saveTokenInCookie();