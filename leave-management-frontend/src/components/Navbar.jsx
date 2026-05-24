import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <div className="navbar-brand">
          <h1>Leave Management</h1>
          <p>Easy time-off tracking for your team</p>
        </div>

        <div className="navbar-links">
          {!user ? (
            <>
              <NavLink to="/" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Login</NavLink>
              <NavLink to="/register" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Register</NavLink>
            </>
          ) : (
            <>
              <NavLink to="/dashboard" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Dashboard</NavLink>
              <span className="nav-user">Hello, {user.name || user.email}</span>
              <button onClick={handleLogout} className="btn-logout">Logout</button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;