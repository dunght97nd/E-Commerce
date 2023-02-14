import React from "react";
import { Add, Remove } from "@material-ui/icons";
import DeleteIcon from "@material-ui/icons/Delete";
import "./Cart.scss";

import { useDispatch, useSelector } from "react-redux";

import { useEffect, useState } from "react";
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";

import { Link } from "react-router-dom";
import {
  decreaseCart,
  increaseCart,
  removeItem,
  resetCart,
} from "../redux/cartRedux";

// import StripeCheckout from "react-stripe-checkout";

// const KEY = process.env.REACT_APP_STRIPE;

const Cart = () => {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart.products);
  const total = () => {
    let s = 0;
    cart.forEach((item) => (s += item.price * item.quantity));
    return s.toFixed(1);
  };

  const handleDecreaseCart = (product) => {
    dispatch(decreaseCart(product));
  };

  const handleIncreaseCart = (product) => {
    dispatch(increaseCart(product));
  };

  //Check out paypal
  const [open, setOpen] = useState(false);
  // This values are the props in the UI
  const amount = "4";
  const currency = "USD";
  const style = { layout: "vertical" };

  // Custom component to wrap the PayPalButtons and handle currency changes
  const ButtonWrapper = ({ currency, showSpinner }) => {
    // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
    // This is the main reason to wrap the PayPalButtons in a new component
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

    useEffect(() => {
      dispatch({
        type: "resetOptions",
        value: {
          ...options,
          currency: currency,
        },
      });
    }, [currency, showSpinner]);

    return (
      <>
        {showSpinner && isPending && <div className="spinner" />}
        <PayPalButtons
          style={style}
          disabled={false}
          forceReRender={[amount, currency, style]}
          fundingSource={undefined}
          createOrder={(data, actions) => {
            return actions.order
              .create({
                purchase_units: [
                  {
                    amount: {
                      currency_code: currency,
                      value: amount,
                    },
                  },
                ],
              })
              .then((orderId) => {
                // Your code here after create the order
                return orderId;
              });
          }}
          onApprove={function (data, actions) {
            return actions.order.capture().then(function (details) {
              // Your code here after capture the order
              console.log(details);
            });
          }}
        />
      </>
    );
  };

  return (
    <div className="cart">
      <div className="container">
        <h1 className="title">YOUR BAG</h1>
        <div className="top">
          <Link to="/">
            <button className="topButton">CONTINUE SHOPPING</button>
          </Link>
          {/* <div className="topTexts">
              <span className="topText">Shopping Bag(2)</span>
              <span className="topText">Your Wishlist (0)</span>
            </div> */}
          <button className="topButton" onClick={() => dispatch(resetCart())}>
            RESET CARD
          </button>
        </div>
        <div className="bottom">
          <div className="info">
            {cart?.map((product, index) => (
              <div className="product" key={index}>
                <div className="productDetail">
                  <Link to={`/product/${product._id}`}>
                    <img src={product.img[0]} alt="" />
                  </Link>
                  <div className="details">
                    <span className="productName">
                      <b>Product:</b> {product.title}
                    </span>
                    <span className="productId">
                      <b>Price:</b>$ {product.price}
                    </span>
                    <div
                      className="productColor"
                      style={{ backgroundColor: product.color }}
                    />
                    <span className="productSize">
                      <b>Size:</b> {product.size}
                    </span>
                  </div>
                </div>
                <div className="priceDetail">
                  <div className="productPrice">
                    $ {product.price * product.quantity}
                  </div>
                  <div className="productAmountContainer">
                    <Add onClick={() => handleIncreaseCart(product)} />
                    <div className="productAmount">{product.quantity}</div>
                    <Remove onClick={() => handleDecreaseCart(product)} />
                  </div>
                  <DeleteIcon
                    className="delete"
                    onClick={() => dispatch(removeItem(product))}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="summary">
            <h1 className="summaryTitle">ORDER SUMMARY</h1>
            <div className="summaryItem">
              <span className="summaryItemText">Subtotal</span>
              <span className="summaryItemPrice">$ {total()}</span>
            </div>
            {/* <div className="summaryItem">
              <span className="summaryItemText">Estimated Shipping</span>
              <span className="summaryItemPrice">$ 5.90</span>
            </div>
            <div className="summaryItem">
              <span className="summaryItemText">Shipping Discount</span>
              <span className="summaryItemPrice">$ -5.90</span>
            </div> */}
            <div className="summaryTotal">
              <span className="summaryItemText">Total</span>
              <span className="summaryItemPrice">$ {total()}</span>
            </div>

            {open ? (
              <div className="paymentMethods">
                <Link to="/checkout">
                  <button className="payButton" style={{ marginBottom: 10 }}>
                    CASH ON DELIVERY
                  </button>
                </Link>
                <PayPalScriptProvider
                  options={{
                    "client-id":
                      "AT07W9e3O6mkL4CmK2P17z442xEgeQjLWlMB_KDpyWXDtW2U8CVdYzxtMvErcNNlTdarfwIENm0mvAm8",
                    components: "buttons",
                    currency: "USD",
                    // "disable-funding": "credit,card,p24",
                  }}
                >
                  <ButtonWrapper currency={currency} showSpinner={false} />
                </PayPalScriptProvider>
              </div>
            ) : (
              <button onClick={() => setOpen(true)}>CHECKOUT NOW!</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
