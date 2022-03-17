import React from "react";

export const Week = ({
  number,
  videoLink,
  homeworkTitle,
  consultationCallLink,
  weekId,
}) => {
  return (
    <>
      <div className="courses-card mb-3">
        <div className="row no-gutters">
          <div className="d-inline-flex">
            <iframe
              width="420"
              height="345"
              title={`${weekId}`}
              src={`${videoLink}`}
              className=""
            ></iframe>
            <div className="card-body">
              <p className="h4 courses-card-title font-weight-bold">
                Week {number} {homeworkTitle}
              </p>
              <p className="card-text font-weight-bold">
                <span className="txt-color-brown">
                  <i className="bi bi-camera-video-fill fa-lg me-1 fa-fw label-icons-signin"></i>
                  <a
                    href={`https://${consultationCallLink}`}
                    target="_blank"
                    rel="noreferrer"
                    className="consultation-call"
                  >
                    Consultation Call
                  </a>
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
