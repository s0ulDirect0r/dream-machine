import { Form } from "react-router";
import type { Route } from "./+types/home";
import { useState } from 'react';
import { authClient } from "~/lib/auth-client";
import SignIn from "~/components/signin";
import SignUp from "~/components/signup";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Dream Machine" },
    { name: "description", content: "Welcome to the Dream Machine." },
  ];
}

export default function Home() {
  return (
    <div>
      <h4>Sign In</h4>
       <SignIn />
       <h4>Sign Up</h4>
       <SignUp />
    </div>
  )
}
