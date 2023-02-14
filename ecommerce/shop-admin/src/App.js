import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate,
} from "react-router-dom";

import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import Navbar from "./components/navbar/Navbar";
import Sidebar from "./components/sidebar/Sidebar";
import { useSelector } from "react-redux";
import ProductList from "./pages/productList/ProductList";
import ProductNew from "./pages/productNew/ProductNew";

function App() {
  const { darkMode } = useContext(DarkModeContext);
  const currentUser = useSelector((state) => state.user.currentUser);

  const Layout = () => {
    return (
      <div className={darkMode ? "app dark" : "app"}>
        <div className="home">
          <Sidebar />
          <div className="homeContainer">
            <Navbar />
            <Outlet />
          </div>
        </div>
      </div>
    );
  };
  const ProtectedRoute = ({ children }) => {
    if (currentUser) {
      return <Navigate to="/" />;
    }
    return children;
  };
  const router = createBrowserRouter([
    currentUser && {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        //Users
        {
          path: "/users",
          element: <List />,
        },
        {
          path: "/users/:id",
          element: <Single />,
        },
        {
          path: "/users/new",
          element: <New title="Add New User" />,
        },
        //Product
        {
          path: "/products",
          element: <ProductList />,
        },
        {
          path: "/products/:id",
          element: <Single />,
        },
        {
          path: "/products/new",
          element: <ProductNew />,
        },
      ],
    },
    {
      path: "/login",
      element: (
        <ProtectedRoute>
          <Login />
        </ProtectedRoute>
      ),
    },
  ]);
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
