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
        <div>
          <p className="section-label">Dashboard</p>
          <h1>Welcome back, {user?.name || user?.email}!</h1>
          <p className="section-subtitle">Track leave requests and stay on top of approvals in one central place.</p>
        </div>
      </div>

      <div className="dashboard-hero card">
        <div>
          <h2>Start your next request</h2>
          <p>Apply for leave, review your history, and manage approvals with a cleaner, faster interface.</p>
        </div>
        <div className="hero-actions">
          <a href="#apply-leave" className="btn-primary btn-hero">Go to Apply Leave</a>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="dashboard-section" id="apply-leave">
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