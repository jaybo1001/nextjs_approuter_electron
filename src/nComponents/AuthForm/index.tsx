'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AuthForm({ mode }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    // Handle login/signup logic here
    if (mode === 'login') {
      // Login logic
    } else {
      // Signup logic
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
      />
      <input 
        type="password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
      />
      <button type="submit">
        {mode === 'login' ? 'Log In' : 'Sign Up'}
      </button>
    </form>
  )
}