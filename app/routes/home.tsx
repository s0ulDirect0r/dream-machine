import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Dream Machine" },
    { name: "description", content: "Welcome to the Dream Machine." },
  ];
}

export default function Home() {
  return (
    <div>
      <p>Some stuff</p>
    </div>
  )
}
