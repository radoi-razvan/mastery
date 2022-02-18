import React from "react";

export const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <span className="navbar-brand">&copy; {year} - Mastery</span>
      </div>
    </footer>
  );
};
