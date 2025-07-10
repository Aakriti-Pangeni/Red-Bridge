import React from "react";

import NavBar from "../shared/navbar/navbar";
import Welcome from "../components/section/welcome";
// import Card from "../components/section/card";
import WhyUse from "../components/section/whyuse";
import Footer from "../shared/footer/footer";
import MainLayout from "../shared/sidebar/mainlayout";
import Table from "../components/section/table";
import DonationProcess from "../components/section/donationProcess";
const Home=() =>{
    return(
        <>
        
        <MainLayout>
        <Welcome />
        <WhyUse/>
        {/* <Card/> */}
        <Table/>
        <DonationProcess/>
        </MainLayout>
      
        </>
    )
}
export default Home;