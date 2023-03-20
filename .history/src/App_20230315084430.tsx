import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import reactLogo from "./assets/react.svg";
import DefaultLayout from "./layouts/DefaultLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DefaultLayout />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
