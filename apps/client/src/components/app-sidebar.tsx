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
import { NavLink } from "react-router-dom"
import { useAccountState } from "@client/api/account"
import { AccountType } from "@client/types"

interface NavItem {
    title: string,
    url: string,
}

const navMain: Record<AccountType, NavItem[]> = {
    "ADMIN": [
        {
            title: "Pegawai",
            url: "/dashboard/admin/employee"
        },
    ],
    "USER": [
        {
            title: "Premi",
            url: "/dashboard/premi",
        },
        {
            title: "Claim",
            url: "/dashboard/user/claim",
        }
    ],
    "EMPLOYEE": [
        {
            "title": "Claim",
            url: "/dashboard/employee/claim"
        }
    ]
}

export function AppSidebar() {
    const { data } = useAccountState();

    return (
        <Sidebar>
            <SidebarHeader>
                <AccountAction />
            </SidebarHeader>

            <SidebarContent>
                <SidebarMenu>
                    {navMain[data.account.type as AccountType].map((item) => (
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
