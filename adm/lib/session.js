// this file is a wrapper with defaults to be used in both API routes and `getServerSideProps` functions
import { withIronSession, ironSession  } from 'next-iron-session'
import { SESSION_COOKIE_NAME } from '../constants/vars'

const sessionConfig = {
  password: process.env.SECRET_COOKIE_PASSWORD,
  cookieName: SESSION_COOKIE_NAME,
  cookieOptions: {
    // the next line allows to use the session in non-https environments like
    // Next.js dev mode (http://localhost:3000)
    secure: process.env.NODE_ENV === 'production' ? true : false
  },
}

export default function session(handler) {
  return withIronSession(handler, sessionConfig)
}

export const sessionMiddleware = (req, res) => new Promise((resolve) => { ironSession(sessionConfig)(req, res, resolve) })


