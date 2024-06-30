import "../App.css";
import CustomerForm from "./CustomerForm";
import CarForm from "./CarForm";
import ServiceForm from "./ServiceForm";

function App() {
  return (
      <div className="container">
          <div className="form-section">
              <h5>Enter New Client</h5>
              <CustomerForm/>
          </div>
          <div className="form-section">
              <h5>Enter New Car</h5>
              <CarForm/>
          </div>
            <div className="form-section">
                <h5>Enter New Car</h5>
                <ServiceForm/>
            </div>
      </div>

  );
}

export default App;
