"use client";
import React, { useEffect, useState } from "react";
import { db } from "@/Firebase.config";
import { Loader2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { doc, getDocFromCache, getDocs, collection } from "firebase/firestore";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { query, where, orderBy, limit } from "firebase/firestore";

const Avatar = ({ product, changedproduct, changedproducttype }) => {
  useEffect(() => {
    // fetchingproducts();
  }, []);
  console.log(changedproducttype);
  const bottowear_product = [];
  const topwear_product = [];
  const shoes_product = [];
  const [bottomwear, setbottomwear] = useState([]);
  const [topwear, settopwear] = useState([]);
  const [shoes, setshoes] = useState([]);
  const [topwearid, settopwearid] = useState(0);
  const [bottomwearid, setbottomwearid] = useState(0);
  const [shoeid, setshoewearid] = useState(0);
  const [total, settotal] = useState(0);

  const handlehandleproductchangefortopwear = () => {
    settopwearid(Math.floor(Math.random() * 4));
  };
  const handlehandleproductchangeforbottomwwear = () => {
    setbottomwearid(Math.floor(Math.random() * 4));
  };
  const handlehandleproductchangeforshoe = () => {
    setshoewearid(Math.floor(Math.random() * 3));
  };

  return (
    <>
      <div className="flex w-[400px] flex-col mx-20 items-center">
        <Card>
          <CardHeader>
            <CardTitle className="text-blue-600">Your Avatar</CardTitle>
          </CardHeader>
          {product[0] != undefined &&
          product[1] != undefined &&
          product[2] != undefined ? (
            <div className="flex h-[150px] w-[400px]">
              {changedproduct.image_src != undefined &&
              changedproducttype == "topwear" ? (
                <>
                  {" "}
                  <CardContent className="items-center justify-center">
                    <Image
                      src={changedproduct.image_src}
                      alt=""
                      width="auto"
                      height={100}
                    />
                  </CardContent>
                </>
              ) : (
                <>
                  {" "}
                  <CardContent className="items-center justify-center">
                    <Image
                      src={product[0].image_src}
                      alt=""
                      width={100}
                      height={100}
                    />
                  </CardContent>
                </>
              )}

              {changedproduct.image_src != undefined &&
              changedproducttype == "bottomwear" ? (
                <>
                  {" "}
                  <CardContent className="items-center justify-center">
                    <Image
                      src={changedproduct.image_src}
                      alt=""
                      width="auto"
                      height={100}
                    />
                  </CardContent>
                </>
              ) : (
                <>
                  {" "}
                  <CardContent className="items-center justify-center">
                    <Image
                      src={product[1].image_src}
                      alt=""
                      width={100}
                      height={100}
                    />
                  </CardContent>
                </>
              )}

              {changedproduct.image_src != undefined &&
              changedproducttype == "shoe" ? (
                <>
                  {" "}
                  <CardContent className="items-center justify-center">
                    <Image
                      src={changedproduct.image_src}
                      alt=""
                      width={100}
                      height={100}
                    />
                  </CardContent>
                </>
              ) : (
                <>
                  {" "}
                  <CardContent className="items-center justify-center">
                    <Image
                      src={product[2].image_src}
                      alt=""
                      width={100}
                      height={100}
                    />
                  </CardContent>
                </>
              )}

              {/* <CardFooter>
                <div className="flex gap-5">
                  <button
                    onClick={handlehandleproductchangefortopwear}
                    className="bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-500/50 rounded-lg px-4"
                  >
                    Change
                  </button>

                  <Button>
                    <Link href={topwear[topwearid]}></Link> See full product
                    detailas
                  </Button>
                </div>
              </CardFooter> */}
            </div>
          ) : (
            <>
              <Loader2 className="mr-6 h-16 w-16 animate-spin" />
            </>
          )}
        </Card>
        {/* <Card>
          <CardHeader>
            <CardTitle className="text-blue-600 font-title ">
              Bottomwear
            </CardTitle>
          </CardHeader>
          {product ? (
            <>
              <CardContent className="items-center justify-center">
                <Image
                alt=""
                  src={product.image_src}
                  width={100}
                  height={100}
                />
              </CardContent>
              <CardFooter>
                <div className="flex gap-5">
                  <button
                    onClick={handlehandleproductchangeforbottomwwear}
                    className="bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-500/50 rounded-lg px-4"
                  >
                    Change
                  </button>

                  {/* <Button>
                    <Link href={product.link}>
                      See full product detailas
                    </Link>{" "}
                  </Button> */}
        {/* </div>
              </CardFooter>
            </>
          ) : (
            <>
              <Loader2 className="mr-6 h-16 w-16 animate-spin" />
            </>
          )}
        </Card> */}
        {/* <Card>
          <CardHeader>
            <CardTitle className="text-blue-600 font-title ">Shoe</CardTitle>
          </CardHeader>
          {shoes[shoeid] ? (
            <>
              <CardContent className="items-center justify-center">
                <Image src={shoes[shoeid].image_src}  alt="" width={100} height={100} />
              </CardContent>
              <CardFooter>
                <div className="flex gap-5">
                  <button
                    onClick={handlehandleproductchangeforshoe}
                    className="bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-500/50 rounded-lg px-4"
                  >
                    Change
                  </button>

                  <Button>
                    {" "}
                    <Link href={shoes[shoeid].link}>
                      See full product details
                    </Link>
                  </Button>
                </div>
              </CardFooter>
            </>
          ) : (
            <>
              <Loader2 className="mr-6 h-16 w-16 animate-spin" />
            </>
          )}
        </Card> */}
        <Card>
          <CardHeader>
            <CardTitle className="text-blue-600 font-title ">Price</CardTitle>
          </CardHeader>
          {product[0] != undefined &&
          product[1] != undefined &&
          product[2] != undefined ? (
            <>
              <CardContent className="items-center justify-center">
                <h3>
                  {product[0].description}:{product[0].price}
                </h3>
                <h3>
                  `{product[1].description}:{product[1].price}
                </h3>
                <h3>
                  {product[2].description}:{product[2].price}
                </h3>
                <h3>Total:{total}</h3>
              </CardContent>
            </>
          ) : (
            <>
              <Loader2 className="mr-6 h-16 w-16 animate-spin" />
            </>
          )}
        </Card>
      </div>
    </>
  );
};

export default Avatar;
