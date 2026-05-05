import { useState } from "react";
import API from "../services/api";

function Register() {
  const [form, setForm] = useState({});

  const handleRegister = async (e) => {
    e.preventDefault();
    await API.post("/register", form);
    alert("Registered Successfully");
  };

  return (
    <form onSubmit={handleRegister}>
      <h2>Register</h2>
      <input placeholder="Name" onChange={(e) => setForm({ ...form, name: e.target.value })} />
      <input placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <input placeholder="Password" type="password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
      <select onChange={(e) => setForm({ ...form, role: e.target.value })}>
        <option value="employee">Employee</option>
        <option value="manager">Manager</option>
      </select>
      <button>Register</button>
    </form>
  );
}

export default Register;