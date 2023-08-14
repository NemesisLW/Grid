"use client";
import React, { useEffect, useState } from "react";
import Avatar from "./Avatar";
import Chat from "./Chat";
import { item } from "@/constants";
import { db } from "@/Firebase.config";
import { doc, getDocFromCache, getDocs, collection } from "firebase/firestore";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { query, where, orderBy, limit } from "firebase/firestore";  
const Chatpage = () => {
  console.log(item);
  useEffect(() => {
    fetchingproducts();
  }, []);
  const [prodoct,setproduct]=useState([]);
  const Product=[];
  const fetchingproducts = async () => {
    try {
      const q = query(
        collection(db, `Products/men/${item.outfit_type}`),
        where("color", "==", `${item.color}`)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
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
        Product.push({
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
      setproduct(Product);
    } catch (err) {
      console.log(err);
    }

  };
  const [changedproductforchat,setchangedproductforchat]=useState([]);
  const setProduct =(product)=>{
    console.log(prodoct)
    setchangedproductforchat(product)
  }
  return (
    <div className="flex min-h-screen bg-slate-50 items-center justify-center">
      <Avatar product={changedproductforchat}  />
      <Chat products={prodoct} setProduct={setProduct}/>
    </div>
  );
};

export default Chatpage;
