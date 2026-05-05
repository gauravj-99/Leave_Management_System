import ApplyLeave from "../components/ApplyLeave";
import MyLeaves from "../components/MyLeaves";
import AllLeaves from "../components/AllLeaves";

function Dashboard() {
  return (
    <>
      <h2>Dashboard</h2>
      <ApplyLeave />
      <MyLeaves />
      <AllLeaves />
    </>
  );
}

export default Dashboard;