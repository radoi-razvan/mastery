import "./css/App.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import React, { StrictMode } from "react";
import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Header } from "./components/shared/Header";
import { Footer } from "./components/shared/Footer";
import { Home } from "./components/shared/Home";
import { Courses } from "./components/Lists/Courses";
import { Course } from "./components/Course";
import { NotFound } from "./components/shared/NotFound";
import { Register } from "./components/shared/Register";
import { Login } from "./components/shared/Login";

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/courses" element={<Courses />}></Route>
        <Route path="/courses/:id" element={<Course />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
      <Footer />
    </>
  );
};

render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
  document.getElementById("root")
);
