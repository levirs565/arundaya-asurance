import { useState } from 'react';
import { Input } from '@client/components/ui/input';
import { Button } from '@client/components/ui/button';

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@client/components/ui/card"
import { usePremiList } from '@client/api/premi'
import { format } from "date-fns";
import { Badge, BadgeProps } from "@client/components/ui/badge";
import { Check, Loader, X } from "lucide-react";
import { PremiPay } from './PremiPay';
import { PremiHistory } from './PremiHistory';

export function PremiPage() {
    const { data } = usePremiList();

    return (
        <div className='container'>
            <div className='flex'>
                <Card className='mt-5 ms-5 mb-5 w-[350px]'>
                    <CardHeader>
                        <CardTitle>Bayar Premi</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <PremiPay>
                            <Button>Bayar disini</Button>
                        </PremiPay>
                    </CardContent>
                </Card>
                <Card className='mt-5 ms-5 mb-5 w-[350px]'>
                    <CardHeader>
                        <CardTitle>Upgrade Kelas Premi</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <PremiPay>
                            <Button>Upgrade disini</Button>
                        </PremiPay>
                    </CardContent>
                </Card>
            </div>

            <div className="p-4">
                <PremiHistory/>
            </div>
        </div>
    );
}
