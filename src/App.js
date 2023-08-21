import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/pages/authorization";
import VolunteerHome from "./components/pages/home/volunteer";
import VolunteerProfile from "./components/pages/profile";
import VolunteerTracker from "./components/pages/tracker";

import OrganizationHome from "./components/pages/home/organization";
import ApplicantTracker from "./components/pages/applicantTracker";
import EventTracker from "./components/pages/eventTracker";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/volunteer" element={<VolunteerHome />} />
          <Route path="/profile" element={<VolunteerProfile />} />
          <Route path="/tracker" element={<VolunteerTracker />} />
          <Route path="/organization" element={<OrganizationHome />} />
          <Route path="/applicant" element={<ApplicantTracker />} />
          <Route path="/event" element={<EventTracker />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
