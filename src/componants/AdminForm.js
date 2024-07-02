import React, { useState } from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";

const AdminForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (username === "" || password === "") {
      setError("Username and password are required");
      return;
    }

    const adminRequestDto = {
      username: username,
      password: password,
    };

    try {
      const response = await fetch("http://localhost:8080/api/admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(adminRequestDto),
      });

      if (response.ok) {
        const result = await response.json();
        setMessage("Admin created successfully!");
        setError("");
        setUsername("");
        setPassword("");
      } else {
        setError("Failed to create admin");
        setMessage("");
      }
    } catch (error) {
      setError("An error occurred");
      setMessage("");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && (
            <Typography color="error" variant="body2" align="center">
              {error}
            </Typography>
          )}
          {message && (
            <Typography color="success" variant="body2" align="center">
              {message}
            </Typography>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Add Admin
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default AdminForm;
