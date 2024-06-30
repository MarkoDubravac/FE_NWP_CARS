import React, { useState, useEffect } from "react";

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
      <h2>User Profile</h2>
      <p>
        Name: {user.firstName} {user.lastName}
      </p>
      <p>Email: {user.email}</p>
    </div>
  );
}

export default Customer;
