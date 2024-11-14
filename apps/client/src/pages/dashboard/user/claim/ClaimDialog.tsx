import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogContentWrapper } from "@client/components/ui/dialog";
import { DialogDescription } from "@radix-ui/react-dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { Button } from "@client/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@client/components/ui/form";
import { Input } from "@client/components/ui/input";
import { Textarea } from "@client/components/ui/textarea";
import { useClaimMake, useClaimEdit, useClaimById, useClaimDelete } from "@client/api/claim";
import { forwardRef, useState, useEffect, useMemo } from "react";
import { ErrorLabel } from "@client/components/label";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, } from "@client/components/ui/alert-dialog"


const formSchema = z.object({
    type: z.string().min(2, { message: "Minimal terdiri dari 2 karakter." }),
    hospital: z.string().min(2, { message: "Minimal terdiri dari 2 karakter." }),
    description: z.string().min(2, { message: "Minimal terdiri dari 2 karakter." })
});
interface ClaimDialogContentProps {
    form: UseFormReturn<any>;
    onSubmit: (data: any) => void,
    reset: () => void
    error: any,
    isMutating: boolean,
    setOpen: (open: boolean) => void
    title: string
    positiveButton: string
}
const ClaimDialogContent = forwardRef<React.ElementRef<typeof DialogContent>, ClaimDialogContentProps>(({ form, onSubmit, reset, error, setOpen, isMutating, title, positiveButton }, ref) => {
    return <DialogContent ref={ref} tag="form" onSubmit={form.handleSubmit(onSubmit, reset)}>
        <Form {...form}>
            <DialogHeader>
                <DialogTitle>{title}</DialogTitle>
                <DialogDescription> </DialogDescription>
            </DialogHeader>

            <div className="space-y-2">
                <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Tipe Klaim</FormLabel>
                            <FormControl>
                                <Input placeholder="Tipe Klaim" {...field} />
                            </FormControl>
                            <FormDescription>

                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )} />

                <FormField
                    control={form.control}
                    name="hospital"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Rumah Sakit</FormLabel>
                            <FormControl>
                                <Input placeholder="Nama Rumah Sakit" {...field} />
                            </FormControl>
                            <FormDescription>

                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )} />

                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Deskripsi </FormLabel>
                            <FormControl>
                                <Textarea placeholder="Deskripsi lebih detail berdasarkan tipe klaim" {...field} />
                            </FormControl>
                            <FormDescription>

                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )} />

                {error && <ErrorLabel text={error.message} />}
            </div>

            <DialogFooter>
                <Button type="submit" disabled={isMutating}>{positiveButton}</Button>
                <Button type="button" disabled={isMutating} variant="outline" onClick={() => {
                    form.reset();
                    setOpen(false);
                }}>Batal</Button>
            </DialogFooter>
        </Form>
    </DialogContent>
})
ClaimDialogContent.displayName = "ClaimDialogContent";

const ClaimAddDialogContent = forwardRef<React.ElementRef<typeof ClaimDialogContent>, { setOpen: (open: boolean) => void }>(({ setOpen }, ref) => {
    const { trigger, isMutating, error, reset } = useClaimMake();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            type: "",
            hospital: "",
            description: ""
        }

    });
    function onSubmit(data: any) {
        trigger(data, {
            onSuccess: () => {
                setOpen(false);
                form.reset();
            }
        })
    }

    return <ClaimDialogContent title="Ajukan Klaim" positiveButton="Ajukan" ref={ref} error={error} form={form} isMutating={isMutating} onSubmit={onSubmit} reset={reset} setOpen={setOpen} ></ClaimDialogContent>
})

ClaimAddDialogContent.displayName = "ClaimAddDialogContent";

const ClaimEditDialogContent = forwardRef<React.ElementRef<typeof ClaimAddDialogContent>, { id: number, setOpen: (open: boolean) => void }>(({ id, setOpen }, ref) => {
    const { trigger, isMutating, error, reset } = useClaimEdit(id);
    const { data } = useClaimById(id);
    const currentData = useMemo(() => {
        if (!data) {
            return {
                type: "",
                hospital: "",
                description: ""
            }
        }
        return {
            type: data.type,
            hospital: data.hospital,
            description: data.description
        }
    }, [data]);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: currentData

    });
    useEffect(() => {
        form.reset(currentData);
    }, [data])

    function onSubmit(data: any) {
        trigger(data, {
            onSuccess: () => {
                setOpen(false);
                form.reset();
            }
        })
    }

    return <ClaimDialogContent title="Ubah Data Klaim" positiveButton="Ubah
    
    " ref={ref} error={error} form={form} isMutating={isMutating} onSubmit={onSubmit} reset={reset} setOpen={setOpen} ></ClaimDialogContent>
})
ClaimEditDialogContent.displayName = "ClaimEditDialogContent"

export function ClaimAddDialog({ children }: { children: any }) {
    const [open, setOpen] = useState(false);

    return <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContentWrapper>
            <ClaimAddDialogContent setOpen={setOpen}>

            </ClaimAddDialogContent>
        </DialogContentWrapper>
    </Dialog >
}

export function ClaimEditDialog({ id, children }: { id: number, children: any }) {
    const [open, setOpen] = useState(false);

    return <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContentWrapper>
            <ClaimEditDialogContent id={id} setOpen={setOpen}>
            </ClaimEditDialogContent>
        </DialogContentWrapper>
    </Dialog >
}

export function ClaimDeleteDialog({ id, children }: { id: number, children: any }) {
    const [open, setOpen] = useState(false);
    const { trigger, isMutating, error } = useClaimDelete(id);

    return <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Konfirmasi Pembatalan</AlertDialogTitle>
                <AlertDialogDescription>
                    Apakah anda yakin ingin membatalkan klaim?
                </AlertDialogDescription>
            </AlertDialogHeader>
            {error && <ErrorLabel text={error.message} />}
            <AlertDialogFooter>
                <AlertDialogCancel disabled={isMutating} >Batal</AlertDialogCancel>
                <AlertDialogAction disabled={isMutating} onClick={(e) => {
                    trigger(null, {
                        onSuccess: () => setOpen(false)
                    })
                    e.preventDefault()
                }}>Konfirmasi</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>

}