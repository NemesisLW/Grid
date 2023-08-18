"use client";

import { useRef } from "react";

import { useStore } from "@/src/store";

function StoreInitializer({ currentRequest, filter }) {
  const initialized = useRef(false);
  if (!initialized.current) {
    useStore.setState({ currentRequest, filter });
    initialized.current = true;
  }
  return null;
}

export default StoreInitializer;
