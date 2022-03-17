import React, { useEffect } from "react";
import { Week } from "../Week";
import { STATE } from "../../state";
import { useAtom } from "jotai";
import { useParams } from "react-router";


export const Weeks = () => {
  const [weeks, setWeeks] = useAtom(STATE.WEEKS);
  let params = useParams();

  useEffect(() => {
    setWeeks(params.courseId);
  }, []);

  return (
    <>
      {weeks.length ? (
        <div className="container-margin-top">
            {weeks.map((week, index) => (
              <Week
                number={week.number}
                videoLink={week.videoLink}
                homeworkTitle={week.homeworkTitle}
                consultationCallLink={week.consultationCallLink}
                weekId={week.weekId}
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