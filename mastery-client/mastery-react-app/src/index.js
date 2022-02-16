import React, { StrictMode } from "react";
import { render } from "react-dom";

const App = () => {
  return "works";
};

render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById("root")
);
