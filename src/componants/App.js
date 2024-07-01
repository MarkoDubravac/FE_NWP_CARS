import "../App.css";
import CustomerForm from "./CustomerForm";
import CarForm from "./CarForm";
import ServiceForm from "./ServiceForm";
import AdminForm from "./AdminForm";

function App() {
  return (
      <div className="form-container">
          <div className="form-section">
              <h2>Enter New Client</h2>
              <CustomerForm/>
          </div>
          <div className="form-section">
              <h2>Enter New Car</h2>
              <CarForm/>
          </div>
          <div className="form-section">
              <h2>Enter New Service</h2>
              <ServiceForm/>
          </div>
          <div className="form-section">
              <h2>Add a new admin</h2>
              <AdminForm/>
          </div>
      </div>
  );
}

export default App;
