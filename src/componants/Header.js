import * as React from "react";
import { useLocation } from "react-router-dom";

export default function Header(props) {
  const location = useLocation();

  return (
    <header className="App-header">
      <div className="header-container">
        <h1 className="App-title">{props.pageTitle}</h1>
        {location.pathname !== "/" && (
          <nav>
            <ul className="nav-links">
              <li>
                <a href="http://localhost:3000/home">Home</a>
              </li>
              <li>
                <a href="http://localhost:3000/users">Clients</a>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}
