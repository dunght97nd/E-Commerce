import React from "react";
import {
  Facebook,
  Instagram,
  MailOutline,
  Phone,
  Pinterest,
  Room,
  Twitter,
} from "@material-ui/icons";
import { Link } from "react-router-dom";

import "./Footer.scss";
const Footer = () => {
  return (
    <div className="footer">
      <div className="left">
        <div className="logo">
          <Link to={"/"}>
            <img
              src="https://traffic-edge02.cdn.vncdn.io/cdn-pos/be3159-662/store/20140514_zDIzVUPzsug50Im3jvclQm0H.png"
              alt=""
            />
          </Link>
        </div>
        <p className="desc">
          There are many variations of passages of Lorem Ipsum available, but
          the majority have suffered alteration in some form, by injected
          humour, or randomised words which don’t look even slightly believable.
        </p>
        <div className="socialContainer">
          <div className="socialIcon">
            <Facebook />
          </div>
          <div className="socialIcon">
            <Instagram />
          </div>
          <div className="socialIcon">
            <Twitter />
          </div>
          <div className="socialIcon">
            <Pinterest />
          </div>
        </div>
      </div>
      <div className="center">
        <h3 className="title">Useful Links</h3>
        <ul className="list">
          <li className="listItem">Home</li>
          <li className="listItem">Cart</li>
          <li className="listItem">Man Fashion</li>
          <li className="listItem">Woman Fashion</li>
          <li className="listItem">Accessories</li>
          <li className="listItem">My Account</li>
          <li className="listItem">Order Tracking</li>
          <li className="listItem">Wishlist</li>
          <li className="listItem">Wishlist</li>
          <li className="listItem">Terms</li>
        </ul>
      </div>
      <div className="right">
        <h3 className="title">Contact</h3>
        <div className="contactItem">
          <Room style={{ marginRight: "10px" }} /> 49 Mai Phuc, Long Bien, Ha
          Noi
        </div>
        <div className="contactItem">
          <Phone style={{ marginRight: "10px" }} /> +8 888 88 88
        </div>
        <div className="contactItem">
          <MailOutline style={{ marginRight: "10px" }} /> dunght97nd@gmail.com
        </div>
        <img
          className="payment"
          src="https://i.ibb.co/Qfvn4z6/payment.png"
          alt=""
        />
      </div>
    </div>
  );
};

export default Footer;
