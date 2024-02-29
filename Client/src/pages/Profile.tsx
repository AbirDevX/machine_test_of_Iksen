import { GiShoppingCart, GiStabbedNote } from "react-icons/gi";
import { ImProfile } from "react-icons/im";
import { IoFastFoodSharp } from "react-icons/io5";
import { MdVerified } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "../hooks/hooks";
import Styles from "../styles/profile.module.css";

function Profile() {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <div className="container rounded bg-white mt-5 mb-5">
      <div className="row">
        <div className="col-md-3 border-right">
          <aside className={Styles["user-info-wrapper"]}>
            <div
              className={Styles["user-cover"]}
              style={{
                backgroundImage: "url(https://bootdey.com/img/Content/bg1.jpg)",
              }}
            ></div>
            <div className={Styles["user-info"]}>
              <label htmlFor="profile_img">
                <div className={Styles["user-avatar"]}>
                  <img
                    className="border border-3 border-warning rounded-circle position-relative"
                    src={`${user?.avatar}`}
                    alt="User"
                  />
                </div>
              </label>

              <div className={Styles["user-data"]}>
                <h4>
                  {" "}
                  <span
                    className="fw-bolder text-capitalize"
                    style={{ color: "black", fontSize: "16px" }}
                  >
                    <span className="d-flex gap-1 align-items-center">
                      <span style={{ color: "black" }}>{user?.name} </span>
                      <MdVerified
                        size={20}
                        color="blue"
                        className="rounded-3 inline"
                      />
                    </span>
                  </span>
                </h4>
                <span
                  className="fw-bolder text-black-50"
                  style={{ fontSize: "10px" }}
                >
                  Joined{" "}
                  {user?.createdAt && new Date(user?.createdAt).toDateString()}
                </span>
                <span
                  className=" d-flex justify-content-around fw-bold text-success"
                  style={{ fontSize: "12px" }}
                >
                  <MdVerified style={{ margin: "auto" }} />{" "}
                  <span className=" text-success">{user?.email}</span>
                </span>
              </div>
            </div>
          </aside>
          <nav className={Styles["list-group"]}>
            <NavLink
              className={({ isActive }) =>
                `${Styles["list-group-item"]} ${isActive && "text-white"}`
              }
              style={{ backgroundColor: "#682773" }}
              to="/profile"
            >
              <ImProfile size={20} style={{ marginRight: "6Px" }} />
              Profile
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `${Styles["list-group-item"]} ${
                  isActive && "bg-primary text-white"
                }`
              }
              style={{ color: "#682773" }}
              to="/about"
            >
              <GiShoppingCart
                color="#682773"
                size={20}
                className="fw-bolder"
                style={{ marginRight: "6Px" }}
              />
              About
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `${Styles["list-group-item"]} ${
                  isActive && "bg-primary text-white"
                }`
              }
              style={{ color: "#682773" }}
              to="/service"
            >
              <IoFastFoodSharp
                color="#682773"
                size={20}
                style={{ marginRight: "6Px" }}
              />
              Service
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `${Styles["list-group-item"]} ${
                  isActive && "bg-primary text-white"
                }`
              }
              style={{ color: "#682773" }}
              to="/contact"
            >
              <GiStabbedNote
                color="#682773"
                size={20}
                style={{ marginRight: "6Px" }}
              />
              Contact
            </NavLink>
          </nav>
        </div>
        {/* USER DETAILS FROM START */}
        <div className="col-md-5 border-right">
          <form onSubmit={() => {}}>
            <div className="p-3 py-5">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="text-right">Profile Settings</h4>
              </div>
              <div className="col-md-12">
                <label className="labels">UserName</label>
                <input
                  type="text"
                  className={`form-control `}
                  placeholder="Enter your email"
                  value={user?.userName}
                />
                <span
                  className="text-danger fw-bold"
                  style={{ fontSize: "12px" }}
                ></span>
              </div>
              <div className="col-md-12">
                <label className="labels">Email ID</label>
                <input
                  type="text"
                  className={`form-control `}
                  placeholder="Enter your email"
                  value={user?.email}
                />
                <span
                  className="text-danger fw-bold"
                  style={{ fontSize: "12px" }}
                ></span>
              </div>
              <div className="row mt-3">
                <div className="col-md-12">
                  <label className="labels">Mobile Number</label>
                  <input
                    type="text"
                    className={`form-control `}
                    placeholder="Enter phone mobile no"
                    value={user?.mobile}
                  />
                  <span
                    className="text-danger fw-bold"
                    style={{ fontSize: "12px" }}
                  ></span>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Profile;
