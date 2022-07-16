import React, { useState } from "react";
import "./Login.css";
import { Link} from "react-router-dom";
import { auth } from "../database/firebase.js";
import {useNavigate} from 'react-router-dom';
import {  signInWithEmailAndPassword } from "firebase/auth";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      if(userCredential){
        navigate('/');
      }
      // const user = userCredential.user;
      // ...
    })
    .catch((error) => {
      alert(error.message)
      // const errorCode = error.code;
      // const errorMessage = error.message;
    });
  };

  return (
    <div className="login">
      <div className="login__container">
        <h1>Sign-in</h1>

        <form>
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

          <button onClick={signIn} type="submit" className="login__signInButton">
            Sign In
          </button>
        </form>

        <p>Don't have account</p>
        <Link to="/signup">
          <button className="login__registerButton">Create your Account</button>
        </Link>
      </div>
    </div>
  );
}

export default Login;
