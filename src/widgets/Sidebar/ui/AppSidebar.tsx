import {
  Bookmark,
  Home,
  LogOut,
  MessageCircleMore,
  Search,
  SquarePlus,
  TrendingUp,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/widgets/Sidebar/ui/Sidebar";

const mainItems = [
  {
    title: "Feed",
    url: "#",
    icon: Home,
  },
  {
    title: "Create",
    url: "#",
    icon: SquarePlus,
  },
  {
    title: "My Profile",
    url: "#",
    icon: Home,
  },
  {
    title: "Messenger",
    url: "#",
    icon: MessageCircleMore,
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
];

const secondaryItems = [
  {
    title: "Statistics",
    url: "#",
    icon: TrendingUp,
  },
  {
    title: "Favorites",
    url: "#",
    icon: Bookmark,
  },
];

const sidebarFooter = [
  {
    title: "Log Out",
    url: "#",
    icon: LogOut,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon style={{ width: "24px", height: "24px" }} />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {secondaryItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon style={{ width: "24px", height: "24px" }} />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          {sidebarFooter.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild>
                <a href={item.url}>
                  <item.icon style={{ width: "24px", height: "24px" }} />
                  <span>{item.title}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
