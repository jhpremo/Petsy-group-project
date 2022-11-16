// ShoppingCart/index.js

import React, { useEffect, useState } from "react";
import AddToCart from "../AddToCart";

import "../ShoppingCart/ShoppingCart.css";

let localStorageCart = JSON.parse(localStorage.getItem("cart") || "[]");

const ShoppingCart = () => {
  const [shoppingCart, setShoppingCart] = useState(localStorageCart);

  useEffect(() => {
    localStorageCart = JSON.parse(localStorage.getItem("cart"));

    if (shoppingCart === [] && localStorageCart === []) {
      setShoppingCart([]);
    } else {
      setShoppingCart(localStorageCart);
    }
    console.log("mounting localStorage Cart");
  }, []);

  console.log("this is localStorageCart in ShoppingCart", localStorageCart);
  console.log("this is shoppingcart in shopping cart", shoppingCart);

  // useEffect(() => {
  //   const shoppingCart = JSON.parse(localStorage.getItem("cart"));
  //   if (shoppingCart) {
  //     setShoppingCart(shoppingCart);
  //   }
  // }, [AddToCart, localStorageCart]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(shoppingCart));
    console.log("setting localStorageCart to shoppingCart change");
  }, [shoppingCart, emptyCart]);

  //   return totalQty;
  // }

  // async function getCartProductInfo(productId) {
  //   const response = await fetch(`/api/items/${productId}`);

  //   if (response.ok) {
  //     const responseData = await response.json();
  //     console.log(responseData);

  //     let cartProductInfo = {
  //       name: responseData.name,
  //       previewImg: responseData.imageURLs[0],
  //       price: 10, // Need Price responseData.price
  //       shopName: responseData.shopName
  //     };

  //     return cartProductInfo;
  //   }
  // }

  function addToShoppingCart(item) {
    if (!localStorageCart) {
      setShoppingCart([item]);
    } else {
      setShoppingCart([...shoppingCart, item]);
    }
    console.log("shopping cart after addtocart ", shoppingCart);
  }

  function removeFromShoppingCart(removedItem) {
    // shoppingCart.splice(removedItem, 1);
    // console.log("this is shoppingCart after splice", shoppingCart);
    // setShoppingCart(shoppingCart);
    // console.log("this is shoppingCart after set", shoppingCart);
    // return;
    setShoppingCart(shoppingCart.filter((item) => item !== removedItem));
  }

  function getTotalPrice() {
    let totalPrice = 0;
    for (let item of shoppingCart) {
      totalPrice += item.price;
    }
    return totalPrice.toFixed(2);
  }

  function emptyCart() {
    // localStorage.removeItem("cart");
    setShoppingCart([]);
  }

  return (
    <>
      <div className='cart-header'></div>
      <div className='cart-container-main'>
        <div className='cart-items'>
          {shoppingCart.map((item, index) => (
            <div
              className='cart-item'
              key={index}>
              <div className='cart-item-img-wrapper'>
                <img
                  src={item.previewImg}
                  alt={item.name}
                  className='cart-item-img'
                />
              </div>
              <div className='cart-item-name'>{item.name}</div>
              <div className='cart-item-price'>${item.price}</div>
              <button
                className='cart-add-item-button'
                onClick={() => addToShoppingCart(item)}>
                Add to Cart
              </button>
              <button
                className='cart-remove-item-button'
                onClick={() => removeFromShoppingCart(item)}>
                Remove Item
              </button>
            </div>
          ))}
        </div>
        <div className='cart-sidebox'>
          <div className='cart-sidebox-header'>Checkout</div>
          <div className='cart-sidebox-totalitems'>
            {shoppingCart.length} items in your cart
          </div>
          <div className='cart-sidebox-totalprice'>
            Item(s) Total Price ${getTotalPrice()}
          </div>
          <div>
            <button
              className='cart-sidebox-emptyShoppingCart-button'
              onClick={() => emptyCart()}>
              Empty Cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShoppingCart;
