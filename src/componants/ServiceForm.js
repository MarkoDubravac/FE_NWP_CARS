import React, { useState } from "react";
import {
  Button,
  Card,
  FormLabel,
  Input,
  Select,
  MenuItem,
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
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
      .then((response) => response.json())
      .then((data) => {
        console.log("Successfully posted data:", data);
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
            throw new Error(text);
          });
        }
        return response.json();
      })
      .then((data) => {
        console.log("Successfully updated data:", data);
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

  return (
    <Card sx={{ maxWidth: 600, margin: "0 auto", padding: 2 }}>
      <form onSubmit={handleSubmit}>
        <div>
          <FormLabel>CarService ID:</FormLabel>
          <Input
            type="text"
            name="id"
            placeholder="Add ID to update Service"
            value={formData.id}
            onChange={handleChange}
          />
        </div>
        <div>
          <FormLabel>Date of Service:</FormLabel>
          <Input
            type="date"
            name="dateOfService"
            value={formData.dateOfService}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <FormLabel>Worker First Name:</FormLabel>
          <Input
            type="text"
            name="workerFirstName"
            value={formData.workerFirstName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <FormLabel>Worker Last Name:</FormLabel>
          <Input
            type="text"
            name="workerLastName"
            value={formData.workerLastName}
            onChange={handleChange}
          />
        </div>
        <div>
          <FormLabel>Work Description:</FormLabel>
          <Input
            type="text"
            name="workDescription"
            value={formData.workDescription}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <FormLabel>Price:</FormLabel>
          <Input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>
        <div>
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
        <div>
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
        <div>
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
    </Card>
  );
}

export default CarServiceRequestForm;
