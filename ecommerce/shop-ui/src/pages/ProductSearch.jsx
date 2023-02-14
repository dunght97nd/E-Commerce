import React, { useEffect, useState } from "react";
import Product from "../components/Product/Product";

import { useLocation } from "react-router-dom";
import { publicRequest } from "../requestMethods";
import "./ProductSearch.scss";

const ProductSearch = () => {
  const [products, setProducts] = useState([]);
  const [noOfElements, setNoOfElements] = useState(4);
  const query = useLocation().search;

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get(`/products/search${query}`);
        setProducts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getProduct();
  }, [query]);

  const handleLoadMore = () => {
    setNoOfElements(noOfElements + noOfElements);
  };

  return (
    <div className="productSearch">
      <div className="container">
        <h1 className="title">
          Search Results <span>{`${products.length} products`}</span>
        </h1>
        <div className="products">
          {products &&
            products
              .slice(0, noOfElements)
              .map((item) => <Product item={item} key={item._id} />)}
        </div>
        <div className="loadMore">
          <button className="loadMoreButton" onClick={handleLoadMore}>
            Load More
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductSearch;
