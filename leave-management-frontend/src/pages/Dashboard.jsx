import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import ApplyLeave from "../components/ApplyLeave";
import MyLeaves from "../components/MyLeaves";
import AllLeaves from "../components/AllLeaves";

function Dashboard() {
  const { user } = useContext(AuthContext);
  const isManager = user?.role === "manager";

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p>Welcome back, {user?.name || user?.email}!</p>
      </div>

      <div className="dashboard-content">
        <div className="dashboard-section">
          <ApplyLeave />
        </div>
        <div className="dashboard-section">
          <MyLeaves />
        </div>
        {isManager && (
          <div className="dashboard-section">
            <AllLeaves />
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;