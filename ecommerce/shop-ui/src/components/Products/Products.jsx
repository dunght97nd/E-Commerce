import React from "react";
import { useState, useEffect } from "react";

import Product from "../Product/Product";

import "./Products.scss";
import { publicRequest } from "../../requestMethods";

const Products = ({ cat, filters, sort }) => {
  const [products, setProducts] = useState([]);
  const [filterProducts, setFilterProducts] = useState([]);
  //Get Products
  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await publicRequest(
          cat ? `products?category=${cat}` : `products`
        );

        setProducts(res.data);
      } catch (err) {}
    };
    getProducts();
  }, [cat]);

  //Fillter Products: Color and Size
  useEffect(() => {
    cat &&
      setFilterProducts(
        products.filter((item) =>
          Object.entries(filters).every(([key, value]) =>
            item[key].includes(value)
          )
        )
      );
  }, [products, cat, filters]);

  //Sort Products
  useEffect(() => {
    if (sort === "newest") {
      setFilterProducts((prev) =>
        [...prev].sort((a, b) => b.createdAt.localeCompare(a.createdAt))
      );
    } else if (sort === "asc") {
      setFilterProducts((prev) => [...prev].sort((a, b) => a.price - b.price));
    } else {
      setFilterProducts((prev) => [...prev].sort((a, b) => b.price - a.price));
    }
  }, [sort]);

  return (
    <div className="products">
      {cat
        ? filterProducts.map((item) => <Product item={item} key={item._id} />)
        : products
            .slice(0, 4)
            .map((item) => <Product item={item} key={item._id} />)}
    </div>
  );
};

export default Products;
