"use client"
// import { PatientFormValidation } from '@/lib/validation';
import { zodResolver } from '@hookform/resolvers/zod';

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';


import { useRouter } from 'next/navigation';
import { z } from 'zod';

// import SubmitButton from '../SubmitButton';

import { useForm } from 'react-hook-form';

import { Label } from '../ui/label';
import Image from 'next/image';
import { SelectGroup, SelectItem, SelectLabel } from '../ui/select';
import CustomFormField, { FormFieldType } from '../customForm-field';
import FileUpload from '../file-upload';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import newRequest from '@/features/auth/newRequest';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { XIcon } from 'lucide-react';
import TipTapEdiotor from '../tip-tap-editor';
import useFileData from '@/hooks/tip-tap-data';
import useFileDataJson from '@/hooks/tip-tap-data-json';
import { GigFormValidation } from '@/lib/validation';
import toast from 'react-hot-toast';
import Paragraph from '../headingCompo/Paragraph';
// import { FileUploader } from '../FileUploader';
// import { registerPatient } from '@/lib/actions/patient.actions';\
import { UploadDropzone } from '@/lib/uploadthing';
import React, { useState } from 'react';


const GigForm = () => {
    const [image, setImage] = useState<string>("");
    const content = [
        { type: 'text', text: 'Are you building a startup like ' },
        { type: 'text', marks: [{ type: 'bold' }], text: 'Uber, Instagram, DoorDash, Tinder' },
        { type: 'text', text: '?' }
    ]
    const descString = useFileData((state) => state.item)
    const descStringJson = useFileDataJson((state) => state.item)

    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [features, setfeatures] = useState<string[]>([]);

    // const { isPending, error, data } = useQuery({
    //     queryKey: ['gigsszdfsd'],
    //     queryFn: async () => {
    //         newRequest.get(`/gigs`).then((res) => {

    //             return res.data;
    //         })
    //         console.log(data);
    //     }
    // })


    const form = useForm<z.infer<typeof GigFormValidation>>({
        resolver: zodResolver(GigFormValidation),
        defaultValues: {
            title: '',


            totalStars: 0,
            starNumber: 0,
            cat: '',
            price: '0',
            cover: '',
            images: [],
            shortTitle: '',
            shortDesc: '',
            deliveryTime: '0',
            revisionNumber: '0',
            features: [],
        },
    });
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (gig: z.infer<typeof GigFormValidation>) => {
            return newRequest.post('/gigs', gig, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
        },
        onSuccess: () => {
            // queryClient.invalidateQueries('gigs');
            toast.success('Gig Created Successfully');
        },
        onError: (error) => {
            console.log(error);
            toast.error('Failed to create Gig');
        }
    })

    const onSubmit = async (values: z.infer<typeof GigFormValidation>) => {
        const user = JSON.parse(localStorage.getItem('currentUser')!);

        console.log(values);

        // // console.log(values);


        // // console.log('Form Submitted................');
        // // // console.log(values);
        // // // console.log(descString);
        // // // console.log(descStringJson);
        // // // console.log(features);

        try {
            const gig = {
                ...values,
                userId: user._id,
                desc: descString,
                descJson: descStringJson,
                features,
                cover: image


            }
            mutation.mutate(gig);
            console.log(gig);
        } catch (error) {
            toast.error('Failed to create Gig');
            console.log(error);
        }
    };

    const handleAddItem = () => {
        if (inputValue.trim()) {
            setfeatures([...features, inputValue]);
            setInputValue(''); // Clear the input field after adding
        }
    };
    const { errors } = form.formState;
    console.log(errors);
    const handleDelete = () => {
        setImage("");
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12 flex-1">

                <section className=" space-y-6">
                    <div className='mb-9 space-y-2'>
                        <h2 className="sub-header">Gig Detail</h2>
                        <p className='para '>Keep it short and simple - this will help us match you to the right category.</p>
                    </div>
                    <CustomFormField
                        control={form.control}
                        fieldType={FormFieldType.INPUT}
                        name="title"
                        label='Title'
                        placeholder="John Doe"
                    />

                    <div className='flex  gap-x-2'>
                        <CustomFormField
                            control={form.control}
                            fieldType={FormFieldType.SELECT}
                            name="cat"
                            label='Category'
                            placeholder="Select Category"
                        >
                            <SelectGroup>
                                <SelectItem value="programmingAndTech">Programming & Tech</SelectItem>
                                <SelectItem value="socialMediaMarketing">Digital Marketing</SelectItem>
                            </SelectGroup>
                        </CustomFormField>
                        <CustomFormField
                            control={form.control}
                            fieldType={FormFieldType.SELECT}
                            name="subCat"
                            label='Sub Category'
                            placeholder="Select Category"
                        >
                            {
                                form.watch('cat') === 'programmingAndTech' && (
                                    <SelectGroup>
                                        <SelectGroup>

                                            <SelectItem value="websiteDevelopment">Website Development</SelectItem>
                                            <SelectItem value="mobileAppDevelopment">Mobile App Development</SelectItem>
                                            <SelectItem value="dataScience&ML">Data Science & ML</SelectItem>
                                        </SelectGroup>
                                    </SelectGroup>
                                ) || form.watch('cat') === 'socialMediaMarketing' && (
                                    <SelectGroup>
                                        <SelectItem value="socialMediaMarketing">Social Media Marketing</SelectItem>
                                        <SelectItem value="emailMarketing">Email Marketing</SelectItem>
                                    </SelectGroup>
                                )
                                || form.watch('cat') === '' && (
                                    (
                                        <SelectGroup>
                                            <SelectLabel>Plz Select the category first</SelectLabel>
                                        </SelectGroup>
                                    )
                                )
                            }
                        </CustomFormField>
                    </div>



                    <div className='border-stone-200 shadow-xl border rounded-lg p-12'>
                        <TipTapEdiotor />
                    </div>

                </section>
                <section className=" space-y-6">
                    <div className='mb-9 space-y-2'>
                        <h2 className="sub-header">Service Detail</h2>
                        <p className='para'>This will help get your brief to the right talent. Specifics help here.</p>
                    </div>



                    <CustomFormField
                        control={form.control}
                        fieldType={FormFieldType.INPUT}
                        name="shortTitle"
                        label='Service Title'
                        placeholder="John Doe"
                    // iconSrc="/assets/icons/user.svg"
                    // iconAlt="user"
                    />
                    <CustomFormField
                        control={form.control}
                        fieldType={FormFieldType.TEXTAREA}
                        name="shortDesc"
                        label='Short Description'
                        placeholder="Short Description of the service"
                    // iconSrc="/assets/icons/user.svg"
                    // iconAlt="user"
                    />

                    <div className='flex flex-col gap-6 xl:flex-row'>
                        <CustomFormField
                            control={form.control}
                            fieldType={FormFieldType.INPUT}
                            name="deliveryTime"
                            label='Delivery Time (e.g. 3 days)'
                            placeholder="John Doe"
                        // iconSrc="/assets/icons/user.svg"
                        // iconAlt="user"
                        />
                        <CustomFormField
                            control={form.control}
                            fieldType={FormFieldType.INPUT}
                            name="revisionNumber"
                            label='Revision Number'
                            placeholder="John Doe"
                        // iconSrc="/assets/icons/user.svg"
                        // iconAlt="user"
                        />
                    </div>

                    <div className='flex  gap-6 xl:flex-row items-center'>

                        <div className='flex flex-col gap-y-2  flex-1'>
                            <Label>Add Features</Label>
                            <div className='flex gap-x-2'>
                                <Input
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    placeholder="Add Features"
                                    className=''
                                />
                                <Button type="button" onClick={handleAddItem}>Add Item</Button>
                            </div>
                            <ul className='flex gap-x-2'>
                                {features.map((item, index) => (
                                    <li className='p-2 text-white bg-black rounded-xl  flex' key={index}>
                                        {item}
                                        <XIcon className='ml-2 cursor-pointer' onClick={() => setfeatures(features.filter((_, i) => i !== index))} />
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <CustomFormField
                            control={form.control}
                            fieldType={FormFieldType.INPUT}
                            name="price"
                            label='Price'
                            placeholder="John Doe"
                        // iconSrc="/assets/icons/user.svg"
                        // iconAlt="user"
                        />

                        {/* <p>{bears}</p> */}
                    </div>




                    {/* Image upload field.................... */}
                    <FormField
                        control={form.control}
                        name="cover"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Profile Picture</FormLabel>
                                <FormControl>
                                    {
                                        image?.length > 1 ? (
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
                                            <UploadDropzone endpoint="gigFile" onClientUploadComplete={(res) => {
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
                </section>


                <Button type="submit">Submit</Button>




                {/* <SubmitButton isLoading={isLoading}>Submit and Continue</SubmitButton> */}
            </form>
        </Form>
    )
}

export default GigForm








