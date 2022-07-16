import React, { useState } from "react";
import "./SignUp.css";
import { Link, useHistory } from "react-router-dom";
import { auth,database } from "../database/firebase.js";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {useNavigate} from 'react-router-dom';
import {ref, set } from "firebase/database";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  
  const register = (e) => {
    e.preventDefault();

    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log(user);
     
      // adding data to database
      set(ref(database, 'users/' + user.uid), {
        email:user.email,
        cart:[]
      });
      
      if(userCredential){
        navigate('/');
      }

      // ...
    })
    .catch((error) => {
      alert(error.message)
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
  };

  return (
    <div className="signup">
      <div className="signup__container">
        <h1>Create Your Account</h1>

        <form>
          <h5>Name</h5>
          <input
            type="text"
            value={name}
            name="name"
            onChange={(e) => setName(e.target.value)}
          />

          <h5>E-mail</h5>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <h5>Password</h5>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={register}
            type="submit"
            className="signup__signupButton"
          >
            Create Account
          </button>
        </form>

        <p>Already Have Account?</p>
        <Link to="/login">
          <button className="signup__loginButton">Login</button>
        </Link>
      </div>
    </div>
  );
}

export default SignUp;
