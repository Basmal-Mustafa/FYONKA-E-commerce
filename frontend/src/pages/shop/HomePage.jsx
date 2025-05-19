import React from 'react'
import TopHeader from '@/components/layout/TopHeader';
import Navbar from '@/components/layout/Navbar';
import Banner from '@/components/layout/Banner';
import Products from '@/components/product/Products';
// import Footer from '@/components/layout/Footer'

function HomePage() {
  return (
    <>
      <TopHeader />
      <Navbar />
      <Banner />
      <Products />
    </>
  )
}

export default HomePage;