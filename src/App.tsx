import styled from "styled-components";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./screens/Home";
import About from "./screens/About";
import Error from "./components/Error";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
    </Routes>
  );
}

export default App;
