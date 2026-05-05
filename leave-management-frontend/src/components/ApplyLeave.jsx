import { useState } from "react";
import API from "../services/api";

function ApplyLeave() {
  const [leave, setLeave] = useState({});

  const apply = async (e) => {
    e.preventDefault();
    await API.post("/apply_leave", leave);
    alert("Leave Applied");
  };

  return (
    <form onSubmit={apply}>
      <h3>Apply Leave</h3>
      <input type="date" onChange={(e) => setLeave({ ...leave, fromDate: e.target.value })} />
      <input type="date" onChange={(e) => setLeave({ ...leave, toDate: e.target.value })} />
      <input placeholder="Reason" onChange={(e) => setLeave({ ...leave, reason: e.target.value })} />
      <button>Apply</button>
    </form>
  );
}

export default ApplyLeave;