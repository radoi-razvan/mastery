import React from "react";

export const Testimonial = ({
  firstName,
  lastName,
  comment,
  rating,
  testimonialId,
}) => {
  return (
    <>
      <div className="courses-card mb-3">
        <div className="row no-gutters">
          <div className="d-inline-flex">
            <div className="card-body">
              <p className="h4 courses-card-title font-weight-bold">
                {firstName} {lastName}
              </p>
              <p className="card-text font-weight-bold">
                <span className="txt-color-brown">
                  {Array.from({ length: rating }, (_, index) => (
                    <i
                      key={index}
                      className="bi bi-star-fill fa-lg me-1 fa-fw label-icons-signin"
                    ></i>
                  ))}
                </span>
              </p>
              <p className="card-text description-txt h4">
                <i>
                  <q>{comment}</q>
                </i>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
