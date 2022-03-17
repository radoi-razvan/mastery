import React, { useEffect } from "react";
import { Course } from "../Course";
import { STATE } from "../../state";
import { useAtom } from "jotai";


export const Courses = () => {
  const [courses, setCourses] = useAtom(STATE.COURSES);

  useEffect(() => {
    setCourses();
  }, []);

  return (
    <>
      {courses.length ? (
        <div className="container-margin-top">
            {courses.map((course, index) => (
              <Course
                name={course.name}
                category={course.category}
                price={course.price}
                description={course.description}
                startingDate={course.startingDate}
                mentorId={course.mentorId}
                courseId={course.courseId}
                key={index}
              />
            ))}
          </div>
      ) : (
        <div className="card">
          <div className="card-container">
            <p className="text-center h3 fw-bold mb-5 mx-1 mx-md-4 mt-4 txt-main-color form-txt-color">
              There are no courses
            </p>
          </div>
        </div>
      )}
    </>
  );
};