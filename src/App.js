import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { Provider, useDispatch, useSelector } from "react-redux";
import store from "./store";
import { getUser } from "./actions/authActions";
import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";
import Login from "./components/Auth/Login";
import PropertyList from "./components/Properties/PropertyList";
import PropertyDetails from "./components/Properties/PropertyDetails";
import TourList from "./components/Tours/TourList";
import ScheduleTour from "./components/Tours/ScheduleTour";
import RegisterPage from "./components/Auth/Register";
import LoginPage from "./pages/Login";
import AddPropertyForm from "./components/Property-Add/Add-property";
import AppProviders from "./services";

const App = () => {
  const dispatch = useDispatch();
  const { token, isAuthenticated, user } = useSelector((state) => state.auth);

  // useEffect(() => {
  //   dispatch(getUser());
  // }, [dispatch]);

  return (
    <AppProviders>
      <Router>
        <Header />
        <Routes>
          {(!token || !isAuthenticated) && (
            <>
              <Route exact path="/login" element={<LoginPage />} />
              <Route exact path="/register" element={<RegisterPage />} />
            </>
          )}
          <Route exact path="/" element={<PropertyList />} />
          <Route exact path="/properties/:id" element={<PropertyDetails />} />
          <Route exact path="/tours" element={<TourList />} />
          <Route exact path="/schedule-tour" element={<ScheduleTour />} />
          <Route exact path="/add-property" element={<AddPropertyForm />} />
          {/* Optionally redirect logged-in users away from login/register */}
          {(token || isAuthenticated) && (
            <>
              <Route
                path="/login"
                element={<Navigate to="/properties" replace />}
              />
              <Route
                path="/register"
                element={<Navigate to="/properties" replace />}
              />
            </>
          )}
        </Routes>
      </Router>
    </AppProviders>
  );
};

export default App;
