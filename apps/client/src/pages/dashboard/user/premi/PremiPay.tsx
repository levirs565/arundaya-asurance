import { useState } from 'react';
import { Input } from '@client/components/ui/input';
import { Button } from '@client/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogFooter,
    DialogTitle,
    DialogTrigger,
    DialogClose,
  } from "@client/components/ui/dialog"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAccountState } from '@client/api/account'
import { usePremiPay } from '@client/api/premi'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@client/components/ui/form";

export function PremiPay({ children }: { children: any }){
    const [open, setOpen] = useState(false);
    const { data } = useAccountState();
    const { trigger, isMutating, error, reset } = usePremiPay();

    function onSubmit(data: any) {
        trigger(undefined, {
            onSuccess: () => {
                setOpen(false);
            }
        })
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Apakah anda yakin?</DialogTitle>
                    <DialogDescription>
                        Bayar premi akan menarik saldo. Apakah anda ingin melanjutkan?
                    </DialogDescription>
                </DialogHeader>

                <DialogFooter>
                    <Button
                        type="button"
                        variant="outline">
                        Cancel
                    </Button>
                    <Button type="submit" onClick={onSubmit}>
                        Lanjut
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}