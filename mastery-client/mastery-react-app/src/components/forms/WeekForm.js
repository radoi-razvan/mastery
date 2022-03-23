import React, { useState } from "react";
import { Navigate, useLocation, useParams } from "react-router-dom";
import { dataManager } from "../../dataManager";
import { ToastContainer, toast } from "react-toastify";

export const WeekForm = () => {
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
        .postWeek(params.courseId, {
          file: e.target.file.files[0],
          number: e.target.number.value,
          videoLink: e.target.videoLink.value,
          homeworkTitle: e.target.homeworkTitle.value,
          consultationCallLink: e.target.consultationCallLink.value,
        })
        .then((response) => {
          loader(response);
        });
    } else {
      dataManager
        .putWeek(params.courseId, params.weekId, {
          file: e.target.file.files[0],
          number: e.target.number.value,
          videoLink: e.target.videoLink.value,
          homeworkTitle: e.target.homeworkTitle.value,
          consultationCallLink: e.target.consultationCallLink.value,
        })
        .then((response) => {
          loader(response);
        });
    }
  };

  return redirect ? (
    <Navigate
      to={`/courses/${params.courseId}/weeks`}
      state={{ mentorId: mentorId }}
    ></Navigate>
  ) : (
    <>
      <ToastContainer />
      <div className="card add-week-form-width">
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
                          Week
                        </p>

                        <form
                          onSubmit={handleSubmit}
                          className="row"
                          autoComplete="off"
                        >
                          <div className="mb-3 col col-md-6">
                            <label
                              htmlFor="number"
                              className="form-label form-txt-labels"
                            >
                              <i className="bi bi-diagram-3-fill fa-lg me-1 fa-fw label-icons-signin"></i>
                              Number
                            </label>
                            <input
                              type="number"
                              step="1"
                              min="1"
                              className="form-control"
                              id="number"
                              name="number"
                              required
                            />
                          </div>
                          <div className="mb-3 col col-md-6">
                            <label
                              htmlFor="homeworkTitle"
                              className="form-label form-txt-labels"
                            >
                              <i className="bi bi-easel2-fill fa-lg me-1 fa-fw label-icons-signin"></i>
                              Homework Title
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="homeworkTitle"
                              name="homeworkTitle"
                              required
                            />
                          </div>
                          <div className="mb-3 col col-md-6">
                            <label
                              htmlFor="videoLink"
                              className="form-label form-txt-labels"
                            >
                              <i className="bi bi-youtube fa-lg me-1 fa-fw label-icons-signin"></i>
                              Curriculum URL
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="videoLink"
                              name="videoLink"
                              required
                            />
                          </div>
                          <div className="mb-3 col col-md-6">
                            <label
                              htmlFor="consultationCallLink"
                              className="form-label form-txt-labels"
                            >
                              <i className="bi bi-camera-video-fill fa-lg me-1 fa-fw label-icons-signin"></i>
                              Consultation Call URL
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="consultationCallLink"
                              name="consultationCallLink"
                              required
                            />
                          </div>
                          <div className="mb-3 col col-md-6">
                            <label
                              htmlFor="file"
                              className="form-label form-txt-labels"
                            >
                              <i className="bi bi-file-pdf-fill fa-lg me-1 fa-fw label-icons-signin"></i>
                              Homework .pdf
                            </label>
                            <input
                              type="file"
                              className="form-control" 
                              accept="application/pdf"                           
                              id="file"
                              name="file"
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
