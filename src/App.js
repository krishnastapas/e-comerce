import "./App.css";
import Home from "./component/Home";
import Header from "./component/Header";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Cart from "./component/Cart";
import { getDatabase, ref, onValue } from "firebase/database";
import Login from "./component/Login";
import SignUp from "./component/SignUp";
import {useStateValue} from "./StateProvider/StateProvider"
import { auth, database } from "./database/firebase.js";
import React, { useEffect} from "react";
import AddProduct from "./component/AddProduct";




function App() {
  const [{ basket, user }, dispatch] = useStateValue();
  useEffect(() => {
    // will only run once when the app component loads...

    auth.onAuthStateChanged((authUser) => {
      console.log("THE USER IS >>> ", authUser);

      if (authUser) {
        // the user just logged in / the user was logged in

        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        // the user is logged out
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
//     // const userId = auth.currentUser.uid;
//     onValue(ref(database, '/users/user.uid/cart'), (snapshot) => {
//     const cart= (snapshot.val() && snapshot.val().username) || 'Anonymous';
//     console.log(cart)
//     dispatch({
//       type: "ADD_TO_BASKET",
//       item: cart,
//     });
//   // ...
// }, {
//   onlyOnce: true
// }); 

  }, []);
  return (
    <>
    <Router>
    <Header/>
    
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/cart" element={<Cart/>}/>
        <Route exact path="/login" element={<Login/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/addproduct" element={<AddProduct/>}/>
      </Routes>
    
  </Router>
  </>
  );
}

export default App;
