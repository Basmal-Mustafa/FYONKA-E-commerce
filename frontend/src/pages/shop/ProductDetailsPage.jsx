import ReviewForm from '@/components/FilterRate/ReviewForm'
import Navbar from '@/components/layout/Navbar'
import TopHeader from '@/components/layout/TopHeader'
import ProductDetails from '@/components/product/ProductDetails'
import React from 'react'

export default function ProductDetailsPage() {
  return (
    <div>
      <TopHeader />
      <Navbar />
      <ProductDetails />
      <ReviewForm />
    </div>
  )
}

