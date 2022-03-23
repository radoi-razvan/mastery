import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { dataManager } from "../../dataManager";
import { ToastContainer, toast } from "react-toastify";

export const Register = () => {
  const [redirect, setRedirect] = useState(false);
  const invalidOperationNotification = () => {
    toast.error(
      `Password requires unique character, non alphanumeric, lower case, upper case, digit and minimum length of 6!`,
      {
        position: toast.POSITION.BOTTOM_RIGHT,
      }
    );
  };
  const unmatchedPasswordsNotification = () => {
    toast.error("Passwords don't match!", {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const loader = (response) => {
      if (typeof response !== "undefined" && response.status === 201) {
        setRedirect(true);
      } else {
        invalidOperationNotification();
      }
    };

    if (e.target.password.value === e.target.repeatPassword.value) {
      dataManager
        .postRegister({
          firstName: e.target.firstName.value,
          lastName: e.target.lastName.value,
          email: e.target.email.value,
          password: e.target.password.value,
          role: e.target.role.value,
          country: e.target.country.value,
          city: e.target.city.value,
          phoneNumber: e.target.phoneNumber.value,
        })
        .then((response) => {
          loader(response);
        });
    } else {
      unmatchedPasswordsNotification();
    }
  };

  return redirect ? (
    <Navigate to="/login"></Navigate>
  ) : (
    <>
      <ToastContainer />
      <div className="card register-card-margin">
        <div className="container">
          <section>
            <div className="row d-flex justify-content-center align-items-center">
              <div className="col-lg-10 col-xl-10">
                <div className="text-black">
                  <div>
                    <div className="row justify-content-center">
                      <div>
                        <p className="text-center h1 fw-bold mb-2 mx-1 mx-md-4 mt-4 txt-main-color form-txt-color">
                          Register
                        </p>

                        <form onSubmit={handleSubmit} className="row">
                          <div className="mb-3 col col-md-6">
                            <label
                              htmlFor="firstName"
                              className="form-label form-txt-labels"
                            >
                              <i className="bi bi-person-fill fa-lg me-1 fa-fw label-icons-signin"></i>
                              First Name
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="firstName"
                              name="firstName"
                              required
                            />
                          </div>
                          <div className="mb-3 col col-md-6">
                            <label
                              htmlFor="lastName"
                              className="form-label form-txt-labels"
                            >
                              <i className="bi bi-person-fill fa-lg me-1 fa-fw label-icons-signin"></i>
                              Last Name
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="lastName"
                              name="lastName"
                              required
                            />
                          </div>
                          <div className="mb-3 col col-md-6">
                            <label
                              htmlFor="country"
                              className="form-label form-txt-labels"
                            >
                              <i className="bi bi-geo-alt-fill fa-lg me-1 fa-fw label-icons-signin"></i>
                              Country
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="country"
                              name="country"
                              required
                            />
                          </div>
                          <div className="mb-3 col col-md-6">
                            <label
                              htmlFor="city"
                              className="form-label form-txt-labels"
                            >
                              <i className="bi bi-pin-map-fill fa-lg me-1 fa-fw label-icons-signin"></i>
                              City
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="city"
                              name="city"
                              required
                            />
                          </div>
                          <div className="mb-3 col col-md-6">
                            <label
                              htmlFor="phoneNumber"
                              className="form-label form-txt-labels"
                            >
                              <i className="bi bi-phone-fill fa-lg me-1 fa-fw label-icons-signin"></i>
                              Phone Number
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="phoneNumber"
                              name="phoneNumber"
                              required
                            />
                          </div>
                          <div className="mb-3 col col-md-6">
                            <label
                              htmlFor="role"
                              className="form-label form-txt-labels"
                            >
                              <i className="bi bi-person-badge fa-lg me-1 fa-fw label-icons-signin"></i>
                              Role
                            </label>
                            <select
                              type="text"
                              className="form-control"
                              id="role"
                              name="role"
                              required
                            >
                              <option value="Mentor"> Mentor </option>
                              <option value="Client"> Client </option>
                            </select>
                          </div>
                          <div className="mb-3 col col-md-6">
                            <label
                              htmlFor="email"
                              className="form-label form-txt-labels"
                            >
                              <i className="bi bi-envelope-fill fa-lg me-1 fa-fw label-icons-signin"></i>
                              Email
                            </label>
                            <input
                              type="email"
                              className="form-control"
                              id="email"
                              name="email"
                              required
                            />
                          </div>
                          <div className="mb-3 col col-md-6">
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
                          <div className="mb-3 col col-md-6">
                            <label
                              htmlFor="repeatPassword"
                              className="form-label form-txt-labels"
                            >
                              <i className="bi bi-key-fill fa-lg me-1 fa-fw label-icons-signin"></i>
                              Repeat Password
                            </label>
                            <input
                              type="password"
                              className="form-control"
                              id="repeatPassword"
                              name="repeatPassword"
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
