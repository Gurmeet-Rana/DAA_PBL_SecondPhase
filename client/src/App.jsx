import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Schedule from "./pages/Schedule";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/schedule' element={<Schedule />} />
      </Routes>
    </div>
  );
};

export default App;