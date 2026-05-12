import { useEffect, useState } from "react";
import API, { handleApiError } from "../services/api";

function MyLeaves() {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const res = await API.get("/my_leaves");
        setLeaves(res.data || []);
        setError("");
      } catch (err) {
        setError(handleApiError(err));
        setLeaves([]);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaves();
  }, []);

  const getStatusBadge = (status) => {
    const statusClass = `status-badge status-${status?.toLowerCase() || "pending"}`;
    return <span className={statusClass}>{status || "Pending"}</span>;
  };

  return (
    <div className="card">
      <h3>My Leave Requests</h3>
      {error && <div className="error-message">{error}</div>}
      
      {loading ? (
        <div className="loading">Loading your leaves...</div>
      ) : leaves.length === 0 ? (
        <div className="empty-state">No leave requests found</div>
      ) : (
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>From Date</th>
                <th>To Date</th>
                <th>Reason</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {leaves.map(l => (
                <tr key={l._id}>
                  <td>{new Date(l.fromDate).toLocaleDateString()}</td>
                  <td>{new Date(l.toDate).toLocaleDateString()}</td>
                  <td>{l.reason}</td>
                  <td>{getStatusBadge(l.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default MyLeaves;