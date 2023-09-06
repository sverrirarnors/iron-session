import {
  IronSessionOptions,
  getIronSession,
  IronSessionData,
  getServerActionIronSession,
} from 'iron-session'

import { cookies } from 'next/headers'

export const sessionOptions: IronSessionOptions = {
  password: process.env.SECRET_COOKIE_PASSWORD!,
  cookieName: 'user',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 365, // 1 year
  },
}

declare module 'iron-session' {
  interface IronSessionData {
    cookieVariable?: any
  }
}

const getSession = async (req: Request, res: Response) => {
  const session = getIronSession<IronSessionData>(req, res, sessionOptions)
  return session
}

const getServerActionSession = async () => {
  const session = getServerActionIronSession<IronSessionData>(sessionOptions, cookies())
  return session
}

export { getSession, getServerActionSession }
