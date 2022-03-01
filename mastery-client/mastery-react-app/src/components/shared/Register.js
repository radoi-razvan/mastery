import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { dataManager } from "../../dataManager";

export const Register = () => {
  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    const loader = (response) => {
      if (response.error) {
        setError(response.error);
      } else {
        setRedirect(true);
      }
    };

    dataManager
      .postRegister({
        firstName: e.target.firstName.value,
        lastName: e.target.lastName.value,
        email: e.target.email.value,
        password: e.target.password.value,
        role: e.target.role.value,
        addressTest: e.target.addressTest.value,
        testField: e.target.testField.value,
        phoneNumber: e.target.phoneNumber.value,
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
      )}
      <section className="input-form">
        <div className="container">
          <div className="row d-flex justify-content-center align-items-center">
            <div className="col-lg-6 col-xl-6">
              <div className="text-black card">
                <div>
                  <div className="row justify-content-center">
                    <div>
                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4 txt-main-color">
                        Register
                      </p>

                      <form onSubmit={handleSubmit} className="row">
                        
                        <div className="mb-3 col col-md-6">
                          <label htmlFor="firstName" className="form-label">
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
                          <label htmlFor="lastName" className="form-label">
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
                          <label htmlFor="email" className="form-label">
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
                          <label htmlFor="password" className="form-label">
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
                          <label htmlFor="role" className="form-label">
                            Role
                          </label>
                          <select
                            type="text"
                            className="form-control"
                            id="role"
                            name="role"
                            required
                          >
                            <option value="Admin"> Admin </option>
                            <option value="Client"> Client </option>
                          </select>
                        </div>
                        <div className="mb-3 col col-md-6">
                          <label htmlFor="addressTest" className="form-label">
                            Address Test
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="addressTest"
                            name="addressTest"
                            required
                          />
                        </div>
                        <div className="mb-3 col col-md-6">
                          <label htmlFor="testField" className="form-label">
                            Test Field
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="testField"
                            name="testField"
                            required
                          />
                        </div>
                        <div className="mb-3 col col-md-6">
                          <label htmlFor="phoneNumber" className="form-label">
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
                        <div className="d-flex justify-content-center">
                          <button
                            type="submit"
                            className="btn btn-primary btn-main-color btn-lg"
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
        </div>
      </section>
    </>
  );
};
