import { useState } from 'react';
import { Input } from '@client/components/ui/input';
import { Button } from '@client/components/ui/button';
import { PremiPay } from '@client/pages/DashboardPage/PremiPay'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@client/components/ui/card"
  

export function PremiPage() {
    return (
        <Card className="w-[350px] ms-5 mt-5">
            <CardHeader>
                <CardTitle>Bayar Premi</CardTitle>
            </CardHeader>
            <CardContent>
                <PremiPay />
            </CardContent>
        </Card>
    )
}
