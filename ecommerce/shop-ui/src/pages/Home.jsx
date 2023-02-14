import React from "react";
import Slider from "../components/Slider/Slider";
import Categories from "../components/Categories/Categories";
import Products from "../components/Products/Products";

import "./Home.scss";

const Home = () => {
  return (
    <div className="home">
      <Slider />
      <Categories />
      <div className="container">
        <div className="newProduct">
          <h1 className="title">new products</h1>
          <Products />
        </div>
        <div className="sellingProduct">
          <h1 className="title">selling products</h1>
          <Products />
        </div>
        <div className="lookBook">
          <h1 className="title">lookbook</h1>
        </div>

        <div className="news">
          <h1 className="title">news</h1>
        </div>
      </div>
    </div>
  );
};

export default Home;
