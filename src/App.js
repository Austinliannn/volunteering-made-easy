import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/pages/authorization";
import VolunteerHome from "./components/pages/home/volunteer";
import VolunteerProfile from "./components/pages/profile";

import OrganizationHome from "./components/pages/home/organization";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/organization" element={<OrganizationHome />} />
          <Route path="/volunteer" element={<VolunteerHome />} />
          <Route path="/profile" element={<VolunteerProfile />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
