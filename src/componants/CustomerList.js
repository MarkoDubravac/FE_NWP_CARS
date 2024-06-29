import React, { useState, useEffect } from "react";

function CustomerList() {
  const [users, setUsers] = useState([]);

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

  return (
    <div>
      <h2>Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user.firstName}>{user.firstName}</li>
        ))}
      </ul>
    </div>
  );
}

export default CustomerList;
