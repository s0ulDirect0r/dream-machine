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
      <div className="flex justify-center gap-10">
        <Form className="flex flex-col gap-1 p-8 rounded-lg bg-blue-700 text-white border-blue-700" onSubmit={signUp} method="post">
          <label className="font-bold" htmlFor="name">Name</label>
          <input onChange={(e) => setName(e.target.value)} className="rounded-sm bg-white text-black" name="name" type="text" />
          <label className="font-bold" htmlFor="email">Email</label>
          <input onChange={(e) => setEmail(e.target.value)} className="rounded-sm bg-white text-black" name="email" type="text" />
          <label className="font-bold" htmlFor="password">Password</label>
          <input onChange={(e) => setPassword(e.target.value)} className="rounded-sm bg-white text-black"name="password" type="password" />
          <button className='bg-blue-900 rounded-lg p-2' type="submit">Sign Up</button>
        </Form>
      </div>
  )
}