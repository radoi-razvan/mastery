import React, { useEffect } from "react";
import { Client } from "../Client";
import { STATE } from "../../state";
import { useAtom } from "jotai";

export const Clients = () => {
  const [clients, setClients] = useAtom(STATE.CLIENTS);

  useEffect(() => {
    setClients();
  }, []);

  return (
    <>
      {clients.length ? (
        <div className="container-margin-top">
          {clients.map((client, index) => (
            <Client
              lastYearIncomeRange={client.lastYearIncomeRange}
              jobTitle={client.jobTitle}
              city={client.city}
              country={client.country}
              courseName={client.courseName}
              email={client.email}
              firstName={client.firstName}
              lastName={client.lastName}
              phoneNumber={client.phoneNumber}
              key={index}
            />
          ))}
        </div>
      ) : (
        <div className="card">
          <div className="card-container">
            <p className="text-center h3 fw-bold mb-5 mx-1 mx-md-4 mt-4 txt-main-color form-txt-color">
              There are no clients
            </p>
          </div>
        </div>
      )}
    </>
  );
};
