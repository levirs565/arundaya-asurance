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

const registerSchema = z.object({
  id: z.string({
    message: "Tidak Boleh Kosong"
  }).min(6, {
    message: "Minimal 6 Karakter"
  }),

  password: z.string({
    message: "Tidak Boleh Kosong"
  }).min(8, {
    message: "Minimal 8 Karakter"
  }),

  nik: z.string({
    message: "Tidak Boleh Kosong"
  }).min(16, {
    message: "Minimal 16 Karakter"
  }),

  name: z.string({
    message: "Tidak Boleh Kosong"
  }),
  
  birthDate: z.date().min(
    subYears(Date.now(), 17), {
      message: "Anda belum memenuhi batas umur"
    }
  ),

  job: z.string({
    message: "Tidak Boleh Kosong"
  }),

  income: z.number({
    message: "Tidak Boleh Kosong"
  }),

  motherName: z.string({
    message: "Tidak Boleh Kosong"
  })
})

function formatNumberWithDots(value) {
  // Remove any existing dots and format the number again
  return value.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

function RegisterForm() {
  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      id: "",
      password: "",
      nik: "",
      name: "",
      birthDate: Date.now(),
      job: "",
      income: 0,
      motherName: "" 
    }
  });

  const [date, setDate] = React.useState<Date>();

  function onSubmit(data) {
    console.log(data);
  }

  return <Form {...form}>
    <div className='flex items-center justify-center min-h-screen w-full px-4'>
      <form onSubmit={ form.handleSubmit(onSubmit)} className="w-full max-w-4xl">
        <Card className='max-w-96 mx-auto w-full' style={{ minWidth: '1000px'}}>
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
                      <div className='mt-2'>
                        <FormControl>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                              variant={"outline"}
                              className={cn(
                                "w-[280px] justify-start text-left font-normal",
                                !date && "text-muted-foreground"
                              )}>
                                <CalendarIcon />
                                {date ? format(date, "PPP") : <span>Pick a date</span>}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                              <Calendar
                                mode="single"
                                selected={date}
                                onSelect={setDate}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                        </FormControl>
                      </div>
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
                  render={({ field }) =>
                    <FormItem>
                      <FormLabel>Penghasilan Bulanan</FormLabel>
                      <FormControl>
                      <Input
                        {...field}
                        onChange={(e) => {
                          const formattedValue = formatNumberWithDots(e.target.value);
                          field.onChange(formattedValue); // Update the form field value with the formatted string
                        }}
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
            <Button type='submit'>Register</Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  </Form>
}
export function RegisterPage() {

  return <RegisterPage/>;
}
