import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  FormLabel,
  Input,
  FormHelperText,
  Snackbar,
  Alert,
} from "@mui/material";

function CustomerForm({ initialData }) {
  const [formData, setFormData] = useState({
    id: "",
    firstName: "",
    lastName: "",
    oib: "",
    city: "",
    street: "",
    streetNumber: "",
    zipCode: "",
    country: "",
  });

  const [errors, setErrors] = useState({
    oib: "",
    zipCode: "",
  });

  const [touched, setTouched] = useState({
    oib: false,
    zipCode: false,
  });

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("error"); // Can be 'error', 'warning', 'info', 'success'

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const regex = /^[0-9]*$/;

    if (name === "oib" && regex.test(value)) {
      setFormData({ ...formData, [name]: value });
      if (value.length !== 11) {
        setErrors({ ...errors, oib: "OIB must be exactly 11 digits long" });
      } else {
        setErrors({ ...errors, oib: "" });
      }
    } else if (name === "zipCode" && regex.test(value)) {
      setFormData({ ...formData, [name]: value });
      if (value.length !== 5) {
        setErrors({
          ...errors,
          zipCode: "Zip Code must be exactly 5 digits long",
        });
      } else {
        setErrors({ ...errors, zipCode: "" });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched({ ...touched, [name]: true });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.id) {
      handleUpdate();
    } else {
      handleCreate();
    }
  };

  const handleCreate = () => {
    fetch("http://localhost:8080/api/customers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((error) => {
            setAlertMessage(error.message || "An unexpected error occurred");
            setAlertSeverity("error");
            setAlertOpen(true);
            throw new Error(error.message);
          });
        }
        return response.json();
      })
      .then((data) => {
        console.log("Successfully posted data:", data);
        setFormData({
          id: "",
          firstName: "",
          lastName: "",
          oib: "",
          city: "",
          street: "",
          streetNumber: "",
          zipCode: "",
          country: "",
        });
        setTouched({
          oib: false,
          zipCode: false,
        });
        setErrors({
          oib: "",
          zipCode: "",
        });
      })
      .catch((error) => console.error("Error posting data:", error));
  };

  const handleUpdate = () => {
    fetch(`http://localhost:8080/api/customers/${formData.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          return response.text().then((text) => {
            setAlertMessage(text || "An unexpected error occurred");
            setAlertSeverity("error");
            setAlertOpen(true);
            throw new Error(text);
          });
        }
        return response.json();
      })
      .then((data) => {
        console.log("Successfully updated data:", data);
        setFormData({
          id: "",
          firstName: "",
          lastName: "",
          oib: "",
          city: "",
          street: "",
          streetNumber: "",
          zipCode: "",
          country: "",
        });
        setTouched({
          oib: false,
          zipCode: false,
        });
        setErrors({
          oib: "",
          zipCode: "",
        });
      })
      .catch((error) => console.error("Error updating data:", error));
  };

  const handleAlertClose = () => {
    setAlertOpen(false);
  };

  return (
    <Card sx={{ maxWidth: 600, margin: "0 auto", padding: 2 }}>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 16 }}>
          <FormLabel>Client ID:</FormLabel>
          <Input
            type="text"
            name="id"
            placeholder="Add ID to update Client"
            value={formData.id}
            onChange={handleChange}
          />
        </div>
        <div style={{ marginBottom: 16 }}>
          <FormLabel>First Name:</FormLabel>
          <Input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div style={{ marginBottom: 16 }}>
          <FormLabel>Last Name:</FormLabel>
          <Input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div style={{ marginBottom: 16 }}>
          <FormLabel htmlFor="oib">OIB:</FormLabel>
          <Input
            id="oib"
            type="text"
            name="oib"
            placeholder="Exactly 11 numbers"
            value={formData.oib}
            onChange={handleChange}
            onBlur={handleBlur}
            inputProps={{
              maxLength: 11,
              pattern: "\\d{11}",
              inputMode: "numeric",
            }}
            required
            error={touched.oib && !!errors.oib}
          />
          {touched.oib && errors.oib && (
            <FormHelperText error>{errors.oib}</FormHelperText>
          )}
        </div>
        <div style={{ marginBottom: 16 }}>
          <FormLabel>City:</FormLabel>
          <Input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          />
        </div>
        <div style={{ marginBottom: 16 }}>
          <FormLabel>Street:</FormLabel>
          <Input
            type="text"
            name="street"
            value={formData.street}
            onChange={handleChange}
            required
          />
        </div>
        <div style={{ marginBottom: 16 }}>
          <FormLabel>Street Number:</FormLabel>
          <Input
            type="text"
            name="streetNumber"
            value={formData.streetNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div style={{ marginBottom: 16 }}>
          <FormLabel>Zip Code:</FormLabel>
          <Input
            id="zipCode"
            type="text"
            name="zipCode"
            placeholder="Exactly 5 numbers"
            value={formData.zipCode}
            onChange={handleChange}
            onBlur={handleBlur}
            inputProps={{
              maxLength: 5,
              pattern: "\\d{5}",
              inputMode: "numeric",
            }}
            required
            error={touched.zipCode && !!errors.zipCode}
          />
          {touched.zipCode && errors.zipCode && (
            <FormHelperText error>{errors.zipCode}</FormHelperText>
          )}
        </div>
        <div style={{ marginBottom: 16 }}>
          <FormLabel>Country:</FormLabel>
          <Input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
            required
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "16px",
          }}
        >
          <Button type="submit">
            {formData.id ? "Update Client" : "Add Client"}
          </Button>
        </div>
      </form>
      <Snackbar
        open={alertOpen}
        autoHideDuration={6000}
        onClose={handleAlertClose}
      >
        <Alert
          onClose={handleAlertClose}
          severity={alertSeverity}
          sx={{ width: "100%" }}
        >
          {alertMessage}
        </Alert>
      </Snackbar>
    </Card>
  );
}

export default CustomerForm;
