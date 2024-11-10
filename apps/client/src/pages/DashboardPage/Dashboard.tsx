import { useState } from 'react'
import { useForm } from 'react-hook-form';
import { SidebarProvider, SidebarTrigger } from "@client/components/ui/sidebar"
import { AppSidebar } from '@client/components/app-sidebar';

export function DashboardPage({ children }: { children: React.ReactNode }){

    return (
        <SidebarProvider>
          <AppSidebar />
          <main>
            <SidebarTrigger />
            {children}
          </main>
        </SidebarProvider>
      )
}
  