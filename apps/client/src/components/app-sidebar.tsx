import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarFooter,
  } from "@client/components/ui/sidebar"
import { AccountAction } from "./account-action"

const data = {
    action: ["Switch Account", "Log out"],
    navMain: [
        {
            title: "Premi",
            url: "#",
        },
        {
            title: "History",
            url: "#",
        },
        {
            title: "Claim",
            url: "#",
        }
    ]
}
export function AppSidebar() {
return (
    <Sidebar>
    <SidebarHeader>
        <AccountAction ActionList={data.action} />
    </SidebarHeader>

    <SidebarContent>
        {data.navMain.map((item) => (
            <SidebarMenuItem key={item.title}>
            <SidebarMenuButton asChild isActive={item.isActive}>
                <a href={item.url}>{item.title}</a>
            </SidebarMenuButton>
            </SidebarMenuItem>
        ))}
    </SidebarContent>

    <SidebarFooter />
    </Sidebar>
)
}
  