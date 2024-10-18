import React from "react";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Login from "./components/Login";
import Users from "./components/Users";

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/users" element={<Users />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
