import { Button, Card, Input } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import userImage from "./userpng.png";

function CustomerList() {
  const [users, setUsers] = useState([]);
  const [searchId, setSearchId] = useState("");
  const [searchedUser, setSearchedUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8080/api/customers")
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched data:", data);
        if (data && Array.isArray(data.content)) {
          setUsers(data.content);
        } else {
          console.error("Expected an array in data.content but got:", data);
        }
      })
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  const handleSearch = () => {
    fetch(`http://localhost:8080/api/customers/${searchId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Customer not found");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Searched user data:", data);
        setSearchedUser(data);
      })
      .catch((error) => {
        console.error("Error fetching user by ID:", error);
        setSearchedUser(null);
      });
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:8080/api/customers/delete/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete user");
        }
        return response.text();
      })
      .then((message) => {
        console.log(message);
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
        if (searchedUser && searchedUser.id === id) {
          setSearchedUser(null);
        }
      })
      .catch((error) => console.error("Error deleting user:", error));
  };

  const handleDetails = (id) => {
    navigate(`/users/${id}`);
  };

  return (
    <div>
      <h2>Users</h2>
      <Input
        type="text"
        placeholder="Search by ID"
        value={searchId}
        onChange={(e) => setSearchId(e.target.value)}
      />
      <Button onClick={handleSearch}>Search</Button>
      {searchedUser ? (
        <div>
          <h3>Searched User:</h3>
          <ul>
            <Card key={searchedUser.id} className="user-card">
              <li className="user-card-item">
                <img src={userImage} alt="user" className="user-icon" />
                <span className="user-name">{searchedUser.firstName}</span>
                <Button onClick={() => handleDetails(searchedUser.id)}>
                  Details
                </Button>
                <Button
                  color="error"
                  onClick={() => handleDelete(searchedUser.id)}
                >
                  Remove
                </Button>
              </li>
            </Card>
          </ul>
        </div>
      ) : (
        <div>
          <h3>All Users:</h3>
          <ul>
            {users.map((user) => (
              <Card key={user.id} className="user-card">
                <li className="user-card-item">
                  <img src={userImage} alt="user" className="user-icon" />
                  <span className="user-name">{user.firstName}</span>
                  <Button onClick={() => handleDetails(user.id)}>
                    Details
                  </Button>
                  <Button color="error" onClick={() => handleDelete(user.id)}>
                    Remove
                  </Button>
                </li>
              </Card>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default CustomerList;
