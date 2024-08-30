"use client"
// import { PatientFormValidation } from '@/lib/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react'


import { useRouter } from 'next/navigation';
import { z } from 'zod';

// import SubmitButton from '../SubmitButton';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { useForm } from 'react-hook-form';

import { Label } from '../ui/label';
import Image from 'next/image';
import { SelectGroup, SelectItem, SelectLabel } from '../ui/select';
import CustomFormField, { FormFieldType } from '../customForm-field';
import FileUpload from '../file-upload';
import { Button } from '../ui/button';
import { Switch } from '../ui/switch';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { RegistationFormValidation } from '@/lib/validation';
import newRequest from '@/features/auth/newRequest';
import toast from 'react-hot-toast';
import { UploadDropzone } from '@/lib/uploadthing';
import { XIcon } from 'lucide-react';
// import { FileUploader } from '../FileUploader';
// import { registerPatient } from '@/lib/actions/patient.actions';


const COUNTRIES = [
    'United States',
    'Canada',
    'United Kingdom',
    'Australia',
    'Germany',
    'France',
    'Italy',
    'Spain',
    'Mexico',
    'Brazil',
    'China',
    'Japan',
    'India',
    'South Korea',
    'Russia',
    'South Africa',
    'New Zealand',
    'Argentina',
    'Saudi Arabia',
    'United Arab Emirates'
];

const RegisterForm = () => {

    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [image, setImage] = useState<string>("");

    const form = useForm<z.infer<typeof RegistationFormValidation>>({
        resolver: zodResolver(RegistationFormValidation),
        defaultValues: {



        },
    });

    const onSubmit = async (values: z.infer<typeof RegistationFormValidation>) => {
        setIsLoading(true);


        console.log(values);
        try {
            await newRequest.post("/auth/register", {
                ...values,
                img: ""
            });
            toast.success("Account created successfully");
            // router.push("/auth/login");

        } catch (error) {
            console.log(error);
            toast.error("An error occured while creating account");
        }

        setIsLoading(false);
    };
    const handleDelete = () => {
        setImage("");
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12 flex-1 ">

                <div className='flex p-12 justify-between gap-x-4'>
                    <section className=" space-y-6 w-1/2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Create a new account</CardTitle>
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
                                    name="email"
                                    label='Email'
                                    placeholder="email"
                                // iconSrc="/assets/icons/user.svg"
                                // iconAlt="user"
                                />
                                <CustomFormField
                                    control={form.control}
                                    fieldType={FormFieldType.INPUT}
                                    name="password"
                                    label='Password'
                                />
                                <CustomFormField
                                    control={form.control}
                                    fieldType={FormFieldType.SELECT}
                                    name="country"
                                    label='Country'
                                    placeholder="Select Country"
                                // iconSrc="/assets/icons/user.svg"
                                // iconAlt="user"
                                >
                                    <SelectGroup>
                                        {
                                            COUNTRIES.map((country, index) => (
                                                <SelectItem key={index} value={country}>
                                                    {country}
                                                </SelectItem>
                                            ))
                                        }
                                    </SelectGroup>
                                </CustomFormField>
                                <CustomFormField
                                    control={form.control}
                                    fieldType={FormFieldType.PHONE_INPUT}
                                    name="phone"
                                    label='Phone Number'
                                    placeholder="+91 1234567890"
                                // iconSrc="/assets/icons/user.svg"
                                // iconAlt="user"
                                />
                            </CardContent>
                        </Card>


                    </section>
                    <section className=" space-y-6 flex flex-col justify-center w-1/2 ">
                        <Card>
                            <CardHeader>
                                <CardTitle>I want to become a seller</CardTitle>
                                {/* <CardDescription>Deploy your new project in one-click.</CardDescription> */}
                            </CardHeader>
                            <CardContent>


                                {/* <FormField
                                    control={form.control}
                                    name="isSeller"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                            <div className="space-y-0.5">
                                              
                                                <FormDescription>
                                                    Activate the seller account
                                                </FormDescription>
                                            </div>
                                            <FormControl>
                                                <Switch
                                                    // checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                /> */}




                                {/* Image upload field.................... */}
                                <FormField
                                    control={form.control}
                                    name="profilePicture"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Profile Picture</FormLabel>
                                            <FormControl>
                                                {
                                                    image.length > 1 ? (
                                                        <div className="flex gap-5">

                                                            <div className="relative w-[100px] h-[100px]">
                                                                <Image
                                                                    height={100}
                                                                    width={100}
                                                                    src={image}
                                                                    alt="Product Image"
                                                                    className="w-full h-full object-cover rounded-lg border"
                                                                />
                                                                <button
                                                                    onClick={() => handleDelete()}
                                                                    type="button"
                                                                    className="absolute -top-3 -right-3 bg-red-500 p-2 rounded-lg text-white">
                                                                    <XIcon className="w-3 h-3" />
                                                                </button>
                                                            </div>

                                                        </div>
                                                    ) : (
                                                        <UploadDropzone endpoint="userImage" onClientUploadComplete={(res) => {
                                                            setImage(res?.[0].url);

                                                        }}
                                                            onUploadError={(error: Error) => {
                                                                toast.error(`${error?.message}`);
                                                            }}
                                                        />
                                                    )
                                                }

                                            </FormControl>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </CardContent>
                            <Button type='submit'>Register</Button>
                        </Card>
                    </section>
                </div>





                {/* <SubmitButton isLoading={isLoading}>Submit and Continue</SubmitButton> */}
            </form>
        </Form>
    )
}

export default RegisterForm