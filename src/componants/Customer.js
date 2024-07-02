import {
  Card,
  CardContent,
  Grid,
  List,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import carImage from "./carpng.png";

function Customer({ id }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    console.log(id);
    fetch(`http://localhost:8080/api/customers/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setUser(data);
      })
      .catch((error) => console.error("Error fetching user:", error));
  }, [id]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Client Informations</h2>
      <Card>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="First Name"
                value={user.firstName}
                fullWidth
                variant="outlined"
                margin="normal"
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Last Name"
                value={user.lastName}
                fullWidth
                variant="outlined"
                margin="normal"
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="OIB"
                value={user.oib}
                fullWidth
                variant="outlined"
                margin="normal"
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="City"
                value={user.city}
                fullWidth
                variant="outlined"
                margin="normal"
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Street"
                value={user.street}
                fullWidth
                variant="outlined"
                margin="normal"
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Street Number"
                value={user.streetNumber}
                fullWidth
                variant="outlined"
                margin="normal"
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Zip Code"
                value={user.zipCode}
                fullWidth
                variant="outlined"
                margin="normal"
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Country"
                value={user.country}
                fullWidth
                variant="outlined"
                margin="normal"
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
          </Grid>
          <Typography variant="h6" gutterBottom style={{ marginTop: "16px" }}>
            Cars
          </Typography>
          <List>
            {user.cars.map((car, index) => (
              <div key={index}>
                <Card className="car-card">
                  <li className="car-card-item">
                    <img src={carImage} alt="car" className="car-icon" />
                    <p className="car-name">
                      {car.carType} - {car.manufactureYear} -{" "}
                      {car.registrationMark}
                    </p>
                    <div className="car-service">
                      <Typography variant="h6">Services:</Typography>
                      {car.carServices.length > 0 ? (
                        <List>
                          {car.carServices.map((service, serviceIndex) => (
                            <Card
                              sx={{ marginBottom: 2 }}
                              key={serviceIndex}
                              className="service-card"
                            >
                              <CardContent>
                                <Typography>
                                  Date of Service:{" "}
                                  {new Date(
                                    service.dateOfService
                                  ).toLocaleDateString()}
                                </Typography>
                                <Typography>
                                  Worker: {service.workerFirstName}{" "}
                                  {service.workerLastName}
                                </Typography>
                                <Typography>
                                  Description: {service.workDescription}
                                </Typography>
                                <Typography>
                                  Price: ${service.price.toFixed(2)}
                                </Typography>
                                <Typography>
                                  Paid: {service.paid ? "Yes" : "No"}
                                </Typography>
                              </CardContent>
                            </Card>
                          ))}
                        </List>
                      ) : (
                        <Typography>
                          No services available for this car
                        </Typography>
                      )}
                    </div>
                  </li>
                </Card>
              </div>
            ))}
          </List>
        </CardContent>
      </Card>
    </div>
  );
}

export default Customer;
