import { redirect, useNavigate, type ActionFunctionArgs, type LoaderFunctionArgs } from 'react-router'
import { auth } from '~/lib/auth.server'
import { authClient } from '~/lib/auth-client'
import type { Route } from "./+types/protected"

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await auth.api.getSession({ headers: request.headers })
  if (session?.user) {
    return { user: session.user }
  } else {
    throw redirect("/")
  }
}

export async function action({ request }: ActionFunctionArgs) {
  console.log('protected zone action called')
  return auth.handler(request)
}

export default function Protected({ loaderData }: Route.ComponentProps) {
  const navigator = useNavigate()

  const signOut = async () => {
    await authClient.signOut()
    console.log('signing out!')
    navigator('/')
  }

  return (
    <div className="text-white flex flex-col">
      <h1 className='text-white font-[Faculty_Glyphic] font-extrabold my-9 text-center text-5xl md:text-6xl'>CLEARCHAT</h1>
      <p>Hello, {JSON.stringify(loaderData.user.email)}</p>
      <button onClick={signOut} className="bg-blue-600 text-white border-blue-600">Sign Out</button>
    </div>
  )
}