import "./App.css";

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
import Print from "./view/print/Print";
import Logout from "./view/logout/Logout";
import Reporting from "./view/reporting/Reporting";
import Settings from "./view/settings/Settings";
import Locale from "./view/locale/Locale";
import StudentUpload from "./view/upload/StudentUpload";

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
            <Route path="/print" element={<Print />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/reporting" element={<Reporting />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/locales" element={<Locale />} />
            <Route path="/upload" element={<StudentUpload />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
