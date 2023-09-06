'use client'

import Image from 'next/image'
import { useState } from 'react'
import {
  submitCookieToStorageServerAction,
  readCookieFromStorageServerAction,
} from './serverActions'
import {
  submitCookieToStorageRouteHandler,
  readCookieFromStorageRouteHandler,
} from './clientActions'

export default function Home() {
  const [currentCookie, setCurrentCookie] = useState('')
  const [readCookieFromStorage, setReadCookieFromStorage] = useState('')
  const handleSubmitCookieViaServerAction = async () => {
    submitCookieToStorageServerAction(currentCookie)
  }
  const handleReadCookieViaServerAction = async () => {
    const cookieFromStorage = await readCookieFromStorageServerAction()
    setReadCookieFromStorage(cookieFromStorage)
  }
  const handleSubmitCookieViaRouteHandler = async () => {
    submitCookieToStorageRouteHandler(currentCookie)
  }
  const handleReadCookieViaRouteHandler = async () => {
    const cookieFromStorage = await readCookieFromStorageRouteHandler()
    setReadCookieFromStorage(cookieFromStorage)
  }
  return <main>Helo there</main>
}
