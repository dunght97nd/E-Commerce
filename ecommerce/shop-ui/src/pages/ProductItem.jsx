import React, { useState, useEffect } from "react";
import { Add, Remove } from "@material-ui/icons";

import "./ProductItem.scss";
import { Link, useLocation } from "react-router-dom";
import { publicRequest } from "../requestMethods";

import { addProduct } from "../redux/cartRedux";
import { useDispatch } from "react-redux";

import { toast } from "react-toastify";
import { useRef } from "react";

const ProductItem = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];

  const [product, setProduct] = useState([]);
  const [productDetails, setProductDetails] = useState([]);

  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");

  const dispath = useDispatch();

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get(`products/find/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getProduct();
  }, [id]);

  // useEffect(() => {
  //   const getProductDetails = async () => {
  //     try {
  //       const res = await publicRequest.get(`products/details/${id}`);
  //       setProductDetails(res.data);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   getProductDetails();
  // }, [id]);

  const handleQuantity = (type) => {
    if (type === "dec") {
      quantity > 1 && setQuantity(quantity - 1);
    } else {
      setQuantity(quantity + 1);
    }
  };

  const handleAddToCart = () => {
    if (color === "") {
      toast.error("Please select a color");
    } else if (size === "") {
      toast.error("Please select a size");
    } else {
      dispath(addProduct({ ...product, quantity, color, size }));
      toast.success("Product added successfully");
    }
  };

  const [slideIndex, setSlideIndex] = useState(1);
  const [width, setWidth] = useState(0);
  const [start, setStart] = useState(0);
  const [change, setChange] = useState(9);
  const sliderRef = useRef();

  const plusSiles = (n) => {
    setSlideIndex((prev) => prev + n);
    slideShow(slideIndex + n);
  };

  const slideShow = (n) => {
    if (n > product.img.length) {
      setSlideIndex(1);
    }
    if (n < 1) {
      setSlideIndex(product.img.length);
    }
  };
  const dragStart = (e) => {
    setStart(e.clientY);
  };

  const dragOver = (e) => {
    let touch = e.clientY;
    setChange(start - touch);
  };
  const dragEnd = (e) => {
    if (change > 0) {
      sliderRef.current.scrollBottom += 50;
    }
  };

  return (
    product && (
      <div className="productItem">
        <h1 className="title">{product.category}</h1>
        <div className="container">
          <div className="imgContainer">
            <div className="productPage">
              {product.img?.map((item, index) => (
                <div
                  className="slider"
                  key={index}
                  style={{
                    display: index + 1 === slideIndex ? "block" : "none",
                  }}
                >
                  <img src={item} alt="" />
                </div>
              ))}
              <Link to="#" className="prev" onClick={() => plusSiles(-1)}>
                &#10094;
              </Link>
              <Link to="#" className="next" onClick={() => plusSiles(1)}>
                &#10095;
              </Link>
              <div
                className="sliderImg"
                draggable={true}
                onDragStart={dragStart}
                onDragOver={dragOver}
                onDragEnd={dragEnd}
                ref={sliderRef}
              >
                {product.img?.map((item, index) => (
                  <div
                    className={`sliderBox ${
                      index + 1 === slideIndex && "active"
                    } `}
                    key={index}
                    onClick={() => setSlideIndex(index + 1)}
                  >
                    <img src={item} alt="" />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="infoContainer">
            <h2 className="title">{product.title}</h2>
            <span className="price">${product.price}</span>
            <div className="filterContainer">
              <div className="filter">
                <span className="filterTitle">Color:</span>
                {product.color?.map((c) => (
                  <div
                    key={c}
                    className={`filterColor ${color === c ? "active" : ""}`}
                    style={{ backgroundColor: c }}
                    onClick={() => setColor(c)}
                  />
                ))}
              </div>
              <div className="filter">
                <span className="filterTitle">Size:</span>
                <select
                  defaultValue="Choose"
                  className="filterSize"
                  onChange={(e) => setSize(e.target.value)}
                >
                  <option disabled className="filterSizeOption">
                    Choose
                  </option>
                  {product.size?.map((size) => (
                    <option className="filterSizeOption" key={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="addContainer">
              <div className="amountContainer">
                <Remove onClick={() => handleQuantity("dec")} />
                <span className="amount">{quantity}</span>
                <Add onClick={() => handleQuantity("inc")} />
              </div>
              <button onClick={handleAddToCart}>ADD TO CART</button>
              <Link to="/cart">
                <button>GO TO CART</button>
              </Link>
            </div>
            {productDetails.map((productDetail) => (
              <div key={productDetail._id}>
                {productDetail.color +
                  " " +
                  productDetail.size +
                  " " +
                  productDetail.quantity}
              </div>
            ))}
            <div
              className="desc"
              dangerouslySetInnerHTML={{ __html: product.desc }}
            ></div>
          </div>
        </div>
      </div>
    )
  );
};

export default ProductItem;
