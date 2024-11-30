'use client'

import { useState } from 'react'
import { login, signup } from '@/app/login/actions'

export default function LoginPage() {
  const [message, setMessage] = useState('')

  async function handleSignup(formData: FormData) {
    const response = await signup(formData)
    if (response?.message) {
      setMessage(response.message)
    }
  }

  return (
    <div>
      <form>
        <label htmlFor="email">Email:</label>
        <input id="email" name="email" type="email" required />
        <label htmlFor="password">Password:</label>
        <input id="password" name="password" type="password" required />
        <button formAction={login}>Log in</button>
        <button
          type="button"
          onClick={async (event) => {
            event.preventDefault()
            const form = new FormData(event.currentTarget.closest('form') as HTMLFormElement)
            await handleSignup(form)
          }}
        >
          Sign up
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  )
}
