import React from "react";
import { Link } from "react-router-dom";
import noImgPlaceholder from "../img/NoImagePlaceholder.jpg";

export const Course = ({
  name,
  category,
  price,
  description,
  startingDate,
  mentorId,
  courseId,
}) => {
  return (
    <>
      <div className="courses-card mb-3">
        <div className="row no-gutters">
          <div className="d-inline-flex">
            <img
              src={noImgPlaceholder}
              className="card-img courses-img"
              alt="no img"
            />
            {/* <img src="Error.src" onerror="this.src='fallback-img.jpg'"/> */}
            <div className="card-body">
              <p className="h4 courses-card-title font-weight-bold">{name}</p>
              <p className="card-text h5 font-weight-bold">$ {price}</p>
              <p className="card-text font-weight-bold">
                <span className="txt-color-brown">
                  <i class="bi bi-boxes fa-lg me-1 fa-fw label-icons-signin"></i>
                  Category: {category}
                </span>
                <span className="txt-color-brown">
                  <i className="bi bi-calendar-event-fill fa-lg me-1 fa-fw label-icons-signin mx-3"></i>
                  Starting Date: {startingDate.split("T")[0]}
                </span>
              </p>
              <p className="card-text description-txt">{description}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
