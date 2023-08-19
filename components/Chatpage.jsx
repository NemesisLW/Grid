"use client";
import React, { useEffect, useState } from "react";
import Avatar from "./Avatar";
import Chat from "./Chat";
import { db } from "@/Firebase.config";
import { doc, getDocFromCache, getDocs, collection } from "firebase/firestore";
import { mensformalpantblack } from "@/constants/MensFormalPantsBlack";
import { query, where, orderBy, limit } from "firebase/firestore";
import { useStore } from "@/store/store";

const Chatpage = () => {
  const [userRequest, setUserRequest] = useState("");
  const [filter, setFilter] = useState([]);
  const [changedproductype, setchangedproducttype] = useState("");

  const callSuggestionLLM = async () => {
    const currentUserRequest = useStore.getState().currentRequest;
    const response = await fetch("/api/find", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ currentUserRequest }),
    });

    const data = await response.json();

    let filterJSON = JSON.parse(data.filter);
    console.log(filterJSON);

    setchangedproducttype(filterJSON.outfit_type);
    try {
      if (filterJSON.color == "any" || filterJSON.color == "undefined") {
        const querySnapshotforchangedproducts = await getDocs(
          collection(db, `filpkartproducts/women/topwear/color/blue`)
        );
        querySnapshotforchangedproducts.forEach((doc) => {
          const brand = "brand";
          const color = doc.data().color;
          const description = doc.data().description;
          const image_src = doc.data().image_src;
          const link = doc.data().link;
          const price = doc.data().price;
          const review = "4.2";
          const size = doc.data().size;
          const type = doc.data().product_type;
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
        console.log(Product);
      } else {
        const querySnapshotforchangedproducts = await getDocs(
          collection(
            db,
            `filpkartproducts/women/${filterJSON.outfit_type}/color/${filterJSON.color}`
          )
        );
        querySnapshotforchangedproducts.forEach((doc) => {
          const brand = "brand";
          const color = doc.data().color;
          const description = doc.data().description;
          const image_src = doc.data().image_src;
          const link = doc.data().link;
          const price = doc.data().price;
          const review = "4.2";
          const size = doc.data().size;
          const type = doc.data().product_type;
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
        console.log(Product);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const unsubscribe = useStore.subscribe(
      (newState) => {
        setUserRequest(newState.currentRequest);
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

  const [product, setproduct] = useState([]);
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
      const querySnapshotforboottomwear = await getDocs(
        collection(db, `Products/women/bottomwear`)
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
        collection(db, `Products/women/topwear`)
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
        collection(db, `Products/women/shoes`)
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
      <Avatar
        product={allproducts}
        changedproduct={changedproductforchat}
        changedproducttype={changedproductype}
      />
      <Chat products={product} setProduct={setProduct} />
    </div>
  );
};

export default Chatpage;
