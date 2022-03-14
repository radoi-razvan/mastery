import React, { useState } from "react";
import { useAtom } from "jotai";
import { Navigate } from "react-router-dom";
import { userSetter } from "../../state";
import { dataManager } from "../../dataManager";

export const Login = () => {
  const [, setUser] = useAtom(userSetter);
  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    const loader = (response) => {
      if (response.error) {
        setError(response.error);
      } else {
        setUser();
        setRedirect(true);
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
      {error && (
        <div className="card">
          <div className="container">
            <div
              className="alert alert-danger alert-dismissible fade show"
              role="alert"
            >
              <strong>Error: </strong> {error}
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="alert"
                aria-label="Close"
              ></button>
            </div>
          </div>
        </div>
      )}

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
                              <label htmlFor="password" className="form-label form-txt-labels">
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
