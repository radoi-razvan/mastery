import React, { useEffect } from "react";
import { Testimonial } from "../Testimonial";
import { STATE } from "../../state";
import { useAtom } from "jotai";
import { useParams } from "react-router";
import { useLocation } from 'react-router-dom'

export const Testimonials = () => {
  const [testimonials, setTestimonial] = useAtom(STATE.TESTIMONIALS);
  let params = useParams();
  const location = useLocation();
  const { mentorId } = location.state;

  useEffect(() => {
    setTestimonial(params.courseId);
  }, []);

  return (
    <>
      {testimonials.length ? (
        <div className="container-margin-top">
          {testimonials.map((testimonial, index) => (
            <Testimonial
              firstName={testimonial.firstName}
              lastName={testimonial.lastName}
              comment={testimonial.comment}
              rating={testimonial.rating}
              testimonialId={testimonial.testimonialId}
              mentorId={mentorId}
              key={index}
            />
          ))}
        </div>
      ) : (
        <div className="card">
          <div className="card-container">
            <p className="text-center h3 fw-bold mb-5 mx-1 mx-md-4 mt-4 txt-main-color form-txt-color">
              There are no weeks
            </p>
          </div>
        </div>
      )}
    </>
  );
};
