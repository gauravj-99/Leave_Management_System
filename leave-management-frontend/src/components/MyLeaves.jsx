import { useEffect, useState } from "react";
import API from "../services/api";

function MyLeaves() {
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    API.get("/my_leaves").then(res => setLeaves(res.data));
  }, []);

  return (
    <>
      <h3>My Leaves</h3>
      {leaves.map(l => (
        <div key={l._id}>
          {l.fromDate} - {l.toDate} | {l.status}
        </div>
      ))}
    </>
  );
}

export default MyLeaves;