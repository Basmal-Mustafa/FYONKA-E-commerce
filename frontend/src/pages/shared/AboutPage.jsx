import React from "react"
import TopHeader from "@/components/layout/TopHeader"
import Navbar from "@/components/layout/Navbar"
import AboutContent from "@/components/General/About"
import Footer from "@/components/layout/Footer"

function About() {
  return (
    <div>
      <TopHeader />
      <Navbar />
      <AboutContent />
      <Footer />
    </div>
  )
}

export default About;
