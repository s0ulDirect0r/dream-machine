import { getUserChats } from "db/db";
import { Link, Outlet, type LoaderFunctionArgs } from "react-router";
import { auth } from "~/lib/auth.server";
import type { Route } from "./+types/chat-sidebar";
import ChatSidebar from "~/components/chat-sidebar-component";
import { SidebarProvider } from "~/components/ui/sidebar";

export async function loader({ request }: LoaderFunctionArgs) {
  // Load user's chats from DB and return as an object for the Sidebar
   const session = await auth.api.getSession({ headers: request.headers })
    if (session?.user) {
      const userChats = await getUserChats(session?.user.id)
      return { user: session.user, userChats }
    }
  return 
}

export default function ChatSidebarLayout({ loaderData }: Route.ComponentProps) {
  const { user, userChats } = loaderData
  console.log(user)
  console.log(userChats)

  return (
    <SidebarProvider>
      <ChatSidebar chats={userChats} />
       <Outlet />
     </SidebarProvider>
  )
}