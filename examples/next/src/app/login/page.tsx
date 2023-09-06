'use client'
import { submitCookieToStorageServerAction, login } from '../serverActions'

export default function Login() {
  const handleLogin = async (e: { preventDefault: () => void; target: any }) => {
    e.preventDefault()
    const form = e.target
    login(form.email.value, form.password.value)
  }

  return (
    <main>
      <div>
        <h1>Log in</h1>
        <form onSubmit={handleLogin}>
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" />
          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" />
          <button type="submit">Log in</button>
        </form>
      </div>
    </main>
  )
}
