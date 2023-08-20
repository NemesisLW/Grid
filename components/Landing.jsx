"use client";
import React from "react";

import Link from "next/link";

import Avatar from "@/components/Avatar";
import Carousel from "@/components/Carosoul";
import Chatpage from "@/components/Chatpage";
import Header from "@/components/Header";
import HeroBanner from "@/components/HeroBanner";
import ProductCard from "@/components/ProductCard";
import Wrapper from "@/components/Wrapper";
import { useState } from "react";
import Chatwomen from "./Chatwomen";
import { Card, CardHeader } from "./ui/card";

const Landing = () => {
  const [gender, setgender] = useState("men");
  const changegender = () => {
    if (gender == "men") {
      setgender("women");
    } else {
      setgender("men");
    }
  };
  return (
    <div>
      <Header gender={gender} changegender={changegender} />
      {/* <HeroBanner /> */}
      <Carousel />
      <Wrapper>
        {/* heading and paragaph start */}
        <div className="text-center -mx-10  md:my-[80px]">
          <div className="text-left text-[28px] md:text-[28px] mb-5 font-semibold leading-tight">
            Your handpicked Summer Collection
          </div>
        </div>{" "}
        <div className="text-md md:text-xl flex flex-row">
          <div>
            <Link href="/avatar/men">
              <CardHeader className="text-center">Men</CardHeader>
              <div>
                <Chatpage show={false} gender={gender} />
              </div>
            </Link>
          </div>
          <div>
            <Link href="/avatar/women">
              <CardHeader className="text-center">Women</CardHeader>
              <div>
                {/* <Avatar/> */}
                <Chatwomen show={false} gender="women" />
              </div>
            </Link>
          </div>
        </div>
        {/* heading and paragaph end */}
        {/* products grid start */}
        {/* products grid end */}
      </Wrapper>
    </div>
  );
};

export default Landing;
