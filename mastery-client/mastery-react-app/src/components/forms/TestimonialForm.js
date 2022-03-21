import React, { useState } from "react";
import { Navigate, useLocation, useParams } from "react-router-dom";
import { dataManager } from "../../dataManager";
import { ToastContainer, toast } from "react-toastify";

export const TestimonialForm = () => {
  const [redirect, setRedirect] = useState(false);
  const location = useLocation();
  const splitPath = location.pathname.split("/");
  const { mentorId } = location.state;
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
        .postTestimonial(params.courseId, {
          firstName: e.target.firstName.value,
          lastName: e.target.lastName.value,
          comment: e.target.comment.value,
          rating: e.target.rating.value,
        })
        .then((response) => {
          loader(response);
        });
    } else {
      dataManager
        .putTestimonial(params.courseId, params.testimonialId, {
          firstName: e.target.firstName.value,
          lastName: e.target.lastName.value,
          comment: e.target.comment.value,
          rating: e.target.rating.value,
        })
        .then((response) => {
          loader(response);
        });
    }
  };

  return redirect ? (
    <Navigate to={`/courses/${params.courseId}/testimonials`}  state={{ mentorId: mentorId }}></Navigate>
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
                          Testimonial
                        </p>

                        <form
                          onSubmit={handleSubmit}
                          className="row"
                          autoComplete="off"
                        >
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
                              htmlFor="comment"
                              className="form-label form-txt-labels"
                            >
                              <i className="bi bi-chat-left-dots-fill fa-lg me-1 fa-fw label-icons-signin"></i>
                              Comment
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="comment"
                              name="comment"
                              required
                            />
                          </div>
                          <div className="mb-3 col col-md-6">
                            <label
                              htmlFor="rating"
                              className="form-label form-txt-labels"
                            >
                              <i className="bi bi-star-fill fa-lg me-1 fa-fw label-icons-signin"></i>
                              Rating
                            </label>
                            <input
                              type="number"
                              step="1"
                              min="1"
                              max="5"
                              className="form-control"
                              id="rating"
                              name="rating"
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
