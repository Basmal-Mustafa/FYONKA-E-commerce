import Footer from '@/components/layout/Footer'
import Navbar from '@/components/layout/Navbar'
import TopHeader from '@/components/layout/TopHeader'
import Checkout from '@/components/user/Checkout'
import React from 'react'

const CheckoutPage = () => {
  return (
    <>
        <TopHeader />
        <Navbar />
        <Checkout />
        <Footer />
    </>
  )
}

export default CheckoutPage
