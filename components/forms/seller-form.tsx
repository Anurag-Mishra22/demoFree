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
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../ui/select';
import CustomFormField, { FormFieldType } from '../customForm-field';
import FileUpload from '../file-upload';
import { Button } from '../ui/button';
import { Switch } from '../ui/switch';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { RegistationFormValidation, SellerFormValidation } from '@/lib/validation';
import newRequest from '@/features/auth/newRequest';
import toast from 'react-hot-toast';
import { ImageUpload } from '../img-upload';
import { UploadDropzone } from '@/lib/uploadthing';
import { XIcon } from 'lucide-react';
import LanguageTable from '@/app/(auth)/seller_onboarding/_components/language-table';
// import { FileUploader } from '../FileUploader';
// import { registerPatient } from '@/lib/actions/patient.actions';


const LANGUAGES = [
    'English',
    'Spanish',
    'French',
    'German',
    'Chinese',
    'Japanese',
    'Korean',
    'Portuguese',
    'Russian',
    'Arabic'
];


const SellerForm = () => {

    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [image, setImage] = useState<string>("");
    const [lang, setLang] = useState<string>("");
    const [lev, setLev] = useState<string>("");
    const [langs, setLangs] = useState<{ language: string, level: string }[]>([]);

    const form = useForm<z.infer<typeof SellerFormValidation>>({
        resolver: zodResolver(SellerFormValidation),
        defaultValues: {
            // languages: [
            //     {
            //         language: "",
            //         level: ""
            //     }
            // ]


        },
    });

    const onSubmit = async (values: z.infer<typeof SellerFormValidation>) => {
        setIsLoading(true);


        console.log(values);
        try {


        } catch (error) {
            console.log(error);
            toast.error("An error occured while creating account");
        }

        setIsLoading(false);
    };
    const handleDelete = () => {
        setImage("");
    }
    const addLanguage = () => {
        const currentLanguages = form.getValues().languages || []; // Initialize if undefined

        if (lang !== "" && lev !== "") {
            form.setValue("languages", [...currentLanguages, { language: lang, level: lev }]);
            setLangs([...langs, { language: lang, level: lev }]);
        }

        console.log(form.getValues().languages);
    };
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12 flex-1 ">

                <div className='flex flex-col p-12 px-32 -mt-32'>
                    <section className=" space-y-6 ">
                        <Card className='px-6'>
                            <CardHeader>
                                <CardTitle>Personal Info</CardTitle>
                                <CardDescription>Tell us a bit about yourself. This information will appear on your public profile, so that potential buyers can get to know you better.</CardDescription>
                            </CardHeader>
                            <CardContent className='flex flex-col gap-y-4'>

                                <div className='flex gap-x-4'>
                                    <CustomFormField
                                        control={form.control}
                                        fieldType={FormFieldType.INPUT}
                                        name="username"
                                        label='Username'
                                        placeholder="John Doe"

                                    />
                                    <CustomFormField
                                        control={form.control}
                                        fieldType={FormFieldType.INPUT}
                                        name="email"
                                        label='Email'
                                        placeholder="email"

                                    />
                                </div>
                                <CustomFormField
                                    control={form.control}
                                    fieldType={FormFieldType.INPUT}
                                    name="fullName"
                                    label='Display Name'
                                    placeholder="John Doe"
                                    description='To help build credible and authentic connections with customers, they’ll now see your display name. We suggest using your first name and first initial of your last name.'

                                />

                                <div className='flex justify-between gap-x-4 '>
                                    <div className='flex flex-col gap-y-4'>
                                        <Label>Language</Label>
                                        <div className='flex gap-x-4'>
                                            <Select onValueChange={(value) => {
                                                setLang(value);
                                            }}>
                                                <SelectTrigger className="w-[180px]">
                                                    <SelectValue placeholder="Language" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>

                                                        {
                                                            LANGUAGES.map((lan, index) => (
                                                                <SelectItem key={index} value={lan}>{lan}</SelectItem>
                                                            ))
                                                        }
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                            <Select onValueChange={(value) => {
                                                setLev(value);
                                            }} >
                                                <SelectTrigger className="w-[180px]">
                                                    <SelectValue placeholder="Language Level" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>

                                                        <SelectItem value="basic">Basic</SelectItem>
                                                        <SelectItem value="conversational">Conversational</SelectItem>
                                                        <SelectItem value="fluent">Fluent</SelectItem>
                                                        <SelectItem value="native">Native/Bilingual</SelectItem>

                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>

                                        </div>
                                        <Button onClick={addLanguage} type='button'>Add</Button>
                                    </div>
                                    <LanguageTable languages={langs} />
                                </div>
                                {/* Image upload field.................... */}
                                <FormField
                                    control={form.control}
                                    name="profilePicture"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Profile Picture</FormLabel>
                                            <FormDescription>
                                                Add a profile picture of yourself so customers will know exactly who they’ll be working with.
                                            </FormDescription>
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


                                <CustomFormField
                                    control={form.control}
                                    fieldType={FormFieldType.TEXTAREA}
                                    name="description"
                                    label='Description'
                                    placeholder="A short description about yourself"

                                />
                            </CardContent>
                        </Card>


                    </section>
                    <div className='flex justify-center'>
                        <Button type='submit'>Submit and Continue</Button>
                    </div>

                </div>





                {/* <SubmitButton isLoading={isLoading}>Submit and Continue</SubmitButton> */}
            </form>
        </Form>
    )
}

export default SellerForm