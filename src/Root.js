import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "./componants/App";
import CustomerList from "./componants/CustomerList";

function Root() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/users" element={<CustomerList />} />
      </Routes>
    </Router>
  );
}

export default Root;
