import { useState } from 'react'
import { Form, useNavigate } from 'react-router'
import { authClient } from '~/lib/auth-client'

export default function SignIn() {
  const navigator = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const signIn = async () => {
    await authClient.signIn.email({
      email,
      password,
    },
    {
      onSuccess: (ctx) => {
        console.log("success!!: ", ctx.data)
        navigator('/protected')
      },
      onError: (ctx) => {
        console.log(ctx.error)
      }
    }
  )
  }
  
  return (
      <div className="flex justify-center gap-10">
        <Form className="flex flex-col gap-2 rounded-lg p-8 bg-yellow-500 text-white border-blue-700" onSubmit={signIn} method="post">
          <label className="font-bold" htmlFor="email">Email</label>
          <input onChange={(e) => setEmail(e.target.value)} className="rounded-sm bg-white text-black" name="email" type="text" />
          <label className="font-bold" htmlFor="password">Password</label>
          <input onChange={(e) => setPassword(e.target.value)} className="rounded-sm mb-2 bg-white text-black"name="password" type="password" />
          <button className="bg-blue-500 rounded-lg p-2" type="submit">Sign In</button>
        </Form>
      </div>
  )
}