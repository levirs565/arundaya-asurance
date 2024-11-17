import { useAccountData, useUpdateAccountData } from "@client/api/account";
import { AppBar, AppBarTitle } from "@client/components/app-bar";
import { ErrorLabel } from "@client/components/label";
import { Button } from "@client/components/ui/button";
import { Calendar } from "@client/components/ui/calendar";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@client/components/ui/card";
import { CurrencyInput } from "@client/components/ui/currency-input";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@client/components/ui/form";
import { Input } from "@client/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@client/components/ui/popover";
import { SidebarTrigger } from "@client/components/ui/sidebar";
import { cn, formatCurrency } from "@client/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { format, subYears } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useEffect, useMemo } from "react";
import { id } from "react-day-picker/locale";
import { useForm } from "react-hook-form";
import { z } from "zod";

const baseSchema = z.object({
    name: z.string().min(1, {
        message: "Tidak Boleh Kosong"
    })
})

const userSchema = baseSchema.extend({
    birthDate: z.date().max(
        subYears(Date.now(), 17), {
        message: "Anda belum memenuhi batas umur"
    }),

    job: z.string().min(1, {
        message: "Tidak Boleh Kosong"
    }),

    income: z.number({
        message: "Harus berupa angka dan tidak boleh kosong"
    }),

    motherName: z.string().min(1, {
        message: "Tidak Boleh Kosong"
    })
})

function AccountForm({ data }: { data: any }) {
    const { isMutating, error, trigger, reset } = useUpdateAccountData();
    const currentValues = useMemo(() => {
        let result: any = {
            name: data.name
        }

        if (data.user) {
            result = {
                ...result,
                birthDate: new Date(data.user.birthDate),
                job: data.user.job,
                income: data.user.income,
                motherName: data.user.motherName
            }
        }

        return result;
    }, [data])
    const form = useForm({
        resolver: zodResolver(data.type == "USER" ? userSchema : baseSchema),
        defaultValues: currentValues
    })

    useEffect(() => {
        form.reset(currentValues);
    }, [data])

    function onSubmit(data: any) {
        const { name, ...user } = data;
        trigger({
            name,
            user
        } as any);
    }

    return <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit, reset)}>
            <Card>
                <CardHeader>
                    <CardTitle>Profil</CardTitle>
                </CardHeader>
                <CardContent>
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) =>
                            <FormItem>
                                <FormLabel>Nama</FormLabel>
                                <FormControl>
                                    <Input {...field}>
                                    </Input>
                                </FormControl>
                                <FormDescription>

                                </FormDescription>
                                <FormMessage />
                            </FormItem>}
                    />

                    {data.user && <>
                        <FormField
                            control={form.control}
                            name="birthDate"
                            render={({ field }) =>
                                <FormItem>
                                    <FormLabel>Tanggal Lahir</FormLabel>
                                    <FormControl>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant={"outline"}
                                                    className={cn(
                                                        "w-full flex justify-start text-left font-normal",
                                                        !field.value && "text-muted-foreground"
                                                    )}>
                                                    <CalendarIcon />
                                                    {field.value ? format(field.value, "dd MMMM yyyy") : <span>Pilih tinggal</span>}
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0">
                                                <Calendar
                                                    locale={id}
                                                    mode="single"
                                                    selected={field.value as any}
                                                    onSelect={field.onChange}
                                                    autoFocus
                                                    captionLayout='dropdown'
                                                    startMonth={new Date(1945, 0)}
                                                    endMonth={new Date()}
                                                    hideNavigation
                                                />
                                            </PopoverContent>
                                        </Popover>
                                    </FormControl>
                                    <FormDescription>

                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>}
                        />

                        <FormField
                            control={form.control}
                            name="job"
                            render={({ field }) =>
                                <FormItem>
                                    <FormLabel>Pekerjaan</FormLabel>
                                    <FormControl>
                                        <Input {...field}>
                                        </Input>
                                    </FormControl>
                                    <FormDescription>

                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>}
                        />

                        <FormField
                            control={form.control}
                            name="income"
                            render={({ field: { onChange, ...field } }) =>
                                <FormItem>
                                    <FormLabel>Penghasilan Bulanan</FormLabel>
                                    <FormControl>
                                        <CurrencyInput
                                            {...field}
                                            prefix="Rp"
                                            intlConfig={{ locale: "id-ID", currency: "IDR" }}
                                            onValueChange={(value, name, values) => onChange(values?.float)}
                                        />
                                    </FormControl>
                                    <FormDescription>

                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>}
                        />

                        <FormField
                            control={form.control}
                            name="motherName"
                            render={({ field }) =>
                                <FormItem>
                                    <FormLabel>Nama Ibu</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormDescription>

                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>}
                        />
                    </>}
                </CardContent>
                <CardFooter>
                    {error ? <ErrorLabel className='flex-grow' text={error.message} /> : <div className='flex-grow' />}
                    <Button type='submit' disabled={isMutating}>Update</Button>
                </CardFooter>
            </Card>
        </form>
    </Form >
}

function UserClass({ data }: { data: any }) {
    return <Card>
        <CardHeader>
            <CardTitle>Kelas</CardTitle>
        </CardHeader>
        <CardContent>
            <p className="text-lg font-semibold">Kelas {data.name}</p>
            <p>{formatCurrency(data.premiAmount)} per bulan</p>
        </CardContent>
    </Card>
}

export function AccountPage() {
    const { data } = useAccountData();

    return <div>
        <AppBar>
            <SidebarTrigger />
            <AppBarTitle>Akun</AppBarTitle>
        </AppBar>

        <div className="p-4 space-y-4">
            {data && <AccountForm data={data} />}

            {data && data.user && <UserClass data={data.user.subscriptionClass}/>}
        </div>
    </div>
}