import React, { useState, useEffect } from "react";

function CustomerList() {
    const [users, setUsers] = useState([]);
    const [searchId, setSearchId] = useState("");
    const [searchedUser, setSearchedUser] = useState(null);

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

    return (
        <div>
            <h2>Users</h2>
            <input
                type="text"
                placeholder="Search by ID"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
            {searchedUser ? (
                <div>
                    <h3>Searched User:</h3>
                    <p>{searchedUser.firstName}</p>
                    <button onClick={() => handleDelete(searchedUser.id)}>Remove</button>
                </div>
            ) : (
                <div>
                    <h3>All Users:</h3>
                    <ul>
                        {users.map((user) => (
                            <li key={user.id}>
                                {user.firstName}
                                <button onClick={() => handleDelete(user.id)}>Remove</button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default CustomerList;
