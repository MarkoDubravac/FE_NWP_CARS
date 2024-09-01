import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Header(props) {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedInStatus = localStorage.getItem("isLoggedIn");
    setIsLoggedIn(loggedInStatus === "true");
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/");
  };

  return (
    <header className="App-header">
      <div className="header-container">
        <h1 className="App-title">{props.pageTitle}</h1>
        {isLoggedIn && location.pathname !== "/" && (
          <nav>
            <ul className="nav-links">
              <li>
                <a href="http://localhost:3000/home">Home</a>
              </li>
              <li>
                <a href="http://localhost:3000/users">Clients</a>
              </li>
              <li>
                <a href="#" onClick={handleLogout}>
                  Log out
                </a>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}
