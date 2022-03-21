import React from "react";
import { dataManager } from "../dataManager";
import { useAtomValue, useUpdateAtom } from "jotai/utils";
import { STATE, userSetter } from "../state";
import { useParams, Link } from "react-router-dom";

export const Week = ({
  number,
  videoLink,
  homeworkTitle,
  consultationCallLink,
  weekId,
  mentorId,
}) => {
  const user = useAtomValue(userSetter);
  const setWeeks = useUpdateAtom(STATE.WEEKS);
  let params = useParams();

  const deleteEvent = (e) => {
    e.preventDefault();
    dataManager
      .deleteWeek(params.courseId, weekId)
      .then(() => setWeeks(params.courseId));
  };

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
              <p className="h4 courses-card-title font-weight-bold d-inline">
                Week {number} {homeworkTitle}
              </p>
              {user.role === "Mentor" && user.id === mentorId && (
                <>
                  <Link
                    className={`bi bi-pencil-square ms-3 btn-icon d-inline h4 edit-delete-btns`}
                    aria-current="page"
                    state={{ mentorId: mentorId }}
                    to={`/courses/${params.courseId}/weeks/${weekId}/edit`}
                  />
                  <i
                    className={`delete-icon bi bi-trash-fill btn-icon d-inline h4 ms-2 edit-delete-btns`}
                    onClick={(e) => deleteEvent(e)}
                  />
                </>
              )}
              <p className="card-text font-weight-bold mt-3">
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
