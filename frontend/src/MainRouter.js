import React, { useContext } from "react";
import { StateContext } from "./contexts/StateContext";
import { Routes, Route, useLocation, Navigate, Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "../src/components/HomePage/Home";
import Login from "./components/auth/Login";
import Logout from "./components/auth/Logout";
import Signup from "./components/auth/Signup";
import ResetPassword from "./components/auth/ResetPassword";
import LetterParentalMode from "./components/letterToSanta/LetterParentalMode";
import SecretSantaPairs from "./components/secretSanta/SecretSantaPairs";
import AboutUs from "./components/AboutUs";
import AdventCalendar from "./components/adventCalendar/AdventCalendar";
import ParentViewList from "./components/letterToSanta/ParentViewList";
import ChildView from "./components/letterToSanta/ChildView";
import GiftForFriends from "./components/giftList/GiftForFriends";
import SecretInput from "./components/secretSanta/SecretInput";

function Layout() {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

const MainRouter = () => {
  const { user, childMode } = useContext(StateContext);
  const location = useLocation();

  const RequireAuth = ({ children }) => {
    if (!user || Object.keys(user).length === 0) {
      return <Navigate to="/login" state={{ from: location }} replace />;
    }
    return children;
  };

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/calendar" element={<AdventCalendar />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/reset-password/:uuid" element={<ResetPassword />} />
        <Route
          path="/parental-view-list"
          element={
            <RequireAuth>
              <ParentViewList />
            </RequireAuth>
          }
        />
        <Route
          path="/letter"
          element={
            <RequireAuth>
              {childMode ? <ChildView /> : <LetterParentalMode />}
            </RequireAuth>
          }
        />
        <Route
          path="/gift-list"
          element={
            <RequireAuth>
              <GiftForFriends />
            </RequireAuth>
          }
        />
        <Route
          path="/secret-santa"
          element={
            <RequireAuth>
              <SecretInput />
            </RequireAuth>
          }
        />
        <Route
          path="/secret-santa-pairs"
          element={
            <RequireAuth>
              <SecretSantaPairs />
            </RequireAuth>
          }
        />
      </Route>
    </Routes>
  );
};

export default MainRouter;
