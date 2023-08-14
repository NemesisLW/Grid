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

const Avatar = ({product}) => {
  useEffect(() => {
    fetchingproducts();
  }, []);
    
  const bottowear_product = [];
  const topwear_product = [];
  const shoes_product = [];
  const [bottomwear, setbottomwear] = useState([]);
  const [topwear, settopwear] = useState([]);
  const [shoes, setshoes] = useState([]);
  const [topwearid, settopwearid] = useState(0);
  const [bottomwearid, setbottomwearid] = useState(0);
  const [shoeid, setshoewearid] = useState(0);
  const[total,settotal] =useState(0);
   
  const fetchingproducts = async () => {
    try {
      const querySnapshotforboottomwear = await getDocs(
        collection(db, `Products/men/bottomwear`)
      );

      querySnapshotforboottomwear.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        const brand = doc.data().brand;
        const color = doc.data().color;
        const description = doc.data().description;
        const image_src = doc.data().image_src;
        const link = doc.data().link;
        const price = doc.data().price;
        const review = doc.data().review;
        const size = doc.data().size;
        const type = doc.data().type;
        bottowear_product.push({
          id: doc.id,
          brand: brand,
          color: color,
          description: description,
          image_src: image_src,
          link: link,
          price: price,
          review: review,
          size: size,
          type: type,
        });
      });
      console.log(bottowear_product);
      setbottomwear(bottowear_product);
    } catch (e) {
      console.log("Error getting cached document:", e);
    }
    try {
      const querySnapshotfortopwear = await getDocs(
        collection(db, `Products/men/topwear`)
      );

      querySnapshotfortopwear.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        const brand = doc.data().brand;
        const color = doc.data().color;
        const description = doc.data().description;
        const image_src = doc.data().image_src;
        const link = doc.data().link;
        const price = doc.data().price;
        const review = doc.data().review;
        const size = doc.data().size;
        const type = doc.data().type;
        topwear_product.push({
          id: doc.id,
          brand: brand,
          color: color,
          description: description,
          image_src: image_src,
          link: link,
          price: price,
          review: review,
          size: size,
          type: type,
        });
      });
      console.log(topwear_product);
      settopwear(topwear_product);
    } catch (e) {
      console.log("Error getting cached document:", e);
    }
    try {
      const querySnapshotfortopshoes = await getDocs(
        collection(db, `Products/men/shoes`)
      );

      querySnapshotfortopshoes.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        const brand = doc.data().brand;
        const color = doc.data().color;
        const description = doc.data().description;
        const image_src = doc.data().image_src;
        const link = doc.data().link;
        const price = doc.data().price;
        const review = doc.data().review;
        const size = doc.data().size;
        const type = doc.data().type;
        shoes_product.push({
          id: doc.id,
          brand: brand,
          color: color,
          description: description,
          image_src: image_src,
          link: link,
          price: price,
          review: review,
          size: size,
          type: type,
        });
      });
      console.log(shoes_product);
      setshoes(shoes_product);
    } catch (e) {
      console.log("Error getting cached document:", e);
    }
    
    
  
  };
//  if(bottomwear){
//   const desiredProductindex = bottomwear.findIndex(Product => Product.id === product.id);4
//    setbottomwearid(desiredProductindex);
//  }
  const handlehandleproductchangefortopwear = () => {
    settopwearid(Math.floor(Math.random() * 4));
  
    
  };
  const handlehandleproductchangeforbottomwwear = () => {
    setbottomwearid(Math.floor(Math.random() * 4));
  
  };
  const handlehandleproductchangeforshoe = () => {
    setshoewearid(Math.floor(Math.random() * 3));
   
  };
  console.log(topwear[0]);
   
  return (
    <>
      <div className="flex w-[600px] flex-col mx-20 ">
        <Card>
          <CardHeader>
            <CardTitle className="text-blue-600 font-title ">
              Upperwear
            </CardTitle>
          </CardHeader>
          {topwear[topwearid] ? (
            <>
              <CardContent className="items-center justify-center">
                <Image
                  src={topwear[topwearid].image_src}
                  alt=""
                  width={100}
                  height={100}
                />
              </CardContent>
              <CardFooter>
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
              </CardFooter>
            </>
          ) : (
            <>
              <Loader2 className="mr-6 h-16 w-16 animate-spin" />
            </>
          )}
        </Card>
        <Card>
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
                </div>
              </CardFooter>
            </>
          ) : (
            <>
              <Loader2 className="mr-6 h-16 w-16 animate-spin" />
            </>
          )}
        </Card>
        <Card>
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
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-blue-600 font-title ">Price</CardTitle>
          </CardHeader>
          {shoes[shoeid]&& topwear[topwearid]&&shoes[shoeid] ? (
            <>
              <CardContent className="items-center justify-center">
                <h3>{topwear[topwearid].description}:{topwear[topwearid].price}</h3>
                <h3>`{bottomwear[bottomwearid].description}:{bottomwear[bottomwearid].price}</h3>
                <h3>{shoes[shoeid].description}:{shoes[shoeid].price}</h3>
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
