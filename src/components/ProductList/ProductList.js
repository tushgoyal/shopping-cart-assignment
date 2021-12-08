import React from "react";
import useFetch from "../../utilities/helper/customHooks";
import "./ProductList.scss";
import ProductLayout from "../ProductLayout/ProductLayout";

export default function ProductList() {
  let data, loading, error;
  const storageData = localStorage.getItem("category-list");
  if (storageData && JSON.parse(storageData)?.length) {
    data = JSON.parse(storageData);
  } else {
    [data, loading, error] = useFetch("http://localhost:3000/categories");
    localStorage.setItem("category-list", JSON.stringify(data))
  }

  return (
    <>
      {loading ? (
        <h1> Loading</h1>
      ) : error ? (
        <h1>Error Occured</h1>
      ) : (
        data &&
        data.map((el, index) => (
          <ProductLayout key={el.id} data={el} id={index} />
        ))
      )}
    </>
  );
}
