"use client";
import React, { useEffect, useState } from "react";
import Avatar from "./Avatar";
import Chat from "./Chat";
import { item } from "@/constants";
import { db } from "@/Firebase.config";
import { doc, getDocFromCache, getDocs, collection } from "firebase/firestore";

import { query, where, orderBy, limit } from "firebase/firestore";
import { useStore } from "@/store/store";

const Chatpage = () => {
  const [currentRequest, setCurrentRequest] = useState(
    useStore.getState().currentRequest
  );
  const [filter, setFilter] = useState([]);

  const callSuggestionLLM = async () => {
    const response = await fetch("/api/find", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ currentRequest }),
    });

    const data = await response.json();
    let filterJSON = JSON.parse(data.filter);
    console.log(typeof filterJSON);
    console.log(filterJSON);
  };

  useEffect(() => {
    const unsubscribe = useStore.subscribe(
      (newState) => {
        setCurrentRequest(newState.currentRequest);
        callSuggestionLLM();
      },
      (state) => state.currentRequest !== currentRequest
    );

    return () => {
      unsubscribe();
    };
  }, [useStore.getState().currentRequest]);

  useEffect(() => {
    fetchingproducts();
  }, []);

  const [prodoct, setproduct] = useState([]);
  const Product = [];
  const bottowear_product = [];
  const topwear_product = [];
  const shoes_product = [];
  const allproducts = [];
  const [bottomwear, setbottomwear] = useState([]);
  const [topwear, settopwear] = useState([]);
  const [shoes, setshoes] = useState([]);
  const [seeavatar, setavatar] = useState(false);

  const fetchingproducts = async () => {
    try {
      const q = query(
        collection(db, `Products/men/${item.outfit_type}`),
        where("color", "==", `${item.color}`)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
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
    try {
      const querySnapshotforboottomwear = await getDocs(
        collection(db, `Products/men/bottomwear`)
      );

      querySnapshotforboottomwear.forEach((doc) => {
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
      setbottomwear(bottowear_product);
    } catch (e) {
      console.log("Error getting cached document:", e);
    }
    try {
      const querySnapshotfortopwear = await getDocs(
        collection(db, `Products/men/topwear`)
      );

      querySnapshotfortopwear.forEach((doc) => {
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
      settopwear(topwear_product);
    } catch (e) {
      console.log("Error getting cached document:", e);
    }
    try {
      const querySnapshotfortopshoes = await getDocs(
        collection(db, `Products/men/shoes`)
      );

      querySnapshotfortopshoes.forEach((doc) => {
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
      setshoes(shoes_product);
    } catch (e) {
      console.log("Error getting cached document:", e);
    }
  };
  if (topwear != [] && bottomwear != [] && shoes != []) {
    allproducts.push(topwear[0], bottomwear[0], shoes[0]);
  }

  const [changedproductforchat, setchangedproductforchat] = useState([]);
  const setProduct = (product) => {
    setchangedproductforchat(product);
  };
  return (
    <div className="flex min-h-screen bg-slate-50 items-center justify-center">
      <Avatar product={allproducts} changedproduct={changedproductforchat} />
      {/* <button
    //     // onclick={setavatar(true)}
    //     className={`${
    //       seeavatar ? "hidden" : ""
    //     } block bg-blue-600 text-white hover:bg-blue-500 shadow-lg shadow-blue-500/50 rounded-lg px-4`}
    //   >
    //     Change Avatar
    //   </button> */}
      {/* <div className={`${
          seeavatar ? "" : "hidden"
        }`
        }> */}
      <Chat products={prodoct} setProduct={setProduct} />
    </div>

    // </div>
  );
};

export default Chatpage;
