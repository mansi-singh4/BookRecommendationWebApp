import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import BookDetail from "./pages/BookDetail";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/book/:title" element={<BookDetail />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;