import React from "react";
import CartBtn from "../CartBtn/CartBtn";
import "./CartLayout.scss";

//component used in cart to show added Item along with quantuty and values
export default function CartLayout({ data }) {
  const { id, image, name, price, quantity } = data;
  const totalPrice = price * quantity;

  return (
    <div className="cart-layout">
      <div className="cart-image">
        <img src={image} alt={name} height="120" />
      </div>
      <div className="cart-layout-button">
        <CartBtn id={id} price={price} quan={quantity} />
      </div>
      <div className="total-cart-price">
        <p>Rs.{totalPrice}</p>
      </div>
    </div>
  );
}
