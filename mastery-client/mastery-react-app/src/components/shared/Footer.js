import React from "react";

export const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer mt-auto navbar navbar-expand-lg bg-dark text-light nav-bg-color">
      <div className="container justify-content-center">
        <span className="navbar-brand app-logo">&copy; {year} - Mastery</span>
      </div>
    </footer>
  );
};
