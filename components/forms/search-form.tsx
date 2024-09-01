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
import { LoginFormValidation, SearchFormValidation } from '@/lib/validation';
import axios from 'axios';
import newRequest from '@/features/auth/newRequest';
import toast from 'react-hot-toast';
import aiSearchData from '@/hooks/aiSearch-data';
import airecommendationData from '@/hooks/airecommendationData';
// import { FileUploader } from '../FileUploader';
// import { registerPatient } from '@/lib/actions/patient.actions';


const SearchForm = () => {
    const searchQueryData = airecommendationData((state) => state.setFileItem)

    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<z.infer<typeof SearchFormValidation>>({
        resolver: zodResolver(SearchFormValidation),
        defaultValues: {

        },
    });

    const onSubmit = async (values: z.infer<typeof SearchFormValidation>) => {
        // setIsLoading(true);

        console.log(values);

        // Convert budget to a number before passing it
        const budgetNumber = Number(values.budget);

        searchQueryData(values.querySearch, budgetNumber);

        router.push("/recommend")

        // setIsLoading(false);
    };
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12 flex-1 ">

                <div className='flex p-12 justify-center gap-x-4'>
                    <section className=" space-y-6 w-1/2">



                        <CustomFormField
                            control={form.control}
                            fieldType={FormFieldType.TEXTAREA}
                            name="querySearch"
                            label='Type in detail about your requirement'
                        />
                        <CustomFormField
                            control={form.control}
                            fieldType={FormFieldType.INPUT}
                            name="budget"
                            label='Type in detail about your requirement'

                        />


                    </section>

                </div>

                <Button type='submit'>Find Matching</Button>



                {/* <SubmitButton isLoading={isLoading}>Submit and Continue</SubmitButton> */}
            </form>
        </Form>
    )
}

export default SearchForm