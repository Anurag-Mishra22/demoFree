"use client"
// import { PatientFormValidation } from '@/lib/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react'


import { useRouter } from 'next/navigation';
import { z } from 'zod';

// import SubmitButton from '../SubmitButton';
import { Form, FormControl } from '../ui/form';
import { useForm } from 'react-hook-form';

import { Label } from '../ui/label';
import Image from 'next/image';
import { SelectItem } from '../ui/select';
import CustomFormField, { FormFieldType } from '../customForm-field';
import FileUpload from '../file-upload';
// import { FileUploader } from '../FileUploader';
// import { registerPatient } from '@/lib/actions/patient.actions';


const MatchingForm = () => {

    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm({
        // resolver: zodResolver(),
        defaultValues: {
            // ...PatientFormDefaultValues,
            name: "",
            email: "",
            phone: "",
        },
    });

    const onSubmit = async (values: any) => {
        setIsLoading(true);

        // Store file info in form data as
        // let formData;
        // if (
        //     values.identificationDocument &&
        //     values.identificationDocument?.length > 0
        // ) {
        //     const blobFile = new Blob([values.identificationDocument[0]], {
        //         type: values.identificationDocument[0].type,
        //     });

        //     formData = new FormData();
        //     formData.append("blobFile", blobFile);
        //     formData.append("fileName", values.identificationDocument[0].name);
        // }

        try {
            // const patient = {
            //     userId: user.$id,
            //     name: values.name,
            //     email: values.email,
            //     phone: values.phone,
            //     birthDate: new Date(values.birthDate),
            //     gender: values.gender,
            //     address: values.address,
            //     occupation: values.occupation,
            //     emergencyContactName: values.emergencyContactName,
            //     emergencyContactNumber: values.emergencyContactNumber,
            //     primaryPhysician: values.primaryPhysician,
            //     insuranceProvider: values.insuranceProvider,
            //     insurancePolicyNumber: values.insurancePolicyNumber,
            //     allergies: values.allergies,
            //     currentMedication: values.currentMedication,
            //     familyMedicalHistory: values.familyMedicalHistory,
            //     pastMedicalHistory: values.pastMedicalHistory,
            //     identificationType: values.identificationType,
            //     identificationNumber: values.identificationNumber,
            //     identificationDocument: values.identificationDocument
            //         ? formData
            //         : undefined,
            //     privacyConsent: values.privacyConsent,
            // };

            // const newPatient = await registerPatient(patient);

            // if (newPatient) {
            //     router.push(`/patients/${user.$id}/new-appointment`);
            // }
        } catch (error) {
            console.log(error);
        }

        setIsLoading(false);
    };
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12 flex-1">

                <section className=" space-y-6">
                    <div className='mb-9 space-y-2'>
                        <h2 className="sub-header">Give your project brief a title</h2>
                        <p className='para '>Keep it short and simple - this will help us match you to the right category.</p>
                    </div>
                    <CustomFormField
                        control={form.control}
                        fieldType={FormFieldType.INPUT}
                        name="name"

                        placeholder="John Doe"
                        iconSrc="/assets/icons/user.svg"
                        iconAlt="user"
                    />
                    <p className=''>Some title examples</p>
                </section>
                <section className=" space-y-6">
                    <div className='mb-9 space-y-2'>
                        <h2 className="sub-header">What are you looking to get done?</h2>
                        <p className='para'>This will help get your brief to the right talent. Specifics help here.</p>
                    </div>
                    <CustomFormField
                        control={form.control}
                        fieldType={FormFieldType.TEXTAREA}
                        name="name"

                        placeholder="John Doe"
                        iconSrc="/assets/icons/user.svg"
                        iconAlt="user"
                    />
                    <p>How to write a great description</p>

                    <FileUpload />
                </section>





                {/* <SubmitButton isLoading={isLoading}>Submit and Continue</SubmitButton> */}
            </form>
        </Form>
    )
}

export default MatchingForm