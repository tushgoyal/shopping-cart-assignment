import React, { useEffect } from "react";
import { fetchProductData } from "../../redux/product/productAction";
import { useSelector, useDispatch } from "react-redux";
import ListingLayout from "../ListingLayout/ListingLayout";
import ProductBase from "../ProductBase/ProductBase";

const url = "http://localhost:3000/products";

function ListingList() {
  const dispatch = useDispatch();
  const { data, loading = true, error } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchProductData(url));
  }, []);

  return (
    <>
      {loading ? (
        <ProductBase />
      ) : error ? (
        <h1>Error while fetching data</h1>
      ) : (
        <ListingLayout data={data} />
      )}
    </>
  );
}

export default React.memo(ListingList);
