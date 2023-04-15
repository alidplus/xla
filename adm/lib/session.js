// this file is a wrapper with defaults to be used in both API routes and `getServerSideProps` functions
import { withIronSession, ironSession  } from 'next-iron-session'
import { SESSION_COOKIE_NAME } from '../constants/vars'

const sessionConfig = {
  password: process.env.XLA_SECRET_COOKIE_PASSWORD,
  cookieName: SESSION_COOKIE_NAME,
  cookieOptions: {
    // the next line allows to use the session in non-https environments like
    // Next.js dev mode (http://localhost:3000)
    secure: process.env.NODE_ENV === 'production' ? true : false
  },
}

const session = function session(handler) {
  return withIronSession(handler, sessionConfig)
}

export default session

const ssnMiddle = function(req, res) {
  return new Promise((resolve) => {
    ironSession(sessionConfig)(req, res, resolve)
  })
}

export const sessionMiddleware = ssnMiddle


