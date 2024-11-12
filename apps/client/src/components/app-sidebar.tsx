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
import { Link, NavLink } from "react-router-dom"

const data = {
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
                <AccountAction />
            </SidebarHeader>

            <SidebarContent>
                <SidebarMenu>
                    {data.navMain.map((item) => (
                        <SidebarMenuItem key={item.title}>
                            <NavLink to={item.url}>
                                {({ isActive }) => (
                                    <SidebarMenuButton isActive={isActive}>
                                        {item.title}
                                    </SidebarMenuButton>
                                )}
                            </NavLink>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarContent>

            <SidebarFooter />
        </Sidebar>
    )
}
