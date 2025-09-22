import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { getAuthorization } from "../util/getAuthorization";

const NavLinks = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const getAuth = async () => {
      console.log("Checking authentication");
      setIsAuthenticated(await getAuthorization());
    };
    getAuth();
  }, []);

  const handleLogout = () => {
    //erase JWT cookie and reload page
    document.cookie = "session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    console.log("Logged out");
    window.location.reload();
  };

  return (
    <>
      <nav className="flex-1 flex justify-center space-x-4">
        <NavLink to="/" className="text-lg font-medium text-white hover:text-gray-300">
          Home
        </NavLink>
        {isAuthenticated && (
          <NavLink to="/dashboard" className="text-lg font-medium text-white hover:text-gray-300">
            Dashboard
          </NavLink>
        )}
        <NavLink to="/book" className="text-lg font-medium text-white hover:text-gray-300">
          Book
        </NavLink>
        <NavLink to="/Appointments" className="text-lg font-medium text-white hover:text-gray-300">
          Appointments
        </NavLink>
      </nav>
      {!isAuthenticated && (
        <NavLink to="/login" className="text-lg font-medium text-white hover:text-gray-300">
          Login
        </NavLink>
      )}
      {isAuthenticated && (
        <NavLink className="text-lg font-medium text-white hover:text-gray-300" to="/logout">
          Log Out
        </NavLink>
      )}
    </>
  );
};

export default NavLinks;
