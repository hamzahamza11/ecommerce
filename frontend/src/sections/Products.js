import axios from "axios";
import React, { useState, useEffect } from "react";
import Product from "../components/Product";
import { PopupExample } from "../components/PopupProductEdit";
function Products() {
  const [products, setProducts] = useState([]);

  const fetchData = async () => {
    const res = await axios.get("/api/allProduct");

    setProducts(res.data);
    console.log(res.data);
  };

  useEffect(() => {
    fetchData();
    console.log(products);
  }, []);

  const deleteProduct = async (id) => {
    window.location.reload();
    const res = await axios.delete(`/api/deleteProduct/${id}`);
    console.log(res);
  };

  // const addToCart = async (id)=>{
  //     const res = await axios.post(`/api/addToCart/${id}`)
  //     console.log(res);

  // }

  const ProductsCart = products.map((product) => {
    return <Product product={product} deleteProduct={deleteProduct}/>;
  });

  return (
    <div>
      <h1>All PRODUCTS</h1>
      {ProductsCart}
      {/* <PopupExample/> */}
    </div>
  );
}

export default Products;
