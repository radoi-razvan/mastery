import React, { useState } from "react";
import { Navigate, useLocation, useParams } from "react-router-dom";
import { dataManager } from "../../dataManager";
import { ToastContainer, toast } from "react-toastify";

export const CourseForm = () => {
  const [redirect, setRedirect] = useState(false);
  const location = useLocation();
  const splitPath = location.pathname.split("/");
  let params = useParams();

  const operationFailedNotification = () => {
    toast.error("Operation failed! Please try again.", {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const loader = (response) => {
      if (
        typeof response !== "undefined" &&
        (response.status === 201 || response.status === 204)
      ) {
        setRedirect(true);
      } else {
        operationFailedNotification();
      }
    };

    if (splitPath[splitPath.length - 1] === "add") {
      dataManager
        .postCourse({
          name: e.target.name.value,
          category: e.target.category.value,
          price: e.target.price.value,
          description: e.target.description.value,
          startingDate: e.target.startingDate.value,
        })
        .then((response) => {
          loader(response);
        });
    } else {
      dataManager
        .putCourse(params.courseId, {
          name: e.target.name.value,
          category: e.target.category.value,
          price: e.target.price.value,
          description: e.target.description.value,
          startingDate: e.target.startingDate.value,
        })
        .then((response) => {
          loader(response);
        });
    }
  };

  return redirect ? (
    <Navigate to="/courses"></Navigate>
  ) : (
    <>
      <ToastContainer />
      <div className="card">
        <div className="container">
          <section>
            <div className="row d-flex justify-content-center align-items-center">
              <div className="col-lg-10 col-xl-10">
                <div className="text-black">
                  <div>
                    <div className="row justify-content-center">
                      <div>
                        <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4 txt-main-color form-txt-color">
                          {splitPath[splitPath.length - 1] === "add"
                            ? "Add"
                            : "Edit"}{" "}
                          Course
                        </p>

                        <form
                          onSubmit={handleSubmit}
                          className="row"
                          autoComplete="off"
                        >
                          <div className="mb-3 col col-md-6">
                            <label
                              htmlFor="name"
                              className="form-label form-txt-labels"
                            >
                              <i className="bi bi-tags-fill fa-lg me-1 fa-fw label-icons-signin"></i>
                              Name
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="name"
                              name="name"
                              required
                            />
                          </div>
                          <div className="mb-3 col col-md-6">
                            <label
                              htmlFor="category"
                              className="form-label form-txt-labels"
                            >
                              <i className="bi bi-boxes fa-lg me-1 fa-fw label-icons-signin"></i>
                              Category
                            </label>
                            <select
                              type="text"
                              className="form-control"
                              id="category"
                              name="category"
                              required
                            >
                              <option value="Business"> Business </option>
                              <option value="Self-Help"> Self-Help </option>
                            </select>
                          </div>
                          <div className="mb-3 col col-md-6">
                            <label
                              htmlFor="price"
                              className="form-label form-txt-labels"
                            >
                              <i className="bi bi-currency-dollar fa-lg me-1 fa-fw label-icons-signin"></i>
                              Price
                            </label>
                            <input
                              type="number"
                              step=".01"
                              min="1"
                              className="form-control"
                              id="price"
                              name="price"
                              required
                            />
                          </div>
                          <div className="mb-3 col col-md-6">
                            <label
                              htmlFor="description"
                              className="form-label form-txt-labels"
                            >
                              <i className="bi bi-info-square-fill fa-lg me-1 fa-fw label-icons-signin"></i>
                              Description
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="description"
                              name="description"
                              required
                            />
                          </div>
                          <div className="mb-3 col col-md-6">
                            <label
                              htmlFor="startingDate"
                              className="form-label form-txt-labels"
                            >
                              <i className="bi bi-calendar-event-fill fa-lg me-1 fa-fw label-icons-signin"></i>
                              Starting Date
                            </label>
                            <input
                              type="date"
                              className="form-control"
                              id="startingDate"
                              name="startingDate"
                              required
                            />
                          </div>
                          <div className="d-flex justify-content-center">
                            <button
                              type="submit"
                              className="btn btn-primary btn-main-color btn-lg form-btn"
                            >
                              {splitPath[splitPath.length - 1] === "add"
                                ? "Add"
                                : "Edit"}
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
