import { useEffect, useState } from "react";
import API from "../services/api";

function AllLeaves() {
  const [leaves, setLeaves] = useState([]);

  const updateStatus = async (id, status) => {
    await API.post("/update_leave", { leaveId: id, status });
    alert("Updated");
  };

  useEffect(() => {
    API.get("/all_leaves").then(res => setLeaves(res.data));
  }, []);

  return (
    <>
      <h3>All Leaves (Manager)</h3>
      {leaves.map(l => (
        <div key={l._id}>
          {l.userid?.name} | {l.fromDate} → {l.toDate} | {l.status}
          <button onClick={() => updateStatus(l._id, "approved")}>Approve</button>
          <button onClick={() => updateStatus(l._id, "reject")}>Reject</button>
        </div>
      ))}
    </>
  );
}

export default AllLeaves;