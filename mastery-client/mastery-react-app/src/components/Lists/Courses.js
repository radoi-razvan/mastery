import React, { useEffect } from "react";
import { Course } from "../Course";
import { STATE } from "../../state";
import { useAtom } from "jotai";
import { useUpdateAtom } from "jotai/utils";

export const Courses = () => {
  const [courses, setCourses] = useAtom(STATE.COURSES);
  const setTotalCoursesMembers = useUpdateAtom(STATE.COURSES_MEMBERS);

  useEffect(() => {
    setCourses();
    setTotalCoursesMembers();
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
              mentorName={course.mentorName}
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
