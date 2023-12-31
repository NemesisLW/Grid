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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { query, where, orderBy, limit } from "firebase/firestore";

const Avatarwomen = ({ show, product, changedproduct, changedproducttype }) => {
  useEffect(() => {
    // fetchingproducts();
  }, []);

  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (product && product.length > 0) {
      const totalPrice = product.reduce(
        (totalP, item) => totalP + parseFloat(item?.price),
        0
      );
      setTotal(totalPrice);
    }
  }, [product]);
  const [id, setid] = useState(0);
  const changedid = (Id) => {
    setid(Id);
  };
  console.log(changedproducttype);

  return (
    <>
      <div className={`flex w-[600px] flex-row mx-10 items-center `}>
        {product[0] != undefined && product[1] != undefined ? (
          <div className="flex flex-row">
            <div
              className={` mx-0 ${
                show ? "basis-1/6 h-[450px]" : "flex flex-row"
              }   w-[250px] `}
            >
              <Card className={`py-16 ${show ? "" : "flex flex-row"} `}>
                <div>
                  {changedproduct.image_src != undefined &&
                  changedproducttype == "topwear" ? (
                    <>
                      <CardContent
                        className="items-center h-[150px] justify-center"
                        onClick={() => changedid(0)}
                      >
                        <Image
                          src={changedproduct.image_src}
                          alt=""
                          width={150}
                          height={100}
                        />
                      </CardContent>
                    </>
                  ) : (
                    <>
                      <CardContent
                        className="items-center h-[90px] justify-center"
                        onClick={() => changedid(0)}
                      >
                        <Image
                          src={product[0].image_src}
                          alt=""
                          width={150}
                          height={100}
                        />
                      </CardContent>
                    </>
                  )}
                </div>

                <div>
                  {changedproduct.image_src != undefined &&
                  changedproducttype == "jeans" ? (
                    <>
                      {" "}
                      <CardContent
                        className="items-center justify-center"
                        onClick={() => changedid(1)}
                      >
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
                      <CardContent
                        className="items-center justify-center"
                        onClick={() => changedid(1)}
                      >
                        <Image
                          src={product[1].image_src}
                          alt=""
                          width={100}
                          height={100}
                        />
                      </CardContent>
                    </>
                  )}
                </div>

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
              </Card>
            </div>
            <div
              className={`basis-5/6 h-[500px] flex items-center justify-between w-[300px] mx-10 ${
                show ? <></> : "hidden"
              } `}
            >
              <Tabs defaultValue="account" className="w-[400px]">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="account">Suggested Product</TabsTrigger>
                  <TabsTrigger value="password">Price</TabsTrigger>
                </TabsList>
                <TabsContent value="account">
                  <Card>
                    <CardContent className="pt-10">
                      {changedproduct.image_src != "undefined" ? (
                        <>
                          {(changedproducttype == "topwear" && id == 0) ||
                          (changedproducttype == "jeans" && id == 1) ? (
                            <>
                              <Image
                                src={changedproduct.image_src}
                                alt=""
                                width={500}
                                height={500}
                              />
                            </>
                          ) : (
                            <>
                              <Image
                                src={product[id].image_src}
                                alt=""
                                width={500}
                                height={500}
                              />
                            </>
                          )}
                        </>
                      ) : (
                        <>
                          <Image
                            src={product[id].image_src}
                            alt=""
                            width={500}
                            height={500}
                          />
                        </>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="password">
                  {show ? (
                    <div className="w-[400px]">
                      {product[0] != undefined &&
                      product[1] != undefined &&
                      product[2] != undefined ? (
                        <>
                          <div className="w-[400px] rounded-md p-6">
                            <h2 className="text-xl font-semibold mb-4">
                              Product Prices
                            </h2>

                            {product.map((productcard, index) => (
                              <div key={index} className="mb-2">
                                <p className="text-gray-600 mb-1">
                                  {productcard.description}
                                </p>
                                <p className="text-lg font-semibold">
                                  ₹{productcard.price}
                                </p>
                              </div>
                            ))}
                            <hr className="my-3" />
                            <p className="text-xl font-semibold mb-2">
                              Total Price: ₹{total}
                            </p>
                            <p className="text-green-600 text-sm">
                              You can get a 15% discount if you buy all these
                              products together!
                            </p>
                            <p className="text-xl font-semibold mt-2">
                              Discounted Price: ₹{total - total * 0.15}
                            </p>
                          </div>
                        </>
                      ) : (
                        <>
                          <Loader2 className="mr-6 h-16 w-16 animate-spin" />
                        </>
                      )}
                    </div>
                  ) : (
                    <></>
                  )}
                </TabsContent>
              </Tabs>
            </div>
          </div>
        ) : (
          <>
            <Loader2 className="mr-6 h-16 w-16 animate-spin" />
          </>
        )}
      </div>
    </>
  );
};

export default Avatarwomen;
