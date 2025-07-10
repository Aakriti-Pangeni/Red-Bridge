import React from 'react'
import NavBar from '../navbar/navbar'
import Footer from '../footer/footer'

const MainLayout = ({children}) => {
  return (
    <>
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
    </>
  )
}

export default MainLayout