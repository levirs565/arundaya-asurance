import { Dialog, DialogContent, DialogContentWrapper, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@client/components/ui/dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@client/components/ui/form";
import { z } from "zod";
import { Day, dayEnums } from "@client/types";
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@client/components/ui/button";
import { useState } from "react";
import { Input } from "@client/components/ui/input";
import { DaySelect } from "@client/components/day-select";
import { TimePicker24 } from "@client/components/ui/time-picker-24";
import { useAccountAddEmployee } from "@client/api/admin-employee";
import { ErrorLabel } from "@client/components/label";

const schema = z.object({
    id: z.string().min(6, {
        message: "Minimal 6 Karakter"
    }),

    password: z.string().min(8, {
        message: "Minimal 8 Karakter"
    }),
    name: z.string().min(1, {
        message: "Tidak Boleh Kosong"
    }),
    startDay: z.enum(dayEnums, {
        message: "Harus berupa hari"
    }),
    startTime: z.date({
        message: "Jam tidak boleh kosong"
    }),
    endDay: z.enum(dayEnums, {
        message: "Harus berupa hari"
    }),
    endTime: z.date({
        message: "Jam tidak boleh kosong"
    })
})

interface EmployeeDialogContentProps {
    form: UseFormReturn<any>;
    onSubmit: (data: any) => void,
    reset: () => void,
    error: any,
    isMutating: boolean,
    setOpen: (open: boolean) => void
}

export function EmployeeDialogContent({ form, onSubmit, reset, error, isMutating, setOpen }: EmployeeDialogContentProps) {
    return <DialogContent tag="form" onSubmit={form.handleSubmit(onSubmit, reset)}>
        <Form {...form}>
            <DialogHeader>
                <DialogTitle>Tambah Pegawai</DialogTitle>
                <DialogDescription></DialogDescription>
            </DialogHeader>

            <div className="space-y-2">
                <div className="flex flex-row *:flex-grow gap-2">
                    <FormField
                        control={form.control}
                        name="id"
                        render={({ field }) => <FormItem>
                            <FormLabel>ID</FormLabel>
                            <FormControl>
                                <Input type="text" {...field} />
                            </FormControl>
                            <FormDescription />
                            <FormMessage />
                        </FormItem>} />

                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => <FormItem>
                            <FormLabel>Nama</FormLabel>
                            <FormControl>
                                <Input type="text" {...field} />
                            </FormControl>
                            <FormDescription />
                            <FormMessage />
                        </FormItem>} />
                </div>

                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                            <Input type="password" {...field} />
                        </FormControl>
                        <FormDescription />
                        <FormMessage />
                    </FormItem>} />

                <div className="flex flex-row *:flex-grow gap-2">
                    <FormField
                        control={form.control}
                        name="startDay"
                        render={({ field }) => <FormItem>
                            <FormLabel>Hari Mulai</FormLabel>
                            <FormControl>
                                <DaySelect value={field.value as Day} onDaySelect={field.onChange} />
                            </FormControl>
                            <FormDescription />
                            <FormMessage />
                        </FormItem>} />

                    <FormField
                        control={form.control}
                        name="startTime"
                        render={({ field }) => <FormItem>
                            <FormLabel>Waktu Mulai</FormLabel>
                            <FormControl>
                                <TimePicker24 date={field.value} setDate={(val) => {
                                    console.log(val);
                                    field.onChange(val)
                                }} name={field.name} />
                            </FormControl>
                            <FormDescription />
                            <FormMessage />
                        </FormItem>} />
                </div>

                <div className="flex flex-row *:flex-grow gap-2">
                    <FormField
                        control={form.control}
                        name="endDay"
                        render={({ field }) => <FormItem>
                            <FormLabel>Hari Mulai</FormLabel>
                            <FormControl>
                                <DaySelect value={field.value as Day} onDaySelect={field.onChange} />
                            </FormControl>
                            <FormDescription />
                            <FormMessage />
                        </FormItem>} />

                    <FormField
                        control={form.control}
                        name="endTime"
                        render={({ field }) => <FormItem>
                            <FormLabel>Waktu Mulai</FormLabel>
                            <FormControl>
                                <TimePicker24 date={field.value} setDate={field.onChange} name={field.name} />
                            </FormControl>
                            <FormDescription />
                            <FormMessage />
                        </FormItem>} />
                </div>

                {error && <ErrorLabel text={error.message} />}
            </div>

            <DialogFooter>
                <Button type="submit" disabled={isMutating}>Tambah</Button>
                <Button type="button" variant="outline" disabled={isMutating} onClick={() => {
                    form.reset();
                    setOpen(false);
                }}>Batal</Button>
            </DialogFooter>
        </Form>
    </DialogContent>;
}

function EmployeeAddDialogContent({ setOpen }: { setOpen: (open: boolean) => void }) {
    const { trigger, isMutating, reset, error } = useAccountAddEmployee();
    const form = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            id: "",
            name: "",
            password: "",
            startDay: "",
            startTime: new Date(),
            endDay: "",
            endTime: new Date()
        }
    })

    function onSubmit(data: any) {
        trigger(data, {
            onSuccess: () => setOpen(false)
        })
    }

    return <EmployeeDialogContent error={error} form={form} isMutating={isMutating} onSubmit={onSubmit} reset={reset} setOpen={setOpen} />
}

export function EmployeeAddDialog({ children }: { children: any }) {
    const [open, setOpen] = useState(false);

    return <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
            {children}
        </DialogTrigger>
        <DialogContentWrapper>
            <EmployeeAddDialogContent setOpen={setOpen}/>
        </DialogContentWrapper>
    </Dialog>
}