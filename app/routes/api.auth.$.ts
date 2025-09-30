import { auth } from '../lib/auth.server'
import type { LoaderFunctionArgs, ActionFunctionArgs } from 'react-router'

// GET calls to /api/auth hit this!
export async function loader({ request }: LoaderFunctionArgs) {
  console.log("loader called")
  return auth.handler(request)
}

// POST, PUT, DELETE calls to /api/auth hits this!
export async function action({ request }: ActionFunctionArgs) {
  console.log("action called")
  console.log(request)
  return auth.handler(request)
}