import React from "react";
import { Route, Routes } from "react-router-dom";

import HomePage from "../pages/HomePage";
import ReservationsPage from "../pages/ReservationsPage";
import ReservationPage from "../pages/ReservationPage";
import Login from "../pages/Login";
import { PrivateRoute } from "./PrivateRoute";

export const RouterNavigation = () => {
  return (
    <Routes>
      <Route path="/signin" element={<Login />} />
      <Route
        path=""
        element={
          <PrivateRoute>
            <HomePage />
          </PrivateRoute>
        }
      />
      <Route
        path="/home"
        element={
          <PrivateRoute>
            <HomePage />
          </PrivateRoute>
        }
      />
      <Route
        path="/reservation"
        element={
          <PrivateRoute>
            <ReservationPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/reservations"
        element={
          <PrivateRoute>
            <ReservationsPage />
          </PrivateRoute>
        }
      />
      {/* TODO.- */}
      {/* <Route path="/*" element={<ErrorPage />} /> */}
    </Routes>
  );
};
