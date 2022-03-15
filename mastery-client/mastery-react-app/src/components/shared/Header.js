import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { userSetter } from "../../state";
import { dataManager } from "../../dataManager";

export const Header = () => {
  const [user, setUser] = useAtom(userSetter);
  const navigate = useNavigate();

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

  const getUserEvent = async (e) => {
    e.preventDefault();
    await dataManager.getUser().then((response) => {
      console.log(response);
    });
  };

  return (
    <header className="navbar navbar-expand-lg navbar-light bg-light nav-bg-color">
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
                className="nav-link active nav-btn"
                aria-current="page"
                to="/"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link nav-btn" to="/posts">
                Posts
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav mb-2 mb-lg-0">
            {user &&
            Object.keys(user).length === 0 &&
            Object.getPrototypeOf(user) === Object.prototype ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link nav-btn" to="/register">
                    Sign Up
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link nav-btn" to="/login">
                    Sign In
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item navbar-text">{user.email}</li>
                <li className="nav-item">
                  <button className="" onClick={(e) => logoutEvent(e)}>
                    Logout
                  </button>
                </li>
                <li className="nav-item">
                  <button className="" onClick={(e) => getUserEvent(e)}>
                    GetUser
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
