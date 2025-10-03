import type { Chat } from "db/db";
import { Link } from "react-router";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider } from "~/components/ui/sidebar";

export default function ChatSidebar({ chats }: { chats: Chat[] }) {
  return (
    <div className="font-[Faculty_Glyphic]">
      <div>
        <Sidebar>
        <SidebarContent className="bg-blue-600 border-blue-600">
          <SidebarGroup>
          <SidebarGroupLabel className="text-white font-bold text-1xl mb-3">Clearchat</SidebarGroupLabel>
          <SidebarGroupContent>
          <SidebarMenu className="gap-2">
            {chats.map((chat: Chat) => (
              <SidebarMenuItem key={chat.id}>
              <SidebarMenuButton asChild className="bg-yellow-500">
                  <Link to={`/chat/${chat.id}`}>
                    <span className="text-white font-bold">{String(chat.createdAt)}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
          </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      </div>
    </div>
  )
}