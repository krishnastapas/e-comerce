import React, { useState } from "react";
import "./AddProduct.css";
import Select from "react-select";
import { useStateValue } from "../StateProvider/StateProvider";
import {  set, child,ref as ref_database, push } from "firebase/database";
import { auth, database,storage } from "../database/firebase.js";
import { useNavigate } from "react-router-dom";
import { getStorage, uploadBytesResumable, ref as ref_storage,getDownloadURL } from "firebase/storage";
function AddProduct() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [rating, setRating] = useState("");
  const [image, setImage] = useState(null);
  const [imageurl, setImageurl] = useState(null);

  const [category, setCategory] = useState("");

  const [{ basket, user }, dispatch] = useStateValue();
  const navigate = useNavigate();

  const addproduct = (e) => {
    e.preventDefault();
   
    const product = {
      title: title,
      price: price,
      image: imageurl,
      category: category,
    };

    // Get a key for a new Post.
    if (user && user.email == "tapasadmin@gmail.com") {
      const newPostKey = push(child(ref_database(database), "products")).key;
      set(
        ref_database(database, "users/" + user.uid + "/products/" + newPostKey),
        product
      );

      set(ref_database(database, "products/" + newPostKey), product)
        .then(() => {
          alert("Product is added to the database");
        })
        .catch((error) => {
          alert("Unsuccesful,error" + error);
        });
      navigate("/");
      //   const newPostKey = push(child(ref(database), 'products')).key;

      //   // Write the new post's data simultaneously in the product list and the user's post list.
      //   const updates = {};
      //   updates['/products/' + newPostKey] = product;
      //   updates['/users/' + user.uid + '/products/' + newPostKey] = product;
    }
  };
  const getimage = (event) => {
    console.log(event.target.files[0]);
    setImage(event.target.files[0]);
    const i=event.target.files[0];

    // var name = "123" + Date.now();
    const metadata = {
      contentType: 'image/jpeg'
    };
    console.log(i)
    const storageRef = ref_storage(storage, "productImages/" + i.name);
    //  var storageRef=firebase.storage().ref('productImages/'+name);
    const uploadTask = uploadBytesResumable(storageRef,i);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      }, 
      (error) => {
        alert('Error:'+error);
      }, 
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);
          setImageurl(downloadURL);
        });
      }
    
    );
  };
  return (
    <div className="addProduct">
      <div className="addProduct__container">
        <h1>Add Product</h1>
        <form>
          <h5>Title</h5>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <h5>Price</h5>
          <small>₹</small>
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <h5>Category</h5>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>Select options</option>
            <option value="books">Books</option>
            <option value="electronics">Electronics</option>
            <option value="garment">Garment</option>
          </select>

          {/* <h5>Rating</h5>
          <select value={rating} onChange={(e) => setRating(e.target.value)}>
          <option>Select options</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select> */}

          <h5>Upload Image</h5>
          {image && (
            <div>
              <h5>Selected Image</h5>
              <img
                alt="not fount"
                width={"250px"}
                src={URL.createObjectURL(image)}
              />
              <br />
              <button onClick={() => setImage(null)}>Remove</button>
            </div>
          )}
          <br />

          <input type="file" name="myImage" onChange={getimage} />

          <button
            onClick={addproduct}
            type="submit"
            className="addProduct__button"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;
