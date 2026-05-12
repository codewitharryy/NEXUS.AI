import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [form, setForm] = useState({ firstname: "", lastname: "", email: "", password: "" });
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    axios.post("http://localhost:5000/auth/register", {
      fullName:{
        firstName: form.firstname,
        lastName: form.lastname
      },
      email: form.email,
      password: form.password
    }, {
      withCredentials: true
    }).then((res) => {
      console.log(res.data);
      navigate("/login");
    }).catch((err) => {
      console.error(err);
      alert("Registration failed. Please try again.");
    }).finally(() => {
      setSubmitting(false);
    });
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Create Account</h2>
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="firstname">First Name</label>
            <input 
              type="text" 
              id="firstname" 
              name="firstname" 
              placeholder="First Name" 
              required 
              value={form.firstname}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastname">Last Name</label>
            <input 
              type="text" 
              id="lastname" 
              name="lastname" 
              placeholder="Last Name" 
              required 
              value={form.lastname}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              placeholder="Email" 
              required 
              value={form.email}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password" 
              name="password" 
              placeholder="Password" 
              required 
              value={form.password}
              onChange={handleChange}
            />
          </div>
          <button className="auth-btn" type="submit" disabled={submitting}>
            {submitting ? "Registering..." : "Register"}
          </button>
        </form>
        <p className="auth-footer">
          Already have an account? <Link to="/login" className="auth-link">Sign in here</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
