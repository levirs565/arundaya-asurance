import { usePremiList, usePremiCancel } from "@client/api/premi"
import { Badge, BadgeProps } from "@client/components/ui/badge";
import { Button } from "@client/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@client/components/ui/card"
import { Collapsible, CollapsibleContent } from "@client/components/ui/collapsible";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@client/components/ui/dropdown-menu";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@client/components/ui/alert-dialog"
import { format } from "date-fns";
import { Check, CircleEllipsis, EllipsisVertical, FileSearch, Loader, X } from "lucide-react";
import { useState } from "react";
import { ErrorLabel } from '@client/components/label';
import { formatCurrency } from "@client/lib/utils";

const premiStateMessages: Record<string, string> = {
    "PENDING": 'Sedang Diproses',
    "FAIL": 'Gagal',
    "SUCCESS": 'Berhasil'
}

const premiStateVarians: Record<string, BadgeProps["variant"]> = {
    "PENDING": "secondary",
    "FAIL": "destructive",
    "SUCCESS": "success"
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

function PremiCancelDialog({ id }: { id: any }){
    const { trigger, error } = usePremiCancel(id);
    const [open, setOpen] = useState(false);
    
    function onSubmit(data: any) {
        trigger(undefined, {
            onSuccess: () => {
                setOpen(false);
            }
        })
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger>
                <Button>Batalkan Pembayaran Disini</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Apakah anda yakin untuk membatalkan pembayaran?</AlertDialogTitle>
                    <AlertDialogDescription>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                {error && <ErrorLabel text={error.message} />}
                <AlertDialogFooter>
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => {setOpen(false);}}
                        >
                        Cancel
                    </Button>
                    <Button type="submit" variant="destructive" onClick={onSubmit}>
                        Lanjut
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
            </AlertDialog>
    )
}
function Premi({ data }: { data: any }) {
    console.log(data);

    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    Tanggal: {format(new Date(data.date), "dd MMMM yyyy")}
                </CardTitle>
                <CardDescription className="flex flex-col">
                    <div>
                        Status: 
                        <Badge 
                            className="ml-2 inline-flex items-center" 
                            variant={premiStateVarians[data.state]}
                        >
                            {premiStateIcons[data.state]}
                            {premiStateMessages[data.state]}
                        </Badge>
                    </div>
                    <div>
                        Jumlah: {formatCurrency(data.amount)}
                    </div>
                </CardDescription>
            </CardHeader>
            <CardFooter>
                {data.state == "PENDING" && <PremiCancelDialog id={data.id}/>}
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