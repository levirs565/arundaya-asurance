import * as React from "react"
import { Check, ChevronsUpDown, CircleUser } from "lucide-react"
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@client/components/ui/sidebar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@client/components/ui/dropdown-menu"


export function AccountAction({ActionList} : {ActionList: string[]}){
    const [selectedAction, setSelectedAction] = React.useState(ActionList[0]);

    return (
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                    <CircleUser className="size-4" />
                  </div>
                  <div className="flex flex-col gap-0.5 leading-none">
                    {/* Show akun nama */}
                    <span className="font-semibold">Account</span>
                  </div>
                  <ChevronsUpDown className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width]"
                align="start"
              >
                {ActionList.map((action) => (
                  <DropdownMenuItem
                    key={action}
                    onSelect={() => setSelectedAction(action)}
                  >
                    {action}{" "}
                    {action === selectedAction}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
    )
}