import React, { useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { dataManager } from "../../dataManager";
import { ToastContainer, toast } from "react-toastify";

export const JoinCourseForm = () => {
  const [redirect, setRedirect] = useState(false);
  let params = useParams();
  const operationFailedNotification = () => {
    toast.error("Operation failed! Please try again.", {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const loader = (response) => {
      if (typeof response !== "undefined" && response.status === 201) {
        setRedirect(true);
      } else {
        operationFailedNotification();
      }
    };

    dataManager
      .joinCourse(params.courseId, {
        lastYearIncomeRange: e.target.lastYearIncomeRange.value,
        jobTitle: e.target.jobTitle.value,
      })
      .then((response) => {
        loader(response);
      });
  };

  return redirect ? (
    <Navigate to="/courses"></Navigate>
  ) : (
    <>
      <ToastContainer />
      <div className="card join-course-form-width">
        <div className="container">
          <section>
            <div className="row d-flex justify-content-center align-items-center">
              <div className="col-lg-10 col-xl-10">
                <div className="text-black">
                  <div>
                    <div className="row justify-content-center">
                      <div>
                        <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4 txt-main-color form-txt-color">
                          Join Course
                        </p>

                        <form onSubmit={handleSubmit} className="row">
                          <div className="mb-3 col col-md-6">
                            <label
                              htmlFor="lastYearIncomeRange"
                              className="form-label form-txt-labels"
                            >
                              <i className="bi bi-person-badge fa-lg me-1 fa-fw label-icons-signin"></i>
                              Last Year Income Range
                            </label>
                            <select
                              type="text"
                              className="form-control"
                              id="lastYearIncomeRange"
                              name="lastYearIncomeRange"
                              required
                            >
                              <option value="$0 - $40.000"> $0 - $40.000 </option>
                              <option value="$40.001 - $60.000"> $40.001 - $60.000 </option>
                              <option value="$60.001 - $80.000"> $60.001 - $80.000 </option>
                              <option value="$80.001 - $100.000"> $80.001 - $100.000 </option>
                              <option value="$100.001 - $200.000"> $100.001 - $200.000 </option>
                              <option value="$200.001 - $400.000"> $200.001 - $400.000 </option>
                              <option value="$400.001 - $1M"> $400.001 - $1M </option>
                              <option value="$1M - $5M"> $1M - $5M </option>
                              <option value="$5M+"> $5M+ </option>
                            </select>
                          </div>
                          <div className="mb-3 col col-md-6">
                            <label
                              htmlFor="jobTitle"
                              className="form-label form-txt-labels"
                            >
                              <i className="bi bi-person-fill fa-lg me-1 fa-fw label-icons-signin"></i>
                              Current Job Title
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="jobTitle"
                              name="jobTitle"
                              required
                            />
                          </div>
                          <div className="d-flex justify-content-center">
                            <button
                              type="submit"
                              className="btn btn-primary btn-main-color btn-lg form-btn"
                            >
                              Join
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
