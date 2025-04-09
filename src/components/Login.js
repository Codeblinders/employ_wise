// src/components/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://reqres.in/api/login', {
        email,
        password
      });
      localStorage.setItem('token', response.data.token);
      navigate('/users');
    } catch (err) {
      setError('Invalid credentials');
      setTimeout(() => setError(''), 2000);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginBox}>
        <h2 className={styles.title}>Welcome Back</h2>
        {error && (
          <div className={`${styles.alert} ${styles.error}`}>
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
        <input
      type="email"
    id="email"
    className={styles.input}
    placeholder=" "
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    required
  />
  <label htmlFor="email" className={styles.label}>Email</label>
</div>

<div className={styles.formGroup}>
  <input
    type="password"
    id="password"
    className={styles.input}
    placeholder=" "
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    required
  />
  <label htmlFor="password" className={styles.label}>Password</label>
</div>

          <button type="submit" className={styles.submitBtn}>
            Sign In
          </button>
        </form>
        <p className={styles.footerText}>
          Use credentials: eve.holt@reqres.in / cityslicka
        </p>
      </div>
    </div>
  );
}

export default Login;