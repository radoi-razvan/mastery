import React, { useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAtom } from "jotai";
import { userSetter } from "../../state";
import { dataManager } from "../../dataManager";

export const Header = () => {
  const [user, setUser] = useAtom(userSetter);
  const navigate = useNavigate();

  const location = useLocation();
  //Destructuring pathname from location
  const { pathname } = location;
  //Get the name of the path in array
  const splitLocation = pathname.split("/");

  useEffect(() => {
    setUser();
  }, []);

  const logoutEvent = async (e) => {
    e.preventDefault();

    const loader = (response) => {
      if (response.error) {
        console.log(response.error);
      } else {
        setUser();
        navigate("/");
      }
    };

    await dataManager.postLogout().then((response) => {
      loader(response);
    });
  };

  return (
    <header className="navbar navbar-expand-lg navbar-light bg-light nav-bg-color header-height">
      <div className="container">
        <Link className="navbar-brand app-logo" to="/">
          MASTERY
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <nav className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className={`nav-link active ${
                  splitLocation[1] === "" ? "active-nav-btns" : ""
                } nav-btn`}
                aria-current="page"
                to="/"
              >
                Home
              </Link>
            </li>
            {user &&
            Object.keys(user).length === 0 &&
            Object.getPrototypeOf(user) === Object.prototype ? (
              ""
            ) : user.role === "Mentor" ? (
              <>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${
                      (splitLocation[1] === "courses" &&
                        splitLocation.length === 2) ||
                      (splitLocation[1] === "courses" &&
                        location.pathname !== "/courses/add" &&
                        location.pathname !== "/courses/clients/details")
                        ? "active-nav-btns"
                        : ""
                    } nav-btn`}
                    to="/courses"
                  >
                    Courses
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link active ${
                      location.pathname === "/courses/add"
                        ? "active-nav-btns"
                        : ""
                    } nav-btn`}
                    aria-current="page"
                    to="/courses/add"
                  >
                    Add Course
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link active ${
                      location.pathname === "/courses/clients/details"
                        ? "active-nav-btns"
                        : ""
                    } nav-btn`}
                    aria-current="page"
                    to="/courses/clients/details"
                  >
                    Clients
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${
                      (splitLocation[1] === "courses" &&
                        splitLocation.length === 2) ||
                      (splitLocation[1] === "courses" &&
                        location.pathname !== "/courses/add")
                        ? "active-nav-btns"
                        : ""
                    } nav-btn`}
                    to="/courses"
                  >
                    Courses
                  </Link>
                </li>
              </>
            )}
          </ul>
          <ul className="navbar-nav mb-2 mb-lg-0">
            {user &&
            Object.keys(user).length === 0 &&
            Object.getPrototypeOf(user) === Object.prototype ? (
              <>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${
                      splitLocation[1] === "register" ? "active-nav-btns" : ""
                    } nav-btn`}
                    to="/register"
                  >
                    Sign Up
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${
                      splitLocation[1] === "login" ? "active-nav-btns" : ""
                    } nav-btn`}
                    to="/login"
                  >
                    Sign In
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <div className="nav-link user-email">{user.email}</div>
                </li>
                <li className="nav-item">
                  <button
                    className="nav-link nav-btn"
                    onClick={(e) => logoutEvent(e)}
                  >
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};
