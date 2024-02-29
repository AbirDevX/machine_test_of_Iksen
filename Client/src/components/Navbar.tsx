/* eslint-disable @typescript-eslint/no-unused-vars */
import JsCookie from "js-cookie";
import { useState } from "react";
import { FaHome } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import { useDispatch } from "react-redux";
import { Link, NavLink, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { logOutHelper } from "../helper/authHelper";
import { useAppSelector } from "../hooks/hooks";
import {
  setAccessToken,
  setIsAuthenticate,
  setUser,
} from "../redux/slice/authSlice";

function Navbar() {
  const [showProfileCard, setShowProfileCard] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user, accessToken, isAuthenticate } = useAppSelector(
    (state) => state.auth
  );

  const location = useLocation();
  const disPatch = useDispatch();

  const logOut = async () => {
    try {
      setLoading(true);
      const result = await logOutHelper(accessToken);
      toast.success(`${result?.message}`);
      JsCookie.remove("user_accessToken");
      disPatch(setUser(null));
      disPatch(setAccessToken(null));
      disPatch(setIsAuthenticate(false));
      setLoading(false);
      setShowProfileCard(false);
    } catch (error) {
      setLoading(false);
      toast.error(`Logout failed try again..!`);
    }
  };

  return (
    <>
      {/* Navbar & Hero Start */}
      <div className="container-xxl position-relative p-0">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4 px-lg-5 py-3 py-lg-0">
          <a href="" className="navbar-brand p-0">
            <h1 className="text-primary m-0">
              <FaHome /> Shop
            </h1>
            {/* <img src="/assets/img/logo.png" alt="Logo" /> */}
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarCollapse"
          >
            <span className="fa fa-bars"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <div className="navbar-nav ms-auto py-0 pe-4">
              <NavLink
                to={"/home"}
                className={({ isActive, isPending }) =>
                  `nav-item nav-link ${isActive && "active"}`
                }
              >
                Home
              </NavLink>
              <NavLink
                to={"/about"}
                className={({ isActive, isPending }) =>
                  `nav-item nav-link ${isActive && "active"}`
                }
              >
                About
              </NavLink>
              <NavLink
                to={"/contact"}
                className={({ isActive, isPending }) =>
                  `nav-item nav-link ${isActive && "active"}`
                }
              >
                Contact
              </NavLink>
              <NavLink
                to={"/service"}
                className={({ isActive, isPending }) =>
                  `nav-item nav-link ${isActive && "active"}`
                }
              >
                Service
              </NavLink>
            </div>
            {!isAuthenticate ? (
              location?.pathname === "/sign-in" ? (
                <Link to="/sign-up" className="btn btn-primary py-2 px-4">
                  Sign Up
                </Link>
              ) : (
                <Link to="/sign-in" className="btn btn-primary py-2 px-4">
                  Sign In
                </Link>
              )
            ) : (
              <div className=" position-relative">
                <Link to={"/profile"}>
                  <img
                    className="border border-3 border-warning rounded-circle"
                    width={45}
                    height={45}
                    src={`${user?.avatar}`}
                    alt="Avatar"
                  />
                </Link>
                <IoIosLogOut
                  type="button"
                  size={28}
                  className="text-secondary pl-2"
                  onClick={logOut}
                />
              </div>
            )}
          </div>
        </nav>

        <div className="container-xxl py-5 bg-dark hero-header "></div>
      </div>
      {/* Navbar & Hero End */}
    </>
  );
}

export default Navbar;
