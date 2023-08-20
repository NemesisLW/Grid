"use client"
import React from 'react'
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import Link from 'next/link'

import Avatar from "@/components/Avatar";
import Carousel from "@/components/Carosoul";
import Chatpage from "@/components/Chatpage";
import Header from "@/components/Header";
import HeroBanner from "@/components/HeroBanner";
import ProductCard from "@/components/ProductCard";
import Wrapper from "@/components/Wrapper";
import { useState } from "react";

const Landing = () => {
  const[gender ,setgender] =useState("men")
 const changegender= ()=>{
   if(gender =="men"){
    setgender("women")
   }else{
    setgender("men");
   }
}
  return (
    <div>
       <Header gender={gender} changegender={changegender}  />
      {/* <HeroBanner /> */}
      <Carousel/>
      <Wrapper>
        {/* heading and paragaph start */}
        <div className="text-center -mx-10 my-[50px] md:my-[80px]">
          <div className="text-left text-[28px] md:text-[28px] mb-5 font-semibold leading-tight">
            Gearing up for Diwali with your personalised taste. 
          </div>
         
        </div> <div className="text-md md:text-xl max-h-20">
            <Link href="/avatar">
              <div>
                {/* <Avatar/> */}
                <Chatpage show={false} gender={gender} />
              </div>
            </Link>
          </div>

        {/* heading and paragaph end */}

        {/* products grid start */}
       
        {/* products grid end */}
      </Wrapper>

    </div>
  )
}

export default Landing