import React from "react";
import "./CartBtn.scss";
import { useDispatch } from "react-redux";
import {
  addCartItemCount,
  deleteCartItemCount,
} from "../../redux/cart/cartAction";


//component used for showing cartBtns
export default function CartBtn({ id, price, quan }) {
  const dispatch = useDispatch();

  //for increase Item value on click of plus btn
  const addItem = () => {
    dispatch(addCartItemCount(id));
  };

  //for decrease Item value on click of minus btn
  const removeItem = () => {
    dispatch(deleteCartItemCount(id));
  };

  return (
    <div className="cart-price">
      <div className="cart-button">
        <button className="cart-add-button" onClick={removeItem}>
          <span>-</span>
        </button>
        <span className="cart-button-text">{quan}</span>
        <button className="cart-add-button" onClick={addItem}>
          <span>+</span>
        </button>
      </div>
      <div className="divider"> X </div>
      <div className="cart-price-item"> Rs.{price}</div>
    </div>
  );
}
