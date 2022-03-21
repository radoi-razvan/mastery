import "./css/App.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "react-toastify/dist/ReactToastify.css";
import React, { StrictMode } from "react";
import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./components/shared/Header";
import { Footer } from "./components/shared/Footer";
import { Home } from "./components/shared/Home";
import { Courses } from "./components/Lists/Courses";
import { Weeks } from "./components/Lists/Weeks";
import { Testimonials } from "./components/Lists/Testimonials";
import { NotFound } from "./components/shared/NotFound";
import { Register } from "./components/shared/Register";
import { Login } from "./components/shared/Login";
import { CourseForm } from "./components/forms/CourseForm";
import { TestimonialForm } from "./components/forms/TestimonialForm";

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/courses/:courseId/testimonials/:testimonialId/edit" element={<TestimonialForm />}></Route>
        <Route path="/courses/:courseId/testimonials/add" element={<TestimonialForm />}></Route>
        <Route path="/courses/:courseId/testimonials" element={<Testimonials />}></Route>
        <Route path="/courses/:courseId/weeks" element={<Weeks />}></Route>
        <Route path="/courses/:courseId/edit" element={<CourseForm />}></Route>
        <Route path="/courses/add" element={<CourseForm />}></Route>
        <Route path="/courses" element={<Courses />}></Route>
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
