import React from "react";
import "./Landing.scss"
import CustomCarousel from "../../CustomCarousel/CustomCarousel";
import ProductList from "../../ProductList/ProductList";

export default function Landing() {

  return (
    <main>
      <CustomCarousel />
      <hr className="divider" />
      <ProductList />
    </main>
  );
}
