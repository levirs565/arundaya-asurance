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
import { Link } from "react-router-dom"

const data = {
    action: ["Switch Account", "Log out"],
    navMain: [
        {
            title: "Premi",
            url: "/dashboard/premi",
        },
        {
            title: "Claim",
            url: "/dashboard/claim",
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
        <SidebarMenu>
            {data.navMain.map((item) => (
                <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild isActive={item.isActive}>
                    <Link to={item.url}>{item.title}</Link>
                </SidebarMenuButton>
                </SidebarMenuItem>
            ))}
        </SidebarMenu>
    </SidebarContent>

    <SidebarFooter />
    </Sidebar>
)
}
  