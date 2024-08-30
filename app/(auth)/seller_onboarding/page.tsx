import RegisterForm from '@/components/forms/register-form'
import SellerForm from '@/components/forms/seller-form'
import { Header } from '@/components/header/header'
import React from 'react'

const SellerOnboardingPage = () => {
    return (
        <div>
            <Header />
            <SellerForm />
        </div>
    )
}

export default SellerOnboardingPage