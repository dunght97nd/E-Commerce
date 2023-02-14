import React, { useRef, useState } from "react";

import { Badge } from "@material-ui/core";
import {
  AccountCircle,
  CloseOutlined,
  MenuOutlined,
  PersonOutlineOutlined,
  ShoppingCartOutlined,
} from "@material-ui/icons";

import "./Navbar.scss";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/userRedux";
import { resetCart } from "../../redux/cartRedux";

const Navbar = () => {
  const headerNav = [
    {
      display: "Home",
      path: "/",
    },
    {
      display: "Shirt",
      path: "/products/shirt",
    },
    {
      display: "Coat",
      path: "/products/coat",
    },
    {
      display: "Jeans",
      path: "/products/jeans",
    },
    {
      display: "Sweater",
      path: "/products/sweater",
    },
  ];
  const { pathname } = useLocation();

  const active = headerNav.findIndex((e) => e.path === pathname);
  const menuLeft = useRef(null);
  const menuToggle = () => menuLeft.current.classList.toggle("active");

  //Cart
  const cart = useSelector((state) => state.cart.products);

  const quantity = cart.length;

  //Search
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const handleChange = (e) => {
    setQuery(e.target.value);
  };
  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?q=${query}`);
    // setQuery("");
  };

  //User Login
  const user = useSelector((state) => state.user.currentUser);
  const menuUser = useRef(null);
  const menuUserToggle = () => menuUser.current.classList.toggle("active");

  const dispatch = useDispatch();
  const handleLogout = (e) => {
    dispatch(logout(user));
    dispatch(resetCart());
  };

  // const refreshToken = async () => {
  //   try {
  //     const res = await publicRequest.post("/refresh", {
  //       token: user.refreshToken,
  //     });
  //     setUser({
  //       ...user,
  //       accessToken: res.data.accessToken,
  //       refreshToken: res.data.refreshToken,
  //     });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="left">
          <MenuOutlined onClick={menuToggle} className="menu" />
          <div className="logo">
            <Link to={"/"}>
              <img
                src="https://traffic-edge02.cdn.vncdn.io/cdn-pos/be3159-662/store/20140514_zDIzVUPzsug50Im3jvclQm0H.png"
                alt=""
              />
            </Link>
          </div>
        </div>

        <div className="center">
          <ul className="nav" ref={menuLeft}>
            <CloseOutlined onClick={menuToggle} className="close" />
            {headerNav.map((e, i) => (
              <li key={i} className={`${i === active ? "active" : ""}`}>
                <Link to={e.path}>{e.display}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="right">
          <form className="searchContainer" onSubmit={handleSearch}>
            <input
              type="text"
              className="searchInput"
              placeholder="Search"
              value={query}
              onChange={handleChange}
            />
            <button type="submit" className="searchProduct" />
          </form>

          <div className="menuItem">
            <Link to="/cart">
              <Badge
                badgeContent={quantity}
                color="primary"
                overlap="rectangular"
              >
                <ShoppingCartOutlined style={{ cursor: "pointer" }} />
              </Badge>
            </Link>
          </div>
          <div className="menuItem">
            {!user ? (
              <Link to="/login">
                <PersonOutlineOutlined style={{ cursor: "pointer" }} />
              </Link>
            ) : (
              <div className="userLogin">
                <AccountCircle
                  style={{ marginTop: 2, cursor: "pointer" }}
                  className="userLoginIcon"
                  onClick={menuUserToggle}
                />

                <div className="userLoginList" ref={menuUser}>
                  <div className="userLoginItem">info user</div>
                  <div className="userLoginItem" onClick={handleLogout}>
                    <Link to="/">Logout</Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
