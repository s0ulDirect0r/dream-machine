import { useState } from 'react'
import { Form } from 'react-router'
import { authClient } from '~/lib/auth-client'

export default function SignUp() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const signUp = async () => {
    await authClient.signUp.email({
      email,
      password,
      name
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
        <Form className="bg-blue-700 text-white border-blue-700" onSubmit={signUp} method="post">
          <label htmlFor="name">Name</label>
          <input onChange={(e) => setName(e.target.value)} className="bg-white text-black" name="name" type="text" />
          <label htmlFor="email">Email</label>
          <input onChange={(e) => setEmail(e.target.value)} className="bg-white text-black" name="email" type="text" />
          <label htmlFor="password">Password</label>
          <input onChange={(e) => setPassword(e.target.value)} className="bg-white text-black"name="password" type="password" />
          <button type="submit">Sign Up</button>
        </Form>
      </div>
  )
}