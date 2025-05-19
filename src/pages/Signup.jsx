import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api";
import Alert from "../components/Alert";
//declare both email and password as object 
const Signup = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  
  //spread operatopr to copy form, name of the input field that triggered the change.
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        await axios.post("/auth/signup", form);
        setMessage("Signup successful! Please login.");
        setTimeout(() => navigate("/login"), 1000);
      } catch (err) {
        setMessage( "Signup failed.");
      }
      
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded shadow">
      <h2 className="text-xl font-bold mb-4">Sign Up</h2>
      <Alert message={message} />
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          type="text"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          className="w-full border p-2 rounded"
          required
        />
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
        <button type="submit" className="bg-green-600 text-white w-full p-2 rounded">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
