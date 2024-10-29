import { useState } from 'react'
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './components/ui/card';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from './components/ui/form';
import { Input } from './components/ui/input';
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';

const loginSchema = z.object({
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

function App() {
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: ""
    }
  });

  function onSubmit(data) {
    console.log(data);
  }

  return <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <Card className='max-w-96 mx-auto'>
        <CardHeader>
          <CardTitle>Login</CardTitle>
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
                  aku suka auladi
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
                  aku suka auladi
                </FormDescription>
                <FormMessage />
              </FormItem>} />
        </CardContent>
        <CardFooter>
          <Button type='submit'>Login</Button>
        </CardFooter>
      </Card>
    </form>
  </Form>
}

export default App
