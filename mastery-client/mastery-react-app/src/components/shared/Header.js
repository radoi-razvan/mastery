import React from "react";
import { Link, useLinkClickHandler } from "react-router-dom";
import { useAtom } from "jotai";
import { state } from "../../state";
import { dataManager } from "../../dataManager";

export const Header = () => {
  const [user] = useAtom(state.user);

  const logoutEvent = async (e) => {
    e.preventDefault();
    await dataManager.postLogout(user.token).then((response) => {
      console.log(response);
      console.log(response.data);
    });
  };

  return (
    <header className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">
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
              <Link className="nav-link active" aria-current="page" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/posts">
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
                  <Link className="nav-link" to="/register">
                    Register
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item navbar-text">{user.email}</li>
                <li className="nav-item">
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to="/logout"
                  >
                    Logout
                  </Link>
                </li>
                <button className="text-danger" onClick={(e) => logoutEvent(e)}>
                  logout test
                </button>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};
