import React from "react";
import "../App.css";
import CustomerForm from "./CustomerForm";
import CarForm from "./CarForm";
import ServiceForm from "./ServiceForm";
import AdminForm from "./AdminForm";
import { Grid, Container } from "@mui/material";

function App() {
  return (
    <Container>
      <Grid container spacing={2} className="form-container">
        <Grid item xs={12} sm={6} md={3} className="form-section">
          <h2>Enter New Client</h2>
          <CustomerForm />
        </Grid>
        <Grid item xs={12} sm={6} md={3} className="form-section">
          <h2>Enter New Car</h2>
          <CarForm />
        </Grid>
        <Grid item xs={12} sm={6} md={3} className="form-section">
          <h2>Enter New Service</h2>
          <ServiceForm />
        </Grid>
        <Grid item xs={12} sm={6} md={3} className="form-section">
          <h2>Add a new admin</h2>
          <AdminForm />
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
