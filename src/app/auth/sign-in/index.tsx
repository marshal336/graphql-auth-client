'use client'
import React from 'react'
import Link from 'next/link'
import { Form, FormControl, FormField, FormLabel, FormMessage } from '~/components/ui/form'
import { z } from "zod"
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from '~/components/ui/input'
import { Card, CardHeader, CardTitle } from '~/components/ui/card'
import { Button } from '~/components/ui/button'
import { PAGES } from '~/utils/page.enum'
import { useSignInMutation, useSignUpMutation } from '~/gql/_generated'
import { toast } from "sonner"
import { useRouter } from 'next/navigation'

const Page = () => {
    const { push } = useRouter()
    const formSchema = z.object({
        email: z.string().email({ message: 'no valid email' }),
        password: z.string().min(3, { message: 'min length 3' })
    })
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: 'test@test.com',
            password: '12'
        },
    })
    const [signUp, { data, error,}] = useSignInMutation({
        variables: {
            input: {
                email: form.getValues().email,
                password: form.getValues().password,
            }
        }
    })
    function onSubmit() {
        signUp()
    }
    if (error) {
        toast.error(error.message)
    }
    if (data) {
        toast.success('You are login')
       push(PAGES.HOME)
    }
    return (
        <Card className='max-w-[400px] py-2 px-4 mx-auto mt-[100px]'>
            <CardHeader className='text-center'>
                <CardTitle>Log in</CardTitle>
            </CardHeader>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-2'>
                    <FormField
                        control={form.control}
                        name='email'
                        render={({ field }) => (
                            <>
                                <FormLabel className=''>Email</FormLabel>
                                <FormControl>
                                    <Input className='placeholder:text-white/20' placeholder='email' type='email' {...field} />
                                </FormControl>
                                <FormMessage />
                            </>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='password'
                        render={({ field }) => (
                            <>
                                <FormLabel className=''>Password</FormLabel>
                                <FormControl>
                                    <Input className='placeholder:text-white/20' placeholder='password' type='password' {...field} />
                                </FormControl>
                                <FormMessage />
                            </>
                        )}
                    />
                    <div className="flex gap-3 pt-8 pb-2">
                        <Button type='submit' variant={'outline'}>Submit</Button>
                        <Link href={PAGES.SIGN_IN}><Button variant={'secondary'}>Aready exist accout?</Button></Link>
                    </div>
                </form>
            </Form>
        </Card>
    )
}

export default Page