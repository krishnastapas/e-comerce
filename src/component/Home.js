import React, { useEffect, useState } from "react";
import "./Home.css";
import Product from "./Product";
import topimage from "./topimage.jpg";
import {  ref, get, child } from "firebase/database";
import {  database } from "../database/firebase.js";

function Home() {
  const [products, setProducts] = useState("");
  

  useEffect(() => {
    
    get(child(ref(database), "products/")).then((snapshot) => {
      if (snapshot.exists()) {
        // console.log(snapshot.val());
        setProducts(snapshot.val());
      }
    });
    // console.log(products);
  }, []);

  return (
    <>
      <div className="home">
        <div className="home_container">
          <img className="home_image" src={topimage} alt="" />
          <h1 className="category_heading">Electronics</h1>
          <div className="home_row">
            {Object.keys(products).map((key, index) =>
              products[key] && products[key].category === "electronics" ? (
                <Product
                  id={key}
                  title={products[key].title}
                  price={products[key].price}
                  image={products[key].image}
                  category={products[key].category}
                />
              ) : (
                ""
              )
            )}
          </div>

          <h1 className="category_heading">Books</h1>
          <div className="home_row">
            {Object.keys(products).map((key, index) =>
              products[key] && products[key].category === "books" ? (
                <Product
                id={key}
                title={products[key].title}
                price={products[key].price}
                image={products[key].image}
                category={products[key].category}
                />
              ) : (
                ""
              )
            )}
          </div>

          <h1 className="category_heading">Garments</h1>
          <div className="home_row">
            {Object.keys(products).map((key, index) =>
              products[key] && products[key].category === "garment" ? (
                <Product
                id={key}
                title={products[key].title}
                price={products[key].price}
                image={products[key].image}
                category={products[key].category}
                />
              ) : (
                ""
              )
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
