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
import { AppBar, AppBarTitle } from '@client/components/app-bar';
import { SidebarTrigger } from '@client/components/ui/sidebar';
import { PremiUpgradeDialog } from './PremiUpgradeDialog';

export function PremiPage() {

    return (
        <div className='p-4'>
            <AppBar>
                <SidebarTrigger/>
                <AppBarTitle>Premi</AppBarTitle>
            </AppBar>

            <div className='flex flex-col gap-4 lg:flex-row mb-4'>
                <Card className='grow basis-full'>
                    <CardHeader>
                        <CardTitle>Bayar Premi</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <PremiPay>
                            <Button>Bayar disini</Button>
                        </PremiPay>
                    </CardContent>
                </Card>
                <Card className='grow basis-full'>
                    <CardHeader>
                        <CardTitle>Upgrade Kelas Premi</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <PremiUpgradeDialog />
                    </CardContent>
                </Card>
            </div>

            <PremiHistory />
        </div>
    );
}
