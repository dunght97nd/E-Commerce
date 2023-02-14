import React from "react";

import {
  ShoppingCartOutlined,
  SearchOutlined,
  FavoriteBorderOutlined,
} from "@material-ui/icons";
import "./Product.scss";
import { Link } from "react-router-dom";

const Product = ({ item }) => {
  return (
    <div className="product">
      <div className="img">
        <img src={item.img[0]} alt="" />
        <div className="info">
          <div className="icon">
            <ShoppingCartOutlined />
          </div>

          <Link to={`/product/${item._id}`}>
            <div className="icon">
              <SearchOutlined />
            </div>
          </Link>

          <div className="icon">
            <FavoriteBorderOutlined />
          </div>
        </div>
      </div>

      <div className="detail">
        <div className="name">{item.title}</div>
        <div className="price">${item.price}</div>
      </div>
    </div>
  );
};

export default Product;
