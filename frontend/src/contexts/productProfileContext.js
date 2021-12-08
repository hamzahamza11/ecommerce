import React from "react";
import { createContext, useState } from "react";

export const ProductProfileContext = createContext([]);

export function ProductProfileProvider(props) {
  const [product, setProduct] = useState([]);
  
  return (
    <ProductProfileContext.Provider value={{ product, setProduct }}>
      {props.children}
    </ProductProfileContext.Provider>
  );
}
