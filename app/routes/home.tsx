import { Form, redirect, type ActionFunctionArgs, type LoaderFunctionArgs } from "react-router";
import type { Route } from "./+types/home";
import { useState } from 'react';
import { auth } from '~/lib/auth.server'
import { authClient } from "~/lib/auth-client";
import SignIn from "~/components/signin";
import SignUp from "~/components/signup";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Dream Machine" },
    { name: "description", content: "Welcome to the Dream Machine." },
  ];
}

export async function loader({ request }: LoaderFunctionArgs) {
  console.log("request headers: ", request.headers)
  const session = await auth.api.getSession({ headers: request.headers })
  if (session?.user) {
    console.log("redirecting!")
    return redirect("/protected")
  } else {
    return
  }
}

export async function action({ request }: ActionFunctionArgs) {
  console.log(request)
  console.log('home action called!')
  return request
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { data, isPending, error } = authClient.useSession()

  const signOut = async () => {
    await authClient.signOut()
  }
    return (
      <div>
        <h4>Sign In</h4>
        <SignIn />
        <h4>Sign Up</h4>
        <SignUp />
      </div>
    )
}
