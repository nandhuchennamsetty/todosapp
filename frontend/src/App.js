import React, { useState } from "react";
import TodoMain from "./components/TodoMain";
import Login from "./components/accounts/Login";
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import Header from "./components/header/Header"; 
// import Home from "./components/Home"; // Import Home component if needed
import DataProvider from "./components/context/DataProvider"; // Assuming you're using context

const PrivateRoute = ({ isAuthenticated, ...props }) => {
  return isAuthenticated ? (
    <>
      <Header />
      <Outlet />
    </>
  ) : (
    <Navigate replace to="/login" />
  );
};

const App = () => {
  const [isAuthenticated, isUserAuthenticated] = useState(false);

  return (
    <DataProvider>
      <BrowserRouter>
        <div style={{ marginTop: 64 }}></div>
        <Routes>
          <Route
            path="/login"
            element={<Login isUserAuthenticated={isUserAuthenticated} />}
          />
          <Route
            path="/"
            element={<PrivateRoute isAuthenticated={isAuthenticated} />}
          >
            <Route path="/" element={<TodoMain />} />{" "}
            {/* Assuming Home refers to TodoMain */}
          </Route>
        </Routes>{" "}
        {/* Closing the Routes tag */}
      </BrowserRouter>
    </DataProvider>
  );
};

export default App