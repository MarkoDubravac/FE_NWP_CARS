import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "./App";
import CustomerList from "./CustomerList";

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
