import './App.css';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet
} from "react-router-dom";

import Home from "./view/home/Home";
import Login from "./view/login/Login";
import Thankyou from "./view/thankyou/Thankyou";
import Appointment from "./view/appointment/Appointment";

function App() {
  
  return (
    <div>
      <Router>
        <Outlet />

        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/thankyou" element={<Thankyou />} />
            <Route path="/appointment" element={<Appointment />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
