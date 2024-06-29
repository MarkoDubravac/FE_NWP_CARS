import { Button, Card, FormLabel, Input } from "@mui/material";
import React, { useState, useEffect } from "react";

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

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

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
    fetch("http://localhost:8080/api/customers", {
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
            firstName: "",
            lastName: "",
            oib: "",
            city: "",
            street: "",
            streetNumber: "",
            zipCode: "",
            country: "",
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
        })
        .catch((error) => console.error("Error updating data:", error));
  };

  return (
      <Card sx={{ maxWidth: 600, margin: "0 auto", padding: 2 }}>
        <form onSubmit={handleSubmit}>
          <div>
            <FormLabel>Client ID:</FormLabel>
            <Input
                type="text"
                name="id"
                value={formData.id}
                onChange={handleChange}
            />
          </div>
          <div>
            <FormLabel>First Name:</FormLabel>
            <Input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
            />
          </div>
          <div>
            <FormLabel>Last Name:</FormLabel>
            <Input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
            />
          </div>
          <div>
            <FormLabel>OIB:</FormLabel>
            <Input
                type="text"
                name="oib"
                value={formData.oib}
                onChange={handleChange}
                required
            />
          </div>
          <div>
            <FormLabel>City:</FormLabel>
            <Input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
            />
          </div>
          <div>
            <FormLabel>Street:</FormLabel>
            <Input
                type="text"
                name="street"
                value={formData.street}
                onChange={handleChange}
                required
            />
          </div>
          <div>
            <FormLabel>Street Number:</FormLabel>
            <Input
                type="text"
                name="streetNumber"
                value={formData.streetNumber}
                onChange={handleChange}
                required
            />
          </div>
          <div>
            <FormLabel>Zip Code:</FormLabel>
            <Input
                type="text"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
                required
            />
          </div>
          <div>
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
            <Button type="submit">{formData.id ? "Update Customer" : "Add Customer"}</Button>
          </div>
        </form>
      </Card>
  );
}

export default CustomerForm;
