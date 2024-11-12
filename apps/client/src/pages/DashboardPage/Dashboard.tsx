import { useState } from 'react'
import { useForm } from 'react-hook-form';
import { SidebarProvider, SidebarTrigger } from "@client/components/ui/sidebar"
import { AppSidebar } from '@client/components/app-sidebar';
import { Outlet } from 'react-router-dom';

export function DashboardPage(){

    return (
        <SidebarProvider>
          <AppSidebar />
          <main className='w-full'>
            {/* <SidebarTrigger  /> */}
            <Outlet/>
          </main>
        </SidebarProvider>
      )
}
  