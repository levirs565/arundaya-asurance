import { useState } from 'react'
import { Button } from '@client/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@client/components/ui/card';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@client/components/ui/form';
import { Input } from '@client/components/ui/input';
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';

const registerSchema = z.object({
  password: z.string({
    message: "tidak boleh kosong"
  }).min(8, {
    message: "minimal 8 karakter"
  })
  , username: z.string({
    message: "tidak boleh kosong"
  }).min(6, {
    message: "minimal 6 karakter"
  })
})

function RegisterForm() {
  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      password: ""
    }
  });

  function onSubmit(data) {
    console.log(data);
  }

  return <Form {...form}>
    <div className='flex items-center justify-center h-screen w-full'>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className='max-w-96 mx-auto' style={{ minWidth: '360px', minHeight: '100px' }}>
          <CardHeader>
            <CardTitle>Register</CardTitle>
          </CardHeader>
          <CardContent>

            <FormField
              control={form.control}
              name="username"
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
                </FormItem>} />

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
                </FormItem>} />
          </CardContent>
          <CardFooter>
            <Button type='submit'>Login</Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  </Form>
}
export function RegisterPage() {

  return RegisterForm();
}