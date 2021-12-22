import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home/Home";
import Appointment from "./Pages/Appointment/Appointment/Appointment";
import Login from "./Pages/Login/Login/Login";
import Register from "./Pages/Login/Register/Register";
import AuthProvider from "./contexts/AuthProvider/AuthProvider";
import PrivateRoute from "./Pages/Login/PrivateRoute/PrivateRoute";
import Dashboard from "./Pages/Dashboard/Dashboard/Dashboard";
import DashboardHome from "./Pages/Dashboard/DashboardHome/DashboardHome";
import Payment from "./Pages/Dashboard/Payment/Payment";
import MakeAdmin from "./Pages/Dashboard/MakeAdmin/MakeAdmin";
import AdminRoute from "./Pages/Login/AdminRoute/AdminRoute";
import AddDoctor from "./Pages/Dashboard/AddDoctor/AddDoctor";
import ManageAppointments from "./Pages/Dashboard/manageAppointments/ManageAppointments";
import About from "./Pages/AboutUS/About";
import Blog from "./Pages/Blog/Blog";
import Contact from "./Pages/contact/Contact";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Routes>
            <Route
              path="/appointment"
              element={
                <PrivateRoute>
                  <Appointment />
                </PrivateRoute>
              }
            ></Route>
            <Route path="/about" element={<About />}></Route>
            <Route path="/blog" element={<Blog />}></Route>
            <Route path="/contact" element={<Contact />}></Route>
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            >
              <Route
                exact
                path="/dashboard"
                element={<DashboardHome></DashboardHome>}
              ></Route>
              <Route
                path={`/dashboard/payment/:appointmentId`}
                element={<Payment></Payment>}
              ></Route>
              <Route
                path={`/dashboard/makeAdmin`}
                element={
                  <AdminRoute>
                    <MakeAdmin></MakeAdmin>
                  </AdminRoute>
                }
              ></Route>
              <Route
                path={`/dashboard/addDoctor`}
                element={
                  <AdminRoute>
                    <AddDoctor></AddDoctor>
                  </AdminRoute>
                }
              ></Route>
              <Route
                path={`/dashboard/manageAppointments`}
                element={
                  <AdminRoute>
                    <ManageAppointments />
                  </AdminRoute>
                }
              ></Route>
            </Route>
            <Route path="/home" element={<Home />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route exact path="/" element={<Home />}></Route>
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
