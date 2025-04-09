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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(''); // Clear previous errors
    try {
      const response = await axios.post('https://reqres.in/api/login', {
        email,
        password
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      // Check if the request was successful (status 200) and contains a token
      if (response.status === 200 && response.data.token) {
        console.log('Login successful, token:', response.data.token); // Debug
        localStorage.setItem('token', response.data.token);
        navigate('/users');
      } else {
        throw new Error('Invalid login response');
      }
    } catch (err) {
      console.error('Login error:', err.response ? err.response.data : err.message);
      // Handle specific error cases from ReqRes
      if (err.response && err.response.status === 400) {
        setError('Invalid email or password. Please try again.');
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
