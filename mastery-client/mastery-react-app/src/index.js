import React, { StrictMode } from "react";
import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Header } from "./components/shared/Header";
import { Footer } from "./components/shared/Footer";
import { Home } from "./components/shared/Home";
import { Posts } from "./components/Posts";
import { Post } from "./components/Post";
import { NotFound } from "./components/shared/NotFound";
import { Register } from "./components/shared/Register";
import { Login } from "./components/shared/Login";
import { Logout } from "./components/shared/Logout";

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/posts" element={<Posts />}></Route>
        <Route path="/posts/:id" element={<Post />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/logout" element={<Logout />}></Route>
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
