"use client"
import CustomFormField from '@/components/customForm-field'
import MatchingForm from '@/components/forms/matching-form'
import { TabsDemo } from '@/components/TabsDemo'
import Image from 'next/image'
import React from 'react'

const MatchingPages = () => {
    return (
        <div className='mt-12 flex flex-col md:flex-row mb-12'>
            <div>
                <h1 className='text-4xl font-semibold'>Let the matching begin...</h1>
                <p className='text-sm mt-16 text-[#74767e]'>This is where you fill us in on the big picture.</p>
                <Image
                    src="/matching.svg"
                    alt='Matching'
                    width={500}
                    height={500}
                />
            </div>
            <div className='flex flex-col items-center justify-center w-full '>
                {/* <MatchingForm /> */}
                <TabsDemo />
            </div>
        </div>
    )
}

export default MatchingPages