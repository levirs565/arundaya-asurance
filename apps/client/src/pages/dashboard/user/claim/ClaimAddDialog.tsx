import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@client/components/ui/dialog";
import { DialogDescription } from "@radix-ui/react-dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@client/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@client/components/ui/form";
import { Input } from "@client/components/ui/input";
import { Textarea } from "@client/components/ui/textarea";
import { useClaimMake } from "@client/api/claim";
import { useState } from "react";
import { ErrorLabel } from "@client/components/label";

const formSchema = z.object({
    type: z.string().min(2, { message: "Minimal terdiri dari 2 karakter." }),
    hospital: z.string().min(2, { message: "Minimal terdiri dari 2 karakter." }),
    description: z.string().min(2, { message: "Minimal terdiri dari 2 karakter." })
});

export function ClaimAddDialog({ children }: { children: any }) {
    const { trigger, isMutating, error, reset } = useClaimMake();
    const [open, setOpen] = useState(false);
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

    return <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent tag="form" onSubmit={form.handleSubmit(onSubmit, reset)}>
            <Form {...form}>
                <DialogHeader>
                    <DialogTitle>Ajukan Klaim</DialogTitle>
                    <DialogDescription>Formulir Pengajuan Klaim</DialogDescription>
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

                    {error && <ErrorLabel text={error.message}/>}
                </div>

                <DialogFooter>
                    <Button type="submit">Ajukan</Button>
                    <Button type="button" variant="outline" onClick={() => {
                        form.reset();
                        setOpen(false);
                    }}>Batal</Button>
                </DialogFooter>
            </Form>
        </DialogContent>
    </Dialog >
}