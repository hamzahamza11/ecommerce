import axios from "axios";
import React, { useState, useEffect,useContext } from "react";
import Product from "../components/Product";
import { useHistory } from "react-router-dom";
import { UserContext } from "../contexts/userContext";
import { PopupExample } from "../components/PopupProductEdit";
function Products() {
  const [products, setProducts] = useState([]);
  const {userData,setUserData} = useContext(UserContext)
  let history = useHistory();

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
    const res = await axios.delete(`/api/deleteProduct/${id}/${userData._id}`);
    console.log(res);
  };

  const goToProductProfile = productId => history.push(`/productProfile/${productId}`);

  // const addToCart = async (id)=>{
  //     const res = await axios.post(`/api/addToCart/${id}`)
  //     console.log(res);

  // }

  const ProductsCart = products.map((product) => {
    return <Product product={product} deleteProduct={deleteProduct} goToProductProfile={goToProductProfile}/>;
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
