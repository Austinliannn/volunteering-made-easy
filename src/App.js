import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import OrganizationHome from "./components/pages/home/organization";
import VolunteerHome from "./components/pages/home/volunteer";
import Login from "./components/pages/authorization";

function App() {
  return (
    <div className="App">
     <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/organization" element={<OrganizationHome />} />
        <Route path="/volunteer" element={<VolunteerHome />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
