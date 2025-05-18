import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api";
import Alert from "../components/Alert";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [alert, setAlert] = useState({ message: "", type: "" });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      setAlert({ message: "Login successful!", type: "success" });
      setTimeout(() => navigate("/blogs"), 1000);
    } catch (err) {
      setAlert({ message: err.response?.data?.message || "Login failed.", type: "error" });
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded shadow">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      <Alert message={alert.message} type={alert.type} />
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full border p-2 rounded"
          required
        />
        <input
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          className="w-full border p-2 rounded"
          required
        />
        <button type="submit" className="bg-blue-600 text-white w-full p-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
