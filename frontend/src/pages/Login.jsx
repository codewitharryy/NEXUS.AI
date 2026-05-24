import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';


const Login = () => {
    const [ form, setForm ] = useState({ email: '', password: '' });
    const [ submitting, setSubmitting ] = useState(false);
    const navigate = useNavigate();
    

    function handleChange(e) {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setSubmitting(true);


        console.log(form);

        axios.post("https://nexus-ai-vwya.onrender.comm/api/auth/login", {
            email: form.email,
            password: form.password
        },
            {
                withCredentials: true
            }
        ).then((res) => {
            console.log(res);
            navigate("/");
        }).catch((err) => {
            console.error(err);
        }).finally(() => {
            setSubmitting(false);
        });

    }

    return (
        <div className="center-min-h-screen">
            <div className="auth-card" role="main" aria-labelledby="login-heading">
                <header className="auth-header">
                    <h1 id="login-heading">Welcome Back</h1>
                    <p className="auth-sub">Sign in to Nexus<span className="ai-accent">.AI</span> and continue your journey.</p>
                </header>
                <form className="auth-form" onSubmit={handleSubmit} noValidate>
                    <div className="field-group">
                        <label htmlFor="login-email">Email</label>
                        <input id="login-email" name="email" type="email" autoComplete="email" placeholder="you@example.com"  onChange={handleChange} required />
                    </div>
                    <div className="field-group">
                        <label htmlFor="login-password">Password</label>
                        <input id="login-password" name="password" type="password" autoComplete="current-password" placeholder="Your password"  onChange={handleChange} required />
                    </div>
                    <button type="submit" className="primary-btn" disabled={submitting}>
                        {submitting ? 'Signing in...' : 'Sign in'}
                    </button>
                </form>
                <p className="auth-alt">Need an account? <Link to="/register">Create one</Link></p>
            </div>
        </div>
    );
};

export default Login;

