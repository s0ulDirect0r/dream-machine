import { Link, Outlet, type LoaderFunctionArgs } from "react-router";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider } from "~/components/ui/sidebar";

export async function loader({ request }: LoaderFunctionArgs) {
  // Load user's chats from DB and return as an object for the Sidebar
}

export default async function ChatSidebarLayout() {
  return (
    <SidebarProvider>
      <ChatSidebar />
       <Outlet />
     </SidebarProvider>
  )
}

export async function ChatSidebar() {
  return (
    <div>
      <h1>HELLO I AM HERE</h1>
      <div>
        <Sidebar>
        <SidebarContent>
          <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link to="nowhere">
                  <span>Menu Item</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link to="nowhere">
                  <span>Menu Item</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link to="nowhere">
                  <span>Menu Item</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
          </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      </div>
    </div>
  )
}