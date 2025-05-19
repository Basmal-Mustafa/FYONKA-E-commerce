import Navbar from '@/components/layout/Navbar'
import TopHeader from '@/components/layout/TopHeader'
import React from 'react'
import Products from '@/components/product/Products';
import Footer from '@/components/layout/Footer'


function ProductPage() {
  return (
    <div>
      <TopHeader />
      <Navbar />
      <Products />
      <Footer />
    </div>
  )
}

export default ProductPage;
