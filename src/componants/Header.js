import * as React from "react";

export default function Header(props) {
  return (
    <header className="App-header">
      <div className="header-container">
        <h1 className="App-title">{props.pageTitle}</h1>
        <nav>
          <ul className="nav-links">
            <li>
              <a href="http://localhost:3000/">Home</a>
            </li>
            <li>
              <a href="http://localhost:3000/users">Users</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
