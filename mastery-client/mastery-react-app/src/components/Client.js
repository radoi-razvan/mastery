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
}) => {
  return (
    <>
      <div className="clients-card mb-5">
        <div className="container">
          <section>
            <div className="row d-flex justify-content-center align-items-center">
              <div className="col-lg-10 col-xl-10">
                <div className="text-black">
                  <div>
                    <div className="row justify-content-center">
                      <div>
                        <p className="h4 fw-bold mb-5 mx-1 mx-md-4 mt-4 client-card-title">
                          {firstName} {lastName}
                        </p>
                        <div className="row">
                          <div className="mb-3 col col-md-6">
                            <div className="form-label form-txt-labels">
                              <i className="bi bi-diagram-3-fill fa-lg me-1 fa-fw label-icons-signin"></i>
                              Attended Course
                            </div>
                            <span className="form-control card-text description-txt">{courseName}</span>
                          </div>
                          <div className="mb-3 col col-md-6">
                            <div className="form-label form-txt-labels">
                              <i className="bi bi-geo-alt-fill fa-lg me-1 fa-fw label-icons-signin"></i>
                              Location
                            </div>
                            <span className="form-control card-text description-txt">
                              {city}, {country}
                            </span>
                          </div>
                          <div className="mb-3 col col-md-6">
                            <div className="form-label form-txt-labels">
                              <i className="bi bi-file-person-fill fa-lg me-1 fa-fw label-icons-signin"></i>
                              Job Title
                            </div>
                            <span className="form-control card-text description-txt">{jobTitle}</span>
                          </div>
                          <div className="mb-3 col col-md-6">
                            <div className="form-label form-txt-labels">
                              <i className="bi bi-cash-stack fa-lg me-1 fa-fw label-icons-signin"></i>
                              Last Year Income Range
                            </div>
                            <span className="form-control card-text description-txt">
                              {lastYearIncomeRange}
                            </span>
                          </div>
                          <div className="mb-3 col col-md-6">
                            <div className="form-label form-txt-labels">
                              <i className="bi bi-envelope-fill fa-lg me-1 fa-fw label-icons-signin"></i>
                              Email
                            </div>
                            <span className="form-control card-text description-txt">{email}</span>
                          </div>
                          <div className="mb-3 col col-md-6">
                            <div className="form-label form-txt-labels">
                              <i className="bi bi-phone-fill fa-lg me-1 fa-fw label-icons-signin"></i>
                              Phone Number
                            </div>
                            <span className="form-control card-text description-txt">{phoneNumber}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};
