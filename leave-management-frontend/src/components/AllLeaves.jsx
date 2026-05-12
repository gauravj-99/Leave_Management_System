import { useEffect, useState } from "react";
import API, { handleApiError } from "../services/api";

function AllLeaves() {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState(null);

  const updateStatus = async (id, status) => {
    setUpdatingId(id);
    try {
      await API.post("/update_leave", { leaveId: id, status });
      setLeaves(leaves.map(l => l._id === id ? { ...l, status } : l));
    } catch (err) {
      setError(handleApiError(err));
    } finally {
      setUpdatingId(null);
    }
  };

  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const res = await API.get("/all_leaves");
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
      <h3>All Leave Requests (Manager View)</h3>
      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <div className="loading">Loading leave requests...</div>
      ) : leaves.length === 0 ? (
        <div className="empty-state">No leave requests to review</div>
      ) : (
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Employee Name</th>
                <th>From Date</th>
                <th>To Date</th>
                <th>Reason</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {leaves.map(l => (
                <tr key={l._id}>
                  <td>{l.userid?.name || "Unknown"}</td>
                  <td>{new Date(l.fromDate).toLocaleDateString()}</td>
                  <td>{new Date(l.toDate).toLocaleDateString()}</td>
                  <td>{l.reason}</td>
                  <td>{getStatusBadge(l.status)}</td>
                  <td>
                    <div className="action-buttons">
                      <button
                        onClick={() => updateStatus(l._id, "approved")}
                        disabled={updatingId === l._id || l.status !== "pending"}
                        className="btn-approve"
                      >
                        {updatingId === l._id ? "..." : "Approve"}
                      </button>
                      <button
                        onClick={() => updateStatus(l._id, "reject")}
                        disabled={updatingId === l._id || l.status !== "pending"}
                        className="btn-reject"
                      >
                        {updatingId === l._id ? "..." : "Reject"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AllLeaves;