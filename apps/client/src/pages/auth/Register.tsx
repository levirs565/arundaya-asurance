import * as React from 'react'
import { useForm } from 'react-hook-form';
import { Calendar as CalendarIcon } from "lucide-react"
import { cn } from "@client/lib/utils"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@client/components/ui/form';
import { 
  Card,
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@client/components/ui/card';
import { Button } from '@client/components/ui/button';
import { Input } from '@client/components/ui/input';
import { Calendar } from '@client/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@client/components/ui/popover"
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { subYears, format } from "date-fns";
import { useAccountRegister, useAccountState } from '@client/api/account';
import { Navigate, useNavigate } from 'react-router-dom';
import { ErrorLabel } from '@client/components/label';
import { id } from "react-day-picker/locale"
import { CurrencyInput } from '@client/components/ui/currency-input';

const registerSchema = z.object({
  id: z.string().min(6, {
    message: "Minimal 6 Karakter"
  }),

  password: z.string().min(8, {
    message: "Minimal 8 Karakter"
  }),

  nik: z.string().length(16, {
    message: "Harus 16 Karakter"
  }),

  name: z.string().min(1, {
    message: "Tidak Boleh Kosong"
  }),

  birthDate: z.date().max(
    subYears(Date.now(), 17), {
      message: "Anda belum memenuhi batas umur"
    }),

  job: z.string().min(1, {
    message: "Tidak Boleh Kosong"
  }),

  income: z.number({
    message: "Harus berupa angka"
  }),

  motherName: z.string().min(1, {
    message: "Tidak Boleh Kosong"
  })
});



function RegisterForm() {
  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      id: "",
      password: "",
      nik: "",
      name: "",
      birthDate: null,
      job: "",
      income: "",
      motherName: "" 
    }
  });
  const { trigger, isMutating, error, reset } = useAccountRegister();
  const navigate = useNavigate();

  function onSubmit(data: any) {
    trigger(data, {
      onSuccess: () => navigate("/login")
    })
  }

  return <Form {...form}>
    <div className='flex items-center justify-center min-h-screen w-full px-4'>
      <form onSubmit={ form.handleSubmit(onSubmit, reset)} className="w-full max-w-4xl">
        <Card className='max-w-96 mx-auto w-full md:min-w-[560px]'>
          <CardHeader>
            <CardTitle>Register</CardTitle>
          </CardHeader>
          <CardContent>
           <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div>
              <FormField
                control={form.control}
                name="id"
                render={({ field }) =>
                  <FormItem>
                    <FormLabel>Username</FormLabel>
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
                name="password"
                render={({ field }) =>
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type='password' {...field}>
                      </Input>
                    </FormControl>
                    <FormDescription>
                      
                    </FormDescription>
                    <FormMessage />
                </FormItem>}
              />

              <FormField
                control={form.control}
                name="nik"
                render={({ field }) =>
                  <FormItem>
                    <FormLabel>Nomor Induk Keluarga</FormLabel>
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
            </div>
            <div>
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
                  render={({ field: { onChange, ...field }}) =>
                    <FormItem>
                      <FormLabel>Penghasilan Bulanan</FormLabel>
                      <FormControl>
                      <CurrencyInput
                        {...field}
                        prefix="Rp"
                        intlConfig={{ locale: "id-ID", currency: "IDR" }}
                        onValueChange={onChange}
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
                        <Input {...field}/>
                      </FormControl>
                      <FormDescription>
                        
                      </FormDescription>
                      <FormMessage />
                  </FormItem>}
                />
            </div>
           </div>
          </CardContent>
          <CardFooter>
            {error ? <ErrorLabel className='flex-grow' text={error.message}/> : <div className='flex-grow'/>}
            <Button type='submit' disabled={isMutating}>Register</Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  </Form>
}
export function RegisterPage() {
  const { data } = useAccountState();
  if (data && data.account) return <Navigate to="/dashboard" />

  return <RegisterForm/>;
}
