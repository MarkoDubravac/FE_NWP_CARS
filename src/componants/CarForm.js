import {
  Button,
  Card,
  FormLabel,
  Input,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import React, { useState } from "react";

function CarForm({ customerId }) {
  const [formData, setFormData] = useState({
    id: "",
    carType: "",
    manufactureYear: "",
    registrationMark: "",
    color: "",
    clientId: "",
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
    fetch(`http://localhost:8080/api/customers/${formData.clientId}/cars`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Successfully posted data:", data);
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
            throw new Error(text);
          });
        }
        return response.json();
      })
      .then((data) => {
        console.log("Successfully updated data:", data);
        setFormData({
          carType: "",
          manufactureYear: "",
          registrationMark: "",
          color: "",
          clientId: customerId, // Reset to the initial customerId
        });
      })
      .catch((error) => console.error("Error updating data:", error));
  };

  return (
    <Card sx={{ maxWidth: 600, margin: "0 auto", padding: 2 }}>
      <form onSubmit={handleSubmit}>
        <div>
          <FormControl>
            <InputLabel id="carType-label">Car Type</InputLabel>
            <Select
              labelId="carType-label"
              id="carType"
              name="carType"
              value={formData.carType}
              onChange={handleChange}
              required
              style={{ width: "300px" }}
            >
              <MenuItem value="HYUNDAI">HYUNDAI</MenuItem>
              <MenuItem value="BMW">BMW</MenuItem>
              <MenuItem value="MERCEDES">MERCEDES</MenuItem>
              <MenuItem value="RENAULT">RENAULT</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div>
          <FormLabel>Car ID:</FormLabel>
          <Input
            type="text"
            name="id"
            placeholder="Add ID to update Car"
            value={formData.id}
            onChange={handleChange}
          />
        </div>
        <div>
          <FormLabel>Manufacture Year:</FormLabel>
          <Input
            type="number"
            name="manufactureYear"
            value={formData.manufactureYear}
            onChange={handleChange}
            required
          />
        </div>
        <div>
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
        <div>
          <FormLabel>Color:</FormLabel>
          <Input
            type="text"
            name="color"
            placeholder="Red"
            value={formData.color}
            onChange={handleChange}
            required
          />
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
    </Card>
  );
}

export default CarForm;
