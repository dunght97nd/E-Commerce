import React from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";

import Products from "../components/Products/Products";

import "./ProductList.scss";
const ProductList = () => {
  const location = useLocation();
  const cat = location.pathname.split("/")[2];

  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState("newest");

  const handleFilters = (e) => {
    const value = e.target.value || "default";
    setFilters({
      ...filters,
      [e.target.name]: value,
    });
  };

  return (
    <div className="productList">
      <h1 className="title">{cat}</h1>
      <div className="filterContainer">
        <div className="filter">
          <span className="filterText">Filter Products:</span>
          <select name="color" defaultValue="color" onChange={handleFilters}>
            <option disabled>color</option>
            <option value="white">white</option>
            <option value="black">black</option>
            <option value="red">red</option>
            <option value="blue">blue</option>
            <option value="yellow">yellow</option>
            <option value="green">green</option>
          </select>
          {cat !== "jeans" ? (
            <select name="size" defaultValue="size" onChange={handleFilters}>
              <option disabled>size</option>
              <option value="xs">XS</option>
              <option value="s">S</option>
              <option value="m">M</option>
              <option value="l">L</option>
              <option value="xl">XL</option>
            </select>
          ) : (
            <select name="size" defaultValue="size" onChange={handleFilters}>
              <option disabled>size</option>
              <option value="28">28</option>
              <option value="29">29</option>
              <option value="30">30</option>
              <option value="31">31</option>
              <option value="32">32</option>
              <option value="33">33</option>
              <option value="34">34</option>
            </select>
          )}
        </div>
        <div className="filter">
          <span className="filterText">Sort Products:</span>
          <select onChange={(e) => setSort(e.target.value)}>
            <option value="newest">Newest</option>
            <option value="asc">Price (asc)</option>
            <option value="desc">Price (desc)</option>
          </select>
        </div>
      </div>
      <Products cat={cat} filters={filters} sort={sort} />
    </div>
  );
};

export default ProductList;
