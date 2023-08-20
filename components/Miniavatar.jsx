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

import Image from "next/image";
import { query, where, orderBy, limit } from "firebase/firestore";

const Miniavatar = ({ show ,product, changedproduct, changedproducttype }) => {
  return (
    <div>
        <Card>
          <CardHeader>
            <CardTitle className="text-blue-600 text-center">
              Your Avatar
            </CardTitle>
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
    </div>
  )
}

export default Miniavatar