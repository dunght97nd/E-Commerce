import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import "./Checkout.scss";

const Checkout = () => {
  const [provinces, setProvinces] = useState([]);
  const [province, setProvince] = useState("");
  const [districts, setDistricts] = useState([]);
  const [district, setDistrict] = useState("");
  const [wards, setWards] = useState([]);
  useEffect(() => {
    const getProvince = async () => {
      try {
        const res = await axios.get(
          `https://api.mysupership.vn/v1/partner/areas/province`
        );

        setProvinces(res.data);
      } catch (err) {}
    };
    getProvince();
  }, []);
  useEffect(() => {
    const getDistricts = async () => {
      try {
        const res = await axios.get(
          `https://api.mysupership.vn/v1/partner/areas/district?province=${province}`
        );

        setDistricts(res.data);
      } catch (err) {}
    };
    getDistricts();
  }, [province]);
  useEffect(() => {
    const getWards = async () => {
      try {
        const res = await axios.get(
          `https://api.mysupership.vn/v1/partner/areas/commune?district=${district}`
        );

        setWards(res.data);
      } catch (err) {}
    };
    getWards();
  }, [province, district]);

  //Cart
  const cart = useSelector((state) => state.cart.products);
  const total = () => {
    let s = 0;
    cart.forEach((item) => (s += item.price * item.quantity));
    return s.toFixed(1);
  };

  return (
    <div className="checkout">
      <div className="container">
        <h1 className="title">Shipment Details</h1>
        <div className="wrapper">
          <form action="">
            <div className="info">
              <input
                type="text"
                className="item"
                placeholder="first and last name"
              />
              <input type="text" className="item" placeholder="phone number" />
              <input type="text" className="item" placeholder="address" />
              <div className="filter">
                <span className="province">Provice:</span>
                <select
                  defaultValue="Choose"
                  className="province"
                  onChange={(e) => {
                    setProvince(e.target.value);
                  }}
                >
                  <option disabled className="province">
                    Choose
                  </option>
                  {provinces.results?.map((province, index) => (
                    <option
                      className="province"
                      key={index}
                      value={province.code}
                    >
                      {province.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="filter">
                <span className="district">district:</span>
                <select
                  defaultValue="Choose"
                  className="district"
                  onChange={(e) => {
                    setDistrict(e.target.value);
                  }}
                >
                  <option disabled className="district">
                    Choose
                  </option>
                  {districts.results?.map((district, index) => (
                    <option
                      className="district"
                      key={index}
                      value={district.code}
                    >
                      {district.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="filter">
                <span className="ward">ward:</span>
                <select defaultValue="Choose" className="ward">
                  <option disabled className="ward">
                    Choose
                  </option>
                  {wards.results?.map((ward, index) => (
                    <option className="ward" key={index} value={ward.code}>
                      {ward.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="method">
                <span>Payment method:</span>
                <div className="item">
                  <input type="radio" value={1} />
                  <span>Payment on delivery (COD)</span>
                </div>
              </div>
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

              <button>Complete your order</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
