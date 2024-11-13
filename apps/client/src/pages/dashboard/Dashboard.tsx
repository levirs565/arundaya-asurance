import { useState } from 'react'
import { useForm } from 'react-hook-form';
import { SidebarProvider, SidebarTrigger } from "@client/components/ui/sidebar"
import { AppSidebar } from '@client/components/app-sidebar';
import { Navigate, Outlet } from 'react-router-dom';
import { useAccountState } from '@client/api/account';

export function DashboardPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className='w-full'>
        {/* <SidebarTrigger  /> */}
        <Outlet />
      </main>
    </SidebarProvider>
  )
}
