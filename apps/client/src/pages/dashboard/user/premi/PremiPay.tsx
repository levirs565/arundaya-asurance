import { useState } from 'react';
import { Input } from '@client/components/ui/input';
import { Button } from '@client/components/ui/button';
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
import { ErrorLabel } from '@client/components/label';

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
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Apakah anda yakin?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Bayar premi akan menarik saldo. Apakah anda ingin melanjutkan?
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
                    <Button type="submit" onClick={onSubmit}>
                        Lanjut
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}