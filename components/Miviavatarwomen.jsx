
"use client";
import React, { useEffect, useState } from "react";
import Avatar from "./Avatar";
import Chat from "./Chat";
import { db } from "@/Firebase.config";
import { doc, getDocFromCache, getDocs, collection } from "firebase/firestore";
import { mensformalpantblack } from "@/constants/MensFormalPantsBlack";
import { query, where, orderBy, limit } from "firebase/firestore";
import { useStore } from "@/store/store";
import ChatBubble from "./ChatBubble";
import Avatarwomen from "./Avatarwomen";

const Miviavatarwomen = () => {
  return (
    <div>Miviavatarwomen</div>
  )
}

export default Miviavatarwomen