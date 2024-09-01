import React, { useState } from "react";
import {
  Button,
  Card,
  FormLabel,
  Input,
  Select,
  MenuItem,
  Snackbar,
  Alert,
} from "@mui/material";

function CarServiceRequestForm({ clientId, carId, serviceId }) {
  const [formData, setFormData] = useState({
    id: "",
    dateOfService: "",
    workerFirstName: "",
    workerLastName: "",
    workDescription: "",
    price: 0,
    isPaid: false,
    clientId: "",
    carId: "",
  });

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("error"); // Can be 'error', 'warning', 'info', 'success'

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "isPaid" ? value === "true" : value,
    }));
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
    fetch(
      `http://localhost:8080/api/customers/${formData.clientId}/cars/${formData.carId}/car-services`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    )
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
        setAlertMessage("Service request added successfully!");
        setAlertSeverity("success");
        setAlertOpen(true);
        setFormData({
          id: "",
          dateOfService: "",
          workerFirstName: "",
          workerLastName: "",
          workDescription: "",
          price: 0,
          isPaid: false,
          clientId: "",
          carId: "",
        });
      })
      .catch((error) => console.error("Error posting data:", error));
  };

  const handleUpdate = () => {
    fetch(
      `http://localhost:8080/api/customers/${formData.clientId}/cars/${formData.carId}/car-services/${formData.id}`,
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
        setAlertMessage("Service request updated successfully!");
        setAlertSeverity("success");
        setAlertOpen(true);
        setFormData({
          id: "",
          dateOfService: "",
          workerFirstName: "",
          workerLastName: "",
          workDescription: "",
          price: 0,
          isPaid: false,
          clientId: "",
          carId: "",
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
          <FormLabel>Service ID:</FormLabel>
          <Input
            type="text"
            name="id"
            placeholder="Add ID to update Service"
            value={formData.id}
            onChange={handleChange}
          />
        </div>
        <div style={{ marginBottom: 16 }}>
          <FormLabel>Date of Service:</FormLabel>
          <Input
            type="date"
            name="dateOfService"
            value={formData.dateOfService}
            onChange={handleChange}
            required
          />
        </div>
        <div style={{ marginBottom: 16 }}>
          <FormLabel>Worker First Name:</FormLabel>
          <Input
            type="text"
            name="workerFirstName"
            value={formData.workerFirstName}
            onChange={handleChange}
            required
          />
        </div>
        <div style={{ marginBottom: 16 }}>
          <FormLabel>Worker Last Name:</FormLabel>
          <Input
            type="text"
            name="workerLastName"
            value={formData.workerLastName}
            onChange={handleChange}
          />
        </div>
        <div style={{ marginBottom: 16 }}>
          <FormLabel>Work Description:</FormLabel>
          <Input
            type="text"
            name="workDescription"
            value={formData.workDescription}
            onChange={handleChange}
            required
          />
        </div>
        <div style={{ marginBottom: 16 }}>
          <FormLabel>Price:</FormLabel>
          <Input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>
        <div style={{ marginBottom: 16 }}>
          <FormLabel>Payment Status:</FormLabel>
          <Select
            value={formData.isPaid}
            onChange={handleChange}
            name="isPaid"
            required
          >
            <MenuItem value={true}>Paid</MenuItem>
            <MenuItem value={false}>Not Paid</MenuItem>
          </Select>
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
        <div style={{ marginBottom: 16 }}>
          <FormLabel>Car ID:</FormLabel>
          <Input
            type="text"
            name="carId"
            placeholder="Serviced car"
            value={formData.carId}
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
            {formData.id ? "Update Service" : "Add Service"}
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

export default CarServiceRequestForm;
