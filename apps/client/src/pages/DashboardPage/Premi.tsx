import { useState } from 'react';
import { Input } from '@client/components/ui/input';
import { Button } from '@client/components/ui/button';
import { PremiPay } from '@client/pages/DashboardPage/PremiPay'
import { PremiHistory } from '@client/pages/DashboardPage/PremiHistory'
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
        <div className='container'>
            <Card className='mt-5 ms-5 mb-5 w-[350px]'>
                <CardHeader>
                    <CardTitle>Bayar Premi</CardTitle>
                </CardHeader>
                <CardContent>
                    <PremiPay />
                </CardContent>
            </Card>

            <div className='ShowHistory mt-5 ms-5 mb-5'>
                <h1 className='mb-5'>Histori </h1>
                <PremiHistory/>
                <PremiHistory />
            </div>
        </div>
    );
}
