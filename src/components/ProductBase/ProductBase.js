import React from "react";
import "./ProductBase.scss";

export default function ProductBase() {
  const arr = new Array(6).fill(true);
  return (
    <div className="product-base">
      {arr.map((el, index) => (
        <div key={index} className="box">
          <div className="base base-text"></div>
          <div className="box-item base"></div>
          <div className="base base-text"></div>
          <div className="base base-text"></div>
          <div className="base base-text"></div>
        </div>
      ))}
    </div>
  );
}
