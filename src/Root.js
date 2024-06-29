import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "./componants/App";
import CustomerList from "./componants/CustomerList";
import Header from "./componants/Header";
import Footer from "./componants/Footer";

function Root() {
  return (
    <div id="root">
      <Router>
        <Header pageTitle="Cars Service DRC" />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/users" element={<CustomerList />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default Root;
