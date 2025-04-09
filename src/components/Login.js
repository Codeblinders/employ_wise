// src/components/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const VALID_CREDENTIALS = {
    email: 'eve.holt@reqres.in',
    password: 'cityslicka'
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(''); // Clear previous errors

    // Pre-check credentials (optional fallback)
    if (email !== VALID_CREDENTIALS.email || password !== VALID_CREDENTIALS.password) {
      setError('Please use the correct credentials: eve.holt@reqres.in / cityslicka');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('https://reqres.in/api/login', {
        email,
        password
      }, {
        headers: {
          'Content-Type': 'application/json'
        },
        timeout: 5000 // 5-second timeout
      });

      // Validate successful response
      if (response.status === 200 && response.data.token) {
        console.log('Login successful, token:', response.data.token); // Debug
        localStorage.setItem('token', response.data.token);
        navigate('/users');
      } else {
        throw new Error('Invalid login response from server');
      }
    } catch (err) {
      console.error('Login error:', err.response ? err.response.data : err.message);
      if (err.response && err.response.status === 400) {
        setError('Invalid email or password. Please use: eve.holt@reqres.in / cityslicka');
      } else {
        setError('Network error or server issue. Please try again later.');
      }
      setTimeout(() => setError(''), 2000);
    } finally {
      setLoading(false);
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
            <label htmlFor="email" className={styles.label}>Email</label>
            <input
              type="email"
              id="email"
              className={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.label}>Password</label>
            <input
              type="password"
              id="password"
              className={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          <button type="submit" className={styles.submitBtn} disabled={loading}>
            {loading ? 'Logging in...' : 'Sign In'}
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
