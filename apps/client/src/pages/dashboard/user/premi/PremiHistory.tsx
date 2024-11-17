import { usePremiList } from "@client/api/premi"
import { Badge, BadgeProps } from "@client/components/ui/badge";
import { Button } from "@client/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@client/components/ui/card"
import { Collapsible, CollapsibleContent } from "@client/components/ui/collapsible";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@client/components/ui/dropdown-menu";
import { format } from "date-fns";
import { Check, CircleEllipsis, EllipsisVertical, FileSearch, Loader, X } from "lucide-react";
import { useState } from "react";

const premiStateMessages: Record<string, string> = {
    "PENDING": 'Sedang Diproses',
    "FAIL": 'Gagal',
    "SUCCESS": 'Berhasil'
}

const premiStateVarians: Record<string, BadgeProps["variant"]> = {
    "PENDING": "secondary",
    "FAIL": "destructive",
}

const premiStateIconProps = {
    className: "mr-2",
    size: 20
};

const premiStateIcons: Record<string, any> = {
    "PENDING": <Loader {...premiStateIconProps} />,
    "SUCCESS": <Check {...premiStateIconProps} />,
    "FAIL": <X {...premiStateIconProps} />
}

function Premi({ data }: { data: any }) {

    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    Tanggal: {format(new Date(data.date), "dd MMMM yyyy")}
                </CardTitle>
                <CardDescription className="flex items-center">
                    Status: 
                    <Badge 
                        className="ml-2 inline-flex items-center" 
                        variant={premiStateVarians[data.state]}
                    >
                        {premiStateIcons[data.state]}
                        {premiStateMessages[data.state]}
                    </Badge>
                </CardDescription>
            </CardHeader>
            <CardFooter>
            </CardFooter>
        </Card>
    )

}

export function PremiHistory() {
    const { data, error, isLoading } = usePremiList();

    if (isLoading) {
        return (
            <div className="flex justify-center items-center p-8">
                <Loader className="animate-spin" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-red-500 p-4">
                Error loading premi data
            </div>
        );
    }

    if (!data || data.length === 0) {
        return (
            <div className="text-gray-500 p-4">
                No premi data available
            </div>
        );
    }

    return (
        <div className="space-y-2">
            {data.list.map((data:any) => (
                <Premi data={data} key={data.id} />
            ))}
        </div>
    );
}