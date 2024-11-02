import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../actions/authActions";
import { Link } from "react-router-dom";
import { useAuth } from "../../services/auth-provider";

const RegisterPage = ({ history }) => {
  const { register, error, loading, user, success, setSuccess } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("buyer");

  const handleSubmit = (e) => {
    e.preventDefault();
    register(name, email, password, role);
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Register</h1>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}
      {loading && (
        <p className="text-black-500">{"user registration is in progress"}</p>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            // autocomplete="current-password"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Role</label>
          <select
            className="w-full p-2 border border-gray-300 rounded"
            required
            defaultValue={"buyer"}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value={"agent"}>Agent</option>
            <option value={"buyer"}>Buyer</option>
          </select>
        </div>

        <div className="w-full flex justify-between items-center">
          <button
            type="submit"
            className={`bg-blue-500 text-white px-4 py-2 rounded ${
              loading ? `cursor-not-allowed` : `cursor-pointer`
            }`}
            disabled={loading ? true : false}
          >
            Register
          </button>
          <div>
            <span className="">Already have an account?</span>
            <Link to={"/login"}>
              <span className="px-1 cursor-pointer text-blue-700">Login</span>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
