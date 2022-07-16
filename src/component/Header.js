import React from "react";
import "./Header.css";
import { Search } from "@mui/icons-material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router-dom";
import {useStateValue} from "../StateProvider/StateProvider"
import { auth } from "../database/firebase";
// import { useNavigate } from "react-router-dom";


function Header() {
  // const [{ basket }, dispatch] = useStateValue();
  // const navigate = useNavigate();
  const [{ basket, user }] = useStateValue();

  const handleAuthentication=()=>{
    if(user){
      
      auth.signOut();
    }
  }
  return (
    <div className="header">
      <Link to="/">
        <spam className="header_logo">E-Commerce</spam>
      </Link>

      <div className="header_search">
        <input className="header_searchInput" type="text" />
        <Search className="header_searchIcon" />
      </div>

      <div className="header_nav">
      <Link to={!user && '/login'}>
        <div onClick={handleAuthentication} className="header_option">
          <span className="header_optionLineOne"> Hello {user?user.email.substring(0, user.email.indexOf("@")):""}</span>
          <span className="header_optionLineTwo">{user?'Sign Out':'Sign In'}</span>
        </div>
          </Link>
          <div className="header_option">
          <span className="header_optionLineOne"> Returns</span>
          <span className="header_optionLineTwo">&Orders</span>
        </div>

        <Link to='/addproduct'>
        {user && user.email==='tapasadmin@gmail.com'?(<div className="header_option">
          <span className="header_optionLineOne"> Items</span>
          <span className="header_optionLineTwo">Add</span>
        </div>):''}
        </Link>
        

        
       <Link to="./cart">
        <div className="header_optionBasket">
          <ShoppingCartIcon />
          <span className="header_optionLineTwo header_basketCount">{basket?.length}</span>
        </div>
        </Link>
      </div>
    </div>
  );
}

export default Header;
