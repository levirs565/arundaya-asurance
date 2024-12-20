import { useState } from 'react'
import { Button } from '@client/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@client/components/ui/card';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@client/components/ui/form';
import { Input } from '@client/components/ui/input';
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { useAccountLogin, useAccountState } from '@client/api/account';
import { Link, Navigate } from 'react-router-dom';
import { cn } from '@client/lib/utils';
import { error } from 'console';
import { ErrorLabel } from '@client/components/label';

const loginSchema = z.object({
  password: z.string({
    message: "Tidak boleh kosong"
  }).min(8, {
    message: "Minimal 8 karakter"
  }), 
  id: z.string({
    message: "Tidak boleh kosong"
  }).min(6, {
    message: "Minimal 6 karakter"
  })
})

function LoginForm() {
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      id: "",
      password: ""
    }
  });
  const { trigger, isMutating, error, reset } = useAccountLogin();

  function onSubmit(data: any) {
    trigger(data);
  }

  return <Form {...form}>
    <div className='flex items-center justify-center h-screen w-full'>
      <form onSubmit={form.handleSubmit(onSubmit, reset)}>
        <Card className='max-w-96 mx-auto' style={{ minWidth: '360px' }}>
          <CardHeader>
            <CardTitle>Login</CardTitle>
          </CardHeader>
          <CardContent>
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
          <CardFooter className={cn("flex-col items-start gap-2")}>
            <p>Belum punya akun? <Link to="/register" className='underline decoration-zinc-500'>Register</Link></p>
            {error && <ErrorLabel text={error.message}/>}
            <Button type='submit' disabled={isMutating}>Login</Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  </Form>
}
export function LoginPage() {
  return <LoginForm/>;
}
