import React from "react";
import { dataManager } from "../dataManager";
import { useAtomValue, useUpdateAtom } from "jotai/utils";
import { STATE, userSetter } from "../state";
import { useParams, Link } from "react-router-dom";

export const Testimonial = ({
  firstName,
  lastName,
  comment,
  rating,
  testimonialId,
  mentorId,
}) => {
  const user = useAtomValue(userSetter);
  const setTestimonials = useUpdateAtom(STATE.TESTIMONIALS);
  let params = useParams();

  const deleteEvent = (e) => {
    e.preventDefault();
    dataManager
      .deleteTestimonial(params.courseId, testimonialId)
      .then(() => setTestimonials(params.courseId));
  };

  return (
    <>
      <div className="courses-card mb-3">
        <div className="row no-gutters">
          <div className="d-inline-flex">
            <div className="card-body">
              <p className="h4 courses-card-title font-weight-bold d-inline">
                {firstName} {lastName}
              </p>
              {user.role === "Mentor" && user.id === mentorId && (
                <>
                  <Link
                    className={`bi bi-pencil-square ms-3 btn-icon d-inline h4 edit-delete-btns`}
                    aria-current="page"
                    state={{ mentorId: mentorId }}
                    to={`/courses/${params.courseId}/testimonials/${testimonialId}/edit`}
                  />
                  <i
                    className={`delete-icon bi bi-trash-fill btn-icon d-inline h4 ms-2 edit-delete-btns`}
                    onClick={(e) => deleteEvent(e)}
                  />
                </>
              )}
              <p className="card-text font-weight-bold mt-3">
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
