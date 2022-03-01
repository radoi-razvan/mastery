import React from "react";

export const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer mt-auto navbar navbar-expand-lg bg-dark text-light">
      <div className="container justify-content-center">
        <span className="navbar-brand">&copy; {year} - Mastery</span>
      </div>
    </footer>
  );
};
