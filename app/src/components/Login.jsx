import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Login() {
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (role === "student") navigate("/student");
    else if (role === "teacher") navigate("/teacher");
    else if (role === "admin") navigate("/admin");
  };

  return (
    <div>
      <h2>Login as:</h2>
      <select onChange={(e) => setRole(e.target.value)}>
        <option value="">Select role</option>
        <option value="student">Student</option>
        <option value="teacher">Teacher</option>
        <option value="admin">Admin</option>
      </select>
      <button onClick={handleLogin}>Go</button>
    </div>
  );
}