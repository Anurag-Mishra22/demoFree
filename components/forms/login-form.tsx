"use client"
// import { PatientFormValidation } from '@/lib/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react'


import { useRouter } from 'next/navigation';
import { z } from 'zod';

// import SubmitButton from '../SubmitButton';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '../ui/form';
import { useForm } from 'react-hook-form';

import { Label } from '../ui/label';
import Image from 'next/image';
import { SelectGroup, SelectItem, SelectLabel } from '../ui/select';
import CustomFormField, { FormFieldType } from '../customForm-field';
import FileUpload from '../file-upload';
import { Button } from '../ui/button';
import { Switch } from '../ui/switch';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { LoginFormValidation } from '@/lib/validation';
import axios from 'axios';
import newRequest from '@/features/auth/newRequest';
import toast from 'react-hot-toast';
// import { FileUploader } from '../FileUploader';
// import { registerPatient } from '@/lib/actions/patient.actions';


const LoginForm = () => {

    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<z.infer<typeof LoginFormValidation>>({
        resolver: zodResolver(LoginFormValidation),
        defaultValues: {
            username: '',
            password: ''
        },
    });

    const onSubmit = async (values: z.infer<typeof LoginFormValidation>) => {
        setIsLoading(true);



        try {
            const res = await newRequest.post('/auth/login', values);
            console.log(res.data);
            localStorage.setItem('currentUser', JSON.stringify(res.data));
            router.push('/');
            toast.success('Login successful');
        } catch (error: any) {
            console.log(error.response.data);
            toast.error(error.response.data);
        }

        setIsLoading(false);
    };
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12 flex-1 ">

                <div className='flex p-12 justify-center gap-x-4'>
                    <section className=" space-y-6 w-1/2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Sign in</CardTitle>
                                {/* <CardDescription>Deploy your new project in one-click.</CardDescription> */}
                            </CardHeader>
                            <CardContent>

                                <CustomFormField
                                    control={form.control}
                                    fieldType={FormFieldType.INPUT}
                                    name="username"
                                    label='Username'
                                    placeholder="John Doe"
                                // iconSrc="/assets/icons/user.svg"
                                // iconAlt="user"
                                />

                                <CustomFormField
                                    control={form.control}
                                    fieldType={FormFieldType.INPUT}
                                    name="password"
                                    label='Password'
                                />

                            </CardContent>
                            <CardFooter>
                                <Button type='submit'>Sign in</Button>
                            </CardFooter>
                        </Card>


                    </section>

                </div>





                {/* <SubmitButton isLoading={isLoading}>Submit and Continue</SubmitButton> */}
            </form>
        </Form>
    )
}

export default LoginForm