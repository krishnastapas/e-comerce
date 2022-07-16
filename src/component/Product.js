import React from "react";
import "./Product.css";
import { useStateValue } from "../StateProvider/StateProvider";
import { useNavigate } from "react-router-dom";
import {  set, child,ref as ref, push } from "firebase/database";
import { auth, database,storage } from "../database/firebase.js";

function Product({ id, title, image, price, category }) {
  const navigate = useNavigate();
  const [{ basket, user }, dispatch] = useStateValue();
  console.log(title);
  console.log(id);
  const addToBasket = async () => {
    // dispatch the item into the data layer
    if(!user){
      navigate("/login");
    }
    else{
      await dispatch({
        type: "ADD_TO_BASKET",
        item: {
          id: id,
          title: title,
          price: parseInt(price),
          image: image,
          category: category,
        },
      });
    }
   
   
  };
  return (
    <div className="product">
      <div className="product_info">
        <p>{title}</p>
        <p className="product_price">
          <small>₹</small>
          <strong>{price}</strong>
        </p>
        <div className="product_rating">
          {/* {Array(rating)
            .fill()
            .map((_, i0) => (
              <p>⭐</p>
            ))} */}
        </div>
      </div>
      <img src={image} />
      <button onClick={addToBasket}>Add to cart</button>
    </div>
  );
}

export default Product;
