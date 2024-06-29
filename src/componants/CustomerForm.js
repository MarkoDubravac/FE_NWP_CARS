import React, { useState } from "react";

function CustomerForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    oib: "",
    city: "",
    street: "",
    streetNumber: "",
    zipCode: "",
    country: "",
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
        // Optionally, reset the form or update the UI
        setFormData({
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

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>First Name:</label>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Last Name:</label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>OIB:</label>
        <input
          type="text"
          name="oib"
          value={formData.oib}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>City:</label>
        <input
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Street:</label>
        <input
          type="text"
          name="street"
          value={formData.street}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Street Number:</label>
        <input
          type="text"
          name="streetNumber"
          value={formData.streetNumber}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Zip Code:</label>
        <input
          type="text"
          name="zipCode"
          value={formData.zipCode}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Country:</label>
        <input
          type="text"
          name="country"
          value={formData.country}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Add Customer</button>
    </form>
  );
}

export default CustomerForm;
