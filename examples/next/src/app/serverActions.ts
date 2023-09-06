'use server' //remove and set serverActions to false in next.config.js to disable server actions

import { getServerActionSession } from '../../lib/session'
import { redirect } from 'next/navigation'

const userFragment = `
  fragment user on UserType {
    id
    name
    email
    year
    isMember
  }
`

const REFRESH_MUTATION = `
  ${userFragment}
  mutation RefreshToken($token: String!) {
    refreshToken(token: $token) {
      token
      payload
      refreshExpiresIn
      user {
        ...user
      }
    }
  }
`

const VERIFY_MUTATION = `
  mutation VerifyToken($token: String!) {
    verifyToken(token: $token) {
      payload
    }
  }
`

const LOGIN_MUTATION = `
  ${userFragment}
    mutation login($email: String!, $password: String!){
      tokenAuth(
        email: $email, password: $password
      ) {
        token
        user {
          ...user
        }
      }
    }
  `

const fetchAPI = async (query: string, variables: object) => {
  if (!process.env.NEXT_PUBLIC_API) {
    throw new Error('NEXT_PUBLIC_API is not defined')
  }
  const result = await fetch(process.env.NEXT_PUBLIC_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  })
  const data = await result.json()
  return data
}

export const submitCookieToStorageServerAction = async (cookie: string) => {
  const session = await getServerActionSession()
  session.cookieVariable = cookie
  await session.save()
}

export const readCookieFromStorageServerAction = async (): Promise<any> => {
  const session = await getServerActionSession()
  if (session.cookieVariable) {
    const user = session.cookieVariable
    try {
      const { data: verifyData } = await fetchAPI(VERIFY_MUTATION, {
        token: user.token,
      })
      if (!verifyData?.verifyToken.payload) {
        throw new Error('Invalid token')
      }
      const { exp } = verifyData.verifyToken.payload
      const now = new Date()
      const expDate = new Date(exp * 1000)
      if (now < expDate) {
        return user
      }
      const { data } = await fetchAPI(REFRESH_MUTATION, {
        token: user.token,
      })
      const userObj = {
        isLoggedIn: true,
        token: data.refreshToken.token,
        info: data.refreshToken.user,
      }
      session.cookieVariable = userObj
      await session.save()
      return {
        isLoggedIn: true,
        token: data.refreshToken.token,
        info: user.info,
      }
    } catch (error) {
      console.error(error)
      redirect('/login')
    }
  } else {
    redirect('/login')
  }
}

export const login = async (
  email: string,
  password: string,
  redirect_path: string = '/'
): Promise<any> => {
  const session = await getServerActionSession()
  let user = { isLoggedIn: false, token: '', info: {} }
  try {
    const { data } = await fetchAPI(LOGIN_MUTATION, {
      // Setjum lower case email
      email: email.toLowerCase(),
      password,
    })
    user = { isLoggedIn: true, token: data.tokenAuth.token, info: data.tokenAuth.user }
    session.cookieVariable = user
    await session.save()
  } catch (error) {
    console.error(error)
  }
  redirect(redirect_path)
  return user
}
