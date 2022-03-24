import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import noImgPlaceholder from "../img/NoImagePlaceholder.jpg";
import { useAtomValue, useUpdateAtom } from "jotai/utils";
import { STATE, userSetter, attendedCoursesSetter } from "../state";
import { dataManager } from "../dataManager";
import {
  MasteryStorage,
  getDownloadURL,
  ref,
  deleteObject,
} from "../Firebase/firebaseConfig.js";

export const Course = ({
  name,
  category,
  price,
  description,
  startingDate,
  mentorId,
  courseId,
  mentorName,
}) => {
  const user = useAtomValue(userSetter);
  const setCourses = useUpdateAtom(STATE.COURSES);
  const attendedCourses = useAtomValue(attendedCoursesSetter);
  const totalCoursesMembers = useAtomValue(STATE.COURSES_MEMBERS);
  const setTotalCoursesMembers = useUpdateAtom(STATE.COURSES_MEMBERS);

  useEffect(() => {
    let storageRef = ref(MasteryStorage, `/images/course_${courseId}`);
    getDownloadURL(storageRef).then((response) => {
      const imgElement = document.getElementById(`courseImage${courseId}`);
      imgElement.setAttribute("src", response);
    });
  }, []);

  const deleteEvent = (e) => {
    e.preventDefault();

    const storage = MasteryStorage;
    const imgRef = ref(storage, `/images/course_${courseId}`);
    deleteObject(imgRef)
      .then(() => {
        dataManager.deleteCourse(courseId).then(() => {
          setCourses();
          setTotalCoursesMembers();
        });
      })
      .catch((error) => {
        console.log(error);
        dataManager.deleteCourse(courseId).then(() => {
          setCourses();
          setTotalCoursesMembers();
        });
      });
  };

  const leaveCourse = (e) => {
    e.preventDefault();
    dataManager.leaveCourse(courseId).then(() => {
      setCourses();
      setTotalCoursesMembers();
    });
  };

  return (
    <>
      <div className="courses-card mb-3">
        <div className="row no-gutters">
          <div className="d-inline-flex">
            <img
              src={noImgPlaceholder}
              className="card-img courses-img"
              alt={name}
              id={`courseImage${courseId}`}
            />
            <div className="card-body">
              <p className="h4 courses-card-title font-weight-bold d-inline">
                {name}
              </p>
              {user.id === mentorId && (
                <>
                  <Link
                    className={`bi bi-pencil-square ms-3 btn-icon d-inline h4 edit-delete-btns`}
                    aria-current="page"
                    to={`/courses/${courseId}/edit`}
                  />
                  <i
                    className={`delete-icon bi bi-trash-fill btn-icon d-inline h4 ms-2 edit-delete-btns`}
                    onClick={(e) => deleteEvent(e)}
                  />
                </>
              )}
              <p className="card-text h5 font-weight-bold mt-3">
                <span className="bi bi-person-badge margin-right-icon">
                  {" "}
                  {mentorName}
                </span>
                <i className="bi bi-people-fill"></i>{" "}
                {totalCoursesMembers.map(
                  (o) => o.courseId === courseId && o.totalCourseClients
                )}
                <span className="ms-4">$ {price} </span>
              </p>
              <p className="card-text font-weight-bold">
                <span className="txt-color-brown">
                  <i className="bi bi-boxes fa-lg me-1 fa-fw label-icons-signin"></i>
                  Category: {category}
                </span>
                <span className="txt-color-brown">
                  <i className="bi bi-calendar-event-fill fa-lg me-1 fa-fw label-icons-signin mx-3"></i>
                  Starting Date: {startingDate.split("T")[0]}
                </span>
              </p>
              <p className="card-text description-txt">{description}</p>
              {user.id === mentorId && (
                <>
                  <Link
                    to={`/courses/${courseId}/weeks`}
                    state={{ mentorId: mentorId }}
                    className="btn nav-btn"
                  >
                    Weeks
                  </Link>
                  <Link
                    to={`/courses/${courseId}/weeks/add`}
                    state={{ mentorId: mentorId }}
                    className="btn nav-btn add-btns"
                  >
                    +
                  </Link>
                  <Link
                    to={`/courses/${courseId}/testimonials`}
                    state={{ mentorId: mentorId }}
                    className="btn nav-btn"
                  >
                    Testimonials
                  </Link>
                  <Link
                    to={`/courses/${courseId}/testimonials/add`}
                    state={{ mentorId: mentorId }}
                    className="btn nav-btn add-week-testimonial-btns"
                  >
                    +
                  </Link>
                </>
              )}
              {user.id !== mentorId && user.role === "Mentor" && (
                <>
                  <Link
                    to={`/courses/${courseId}/testimonials`}
                    state={{ mentorId: mentorId }}
                    className="btn nav-btn"
                  >
                    Testimonials
                  </Link>
                </>
              )}
              {user.role === "Client" &&
                (!attendedCourses.includes(courseId) ? (
                  <>
                    <Link
                      to={`/courses/${courseId}/testimonials`}
                      state={{ mentorId: mentorId }}
                      className="btn nav-btn"
                    >
                      Testimonials
                    </Link>
                    <Link
                      to={`/courses/${courseId}/clients`}
                      className="btn nav-btn"
                    >
                      Join
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      to={`/courses/${courseId}/weeks`}
                      state={{ mentorId: mentorId }}
                      className="btn nav-btn"
                    >
                      Weeks
                    </Link>
                    <Link
                      to={`/courses/${courseId}/testimonials`}
                      state={{ mentorId: mentorId }}
                      className="btn nav-btn"
                    >
                      Testimonials
                    </Link>
                    <div
                      className="btn nav-btn"
                      onClick={(e) => leaveCourse(e)}
                    >
                      Leave
                    </div>
                  </>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
