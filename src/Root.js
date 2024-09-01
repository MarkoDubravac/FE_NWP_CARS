import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useParams,
} from "react-router-dom";
import App from "./componants/App";
import CustomerList from "./componants/CustomerList";
import Header from "./componants/Header";
import Footer from "./componants/Footer";
import Customer from "./componants/Customer";
import LoginForm from "./componants/LoginForm";
import PrivateRoute from "./componants/PrivateRoute";

function Root() {
  return (
    <div id="root">
      <Router>
        <Header pageTitle="Cars Service DRC" />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<LoginForm />} />
            <Route element={<PrivateRoute />}>
              <Route path="/home" element={<App />} />
              <Route path="/users" element={<CustomerList />} />
              <Route path="/users/:id" element={<CustomerWrapper />} />
            </Route>
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

function CustomerWrapper() {
  const { id } = useParams();
  return <Customer id={id} />;
}

export default Root;
