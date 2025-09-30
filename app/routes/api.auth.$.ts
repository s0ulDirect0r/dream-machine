import { auth } from '../lib/auth.server'
import type { LoaderFunctionArgs, ActionFunctionArgs } from 'react-router'

export async function loader({ request }: LoaderFunctionArgs) {
  console.log("loader called")
  return auth.handler(request)
}

export async function action({ request }: ActionFunctionArgs) {
  console.log("action called")
  console.log(request)
  return auth.handler(request)
}