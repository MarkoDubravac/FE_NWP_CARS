import React, { useState } from "react";
import {
  Button,
  Card,
  FormLabel,
  Input,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Snackbar,
  Alert,
} from "@mui/material";

function CarForm({ customerId }) {
  const [formData, setFormData] = useState({
    id: "",
    carType: "",
    manufactureYear: "",
    registrationMark: "",
    color: "",
    clientId: "",
  });

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("error");

  const formatRegistrationMark = (value) => {
    const alphanumericValue = value.replace(/[^A-Z0-9]/gi, "");
    let formattedValue = "";
    if (alphanumericValue.length > 0) {
      formattedValue += alphanumericValue.slice(0, 2).toUpperCase();
    }
    if (alphanumericValue.length > 2) {
      formattedValue += " " + alphanumericValue.slice(2, 5);
    }
    if (alphanumericValue.length > 5) {
      formattedValue += " " + alphanumericValue.slice(5, 7).toUpperCase();
    }
    return formattedValue;
  };

  const validateRegistrationMark = (value) => {
    const pattern = /^[A-Z0-9]{2} \d{3} [A-Z0-9]{2}$/;
    return pattern.test(value);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "registrationMark") {
      const formattedValue = formatRegistrationMark(value);
      const isValid = validateRegistrationMark(formattedValue);

      setFormData((prevData) => ({
        ...prevData,
        [name]: formattedValue,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
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
    fetch(`http://localhost:8080/api/customers/${formData.clientId}/cars`, {
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
        setAlertMessage("Car added successfully!");
        setAlertSeverity("success");
        setAlertOpen(true);
        setFormData({
          id: "",
          carType: "",
          manufactureYear: "",
          registrationMark: "",
          color: "",
          clientId: "",
        });
      })
      .catch((error) => console.error("Error posting data:", error));
  };

  const handleUpdate = () => {
    fetch(
      `http://localhost:8080/api/customers/${formData.clientId}/cars/${formData.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    )
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
        setAlertMessage("Car updated successfully!");
        setAlertSeverity("success");
        setAlertOpen(true);
        setFormData({
          id: "",
          carType: "",
          manufactureYear: "",
          registrationMark: "",
          color: "",
          clientId: customerId,
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
        <FormControl fullWidth sx={{ maxWidth: 300, mt: 2, mb: 2 }}>
          <InputLabel id="carType-label">Car Type</InputLabel>
          <Select
            labelId="carType-label"
            id="carType"
            name="carType"
            value={formData.carType}
            onChange={handleChange}
            label="Car Type"
            required
          >
            <MenuItem value="HYUNDAI">HYUNDAI</MenuItem>
            <MenuItem value="BMW">BMW</MenuItem>
            <MenuItem value="MERCEDES">MERCEDES</MenuItem>
            <MenuItem value="RENAULT">RENAULT</MenuItem>
          </Select>
        </FormControl>

        <div style={{ marginBottom: 16 }}>
          <FormLabel>Car ID:</FormLabel>
          <Input
            type="text"
            name="id"
            placeholder="Add ID to update Car"
            value={formData.id}
            onChange={handleChange}
          />
        </div>

        <div style={{ marginBottom: 16 }}>
          <FormLabel>Manufacture Year:</FormLabel>
          <Input
            type="number"
            name="manufactureYear"
            value={formData.manufactureYear}
            onChange={handleChange}
            required
          />
        </div>

        <div style={{ marginBottom: 16 }}>
          <FormLabel>Registration Mark:</FormLabel>
          <Input
            type="text"
            name="registrationMark"
            placeholder="XX XXX XX format"
            value={formData.registrationMark}
            onChange={handleChange}
            required
          />
        </div>

        <div style={{ marginBottom: 16 }}>
          <FormLabel>Color:</FormLabel>
          <Input
            type="text"
            name="color"
            value={formData.color}
            onChange={handleChange}
            required
          />
        </div>

        <div style={{ marginBottom: 16 }}>
          <FormLabel>Customer ID:</FormLabel>
          <Input
            type="text"
            name="clientId"
            placeholder="Owner of car"
            value={formData.clientId}
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
            {formData.id ? "Update Car" : "Add Car"}
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

export default CarForm;
