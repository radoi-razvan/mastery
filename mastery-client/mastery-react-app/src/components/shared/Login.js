import React, { useState } from "react";
import { useAtom } from "jotai";
import { Navigate } from "react-router-dom";
import { userSetter } from "../../state";
import { dataManager } from "../../dataManager";

export const Login = () => {
  const [, setUser] = useAtom(userSetter);
  const [redirect, setRedirect] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const loader = (response) => {
      const warningIcon = document.getElementById("warningIcon");
      const warningText = document.getElementById("warningText");

      if (typeof response !== "undefined" && response.status === 200) {
        setUser();
        setRedirect(true);
      } else {
        warningIcon.classList.remove("forms-warnings-hide");
        warningText.classList.remove("forms-warnings-hide");
      }
    };

    dataManager
      .postLogin({
        email: e.target.email.value,
        password: e.target.password.value,
      })
      .then((response) => {
        loader(response);
      });
  };

  return redirect ? (
    <Navigate to="/"></Navigate>
  ) : (
    <>
      <div className="card">
        <div className="card-container">
          <section>
            <div className="row d-flex justify-content-center align-items-center">
              <div className="col-lg-6 col-xl-6">
                <div className="text-black">
                  <div>
                    <div className="row justify-content-center">
                      <div>
                        <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4 txt-main-color form-txt-color">
                          Login
                        </p>
                        <form onSubmit={handleSubmit}>
                          <div className="mb-3">
                            <label htmlFor="email" className="form-txt-labels">
                              <i className="bi bi-envelope-fill fa-lg me-1 fa-fw label-icons-signin"></i>
                              Email
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="email"
                              name="email"
                              required
                            />
                          </div>
                          <div className="mb-3">
                            <label
                              htmlFor="password"
                              className="form-label form-txt-labels"
                            >
                              <i className="bi bi-lock-fill fa-lg me-1 fa-fw label-icons-signin"></i>
                              Password
                            </label>
                            <input
                              type="password"
                              className="form-control"
                              id="password"
                              name="password"
                              required
                            />
                          </div>
                          <div className="mb-3">
                            <div
                              className="form-outline flex-fill mb-0 forms-warnings-hide"
                              id="warningText"
                            >
                              <div className="form-label form-txt-labels">
                                <i
                                  className="bi-exclamation-triangle-fill fa-lg me-1 fa-fw label-icons-signin text-danger forms-warnings-hide"
                                  id="warningIcon"
                                ></i>
                                <span className="text-danger font-weight-bold">
                                  Unauthorized operation
                                </span>
                              </div>
                              <span className="form-control text-danger font-weight-bold">
                                Invalid credentials!
                              </span>
                            </div>
                          </div>

                          <div className="d-flex justify-content-center">
                            <button
                              type="submit"
                              className="btn btn-primary btn-main-color btn-lg form-btn"
                            >
                              Submit
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};
