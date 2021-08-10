import cookie from 'js-cookie'
import CookieParser from 'cookieparser'

export default {
    getItem(key, req) {
        if (req && req.headers.cookie) {
            const requestCookies = CookieParser.parse(req.headers.cookie)
            if (requestCookies.hasOwnProperty(key)) {
                return requestCookies[key]
            }
        } else {
            return cookie.get(key)
        }
    },
    removeItem(key, req) {
        if (req) {
            return false
        } else {
            return cookie.remove(key)
        }
    },
    setItem(key, value, req, expires = 2000) {
        if (req) {
            return false
        } else {
            return cookie.set(key, value, { expires })
        }
    }
}