import React, { useState } from "react";
import { useAtom } from "jotai";
import { Navigate } from "react-router-dom";
import { state } from "../../state";
import { dataManager, setAccesToken } from "../../dataManager";

export const Login = () => {
  const [, setUser] = useAtom(state.user);
  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    const loader = (response) => {
      if (response.error) {
        setError(response.error);
      } else {
        setUser(response.data);
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
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
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
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </>
  );
};
