import React,{useState} from "react";
import { Link,useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
const [form,setForm]=useState({ email:"",password:""});
const[submitting,setSubmitting]=useState(false);
const navigate=useNavigate();

function handleChange(e){
  console.log(e.target);
  const {name,value}=e.target;
  setForm({...form,[name]:value});
}
async function handleSubmit(e){
  e.preventDefault();
  setSubmitting(true);
  axios.post("http://localhost:5000/auth/login",{
    email:form.email,
    password:form.password
  },{
    withCredentials:true
  }).then((res)=>{
    console.log(res.data);
    navigate("/");
  }).catch((err)=>{
    console.error(err);
    alert("Login failed. Please check your credentials.");
  }).finally(()=>{
    setSubmitting(false);
  });
}
  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Sign In</h2>
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              placeholder="Email" 
              required 
              value={form.email}
              onChange={(e) => setForm({...form, email: e.target.value})}
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
              onChange={(e) => setForm({...form, password: e.target.value})}
            />
          </div>
          <button className="auth-btn" type="submit">Login</button>
        </form>
        <p className="auth-footer">
          New user? <Link to="/register" className="auth-link">Create an account</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
