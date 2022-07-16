import React from 'react';
import './CartProduct.css'
import { useStateValue } from "../StateProvider/StateProvider";
import {ref, set } from "firebase/database";
import { auth,database } from "../database/firebase.js";


function CartProduct({ id, image, title, price, rating, hideButton }) {
  
  const [{ basket, user }, dispatch] = useStateValue();


    const removeFromBasket = () => {
        // remove the item from the basket
        dispatch({
            type: 'REMOVE_FROM_BASKET',
            id: id,
        })
       console.log(user)
        set(ref(database, 'users/' + user.uid), {
            email:user.email,
            cart:basket
          });
    }

    return (
        <div className='checkoutProduct'>
            <img className='checkoutProduct__image' src={image} />

            <div className='checkoutProduct__info'>
                <p className='checkoutProduct__title'>{title}</p>
                <p className="checkoutProduct__price">
                    <small>₹</small>
                    <strong>{price}</strong>
                </p>
                {/* <div className="checkoutProduct__rating">
                    {Array(rating)
                    .fill()
                    .map((_, i) => (
                        <p>⭐</p>
                    ))}
                </div> */}
                {!hideButton && (
                    <button onClick={removeFromBasket}>Remove from Basket</button>
                )}
            </div>
        </div>
    )
}

export default CartProduct