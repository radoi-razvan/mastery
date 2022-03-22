import React from "react";

export const Client = ({
  lastYearIncomeRange,
  jobTitle,
  city,
  country,
  courseName,
  email,
  firstName,
  lastName,
  phoneNumber,
  courseClientId
}) => {
  return (
    <>
      <div className="courses-card mb-3">
        <div className="row no-gutters">
          <div className="d-inline-flex">
            <div className="card-body row">
              <p className="h4 courses-card-title font-weight-bold">
                {firstName} {lastName} {courseName}
              </p>
              <p className="card-text description-txt">
                {jobTitle} {lastYearIncomeRange}
              </p>
              <p className="card-text description-txt">
                {city}, {country}
              </p>
              <p className="card-text description-txt">
                {email} {phoneNumber}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
