import { useState } from 'react'
import { Form } from 'react-router'
import { authClient } from '~/lib/auth-client'

export default function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const signIn = async () => {
    await authClient.signIn.email({
      email,
      password,
    },
    {
      onRequest: (ctx) => {

      },
      onSuccess: (ctx) => {
        console.log("success!!")
      },
      onError: (ctx) => {
        console.log(ctx.error)
      }
    }
  )
  }
  
  return (
      <div className="flex flex-col justify-center gap-10">
        <Form className="bg-blue-700 text-white border-blue-700" onSubmit={signIn} method="post">
          <label htmlFor="email">Email</label>
          <input onChange={(e) => setEmail(e.target.value)} className="bg-white text-black" name="email" type="text" />
          <label htmlFor="password">Password</label>
          <input onChange={(e) => setPassword(e.target.value)} className="bg-white text-black"name="password" type="password" />
          <button type="submit">Sign In</button>
        </Form>
      </div>
  )
}