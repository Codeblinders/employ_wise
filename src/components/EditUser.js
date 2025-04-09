// src/components/EditUser.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './EditUser.module.css';

function EditUser() {
  const [user, setUser] = useState({ first_name: '', last_name: '', email: '' });
  const [message, setMessage] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`https://reqres.in/api/users/${id}`);
        const updatedUsers = JSON.parse(localStorage.getItem('updatedUsers') || '{}');
        setUser({
          ...response.data.data,
          ...updatedUsers[id]
        });
      } catch (err) {
        console.error('Error fetching user:', err);
        setMessage('Error loading user data');
      }
    };
    fetchUser();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`https://reqres.in/api/users/${id}`, user);
      if (response.status === 200) {
        const updatedUsers = {
          ...JSON.parse(localStorage.getItem('updatedUsers') || '{}'),
          [id]: user
        };
        localStorage.setItem('updatedUsers', JSON.stringify(updatedUsers));
        setMessage('User updated successfully!');
        setTimeout(() => {
          navigate('/users', { 
            state: { 
              message: 'User updated successfully!',
              updatedUser: { ...user, id: parseInt(id) }
            } 
          });
        }, 1500);
      }
    } catch (err) {
      setMessage('Error updating user');
      console.error('Error updating user:', err);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Edit User</h2>
      {message && (
        <div className={`${styles.alert} ${message.includes('Error') ? styles.error : styles.success}`}>
          {message}
        </div>
      )}
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <input
            type="text"
            className={styles.input}
            placeholder="First Name"
            value={user.first_name || ''}
            onChange={(e) => setUser({ ...user, first_name: e.target.value })}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <input
            type="text"
            className={styles.input}
            placeholder="Last Name"
            value={user.last_name || ''}
            onChange={(e) => setUser({ ...user, last_name: e.target.value })}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <input
            type="email"
            className={styles.input}
            placeholder="Email"
            value={user.email || ''}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            required
          />
        </div>
        <div className={styles.buttonGroup}>
          <button type="submit" className={styles.submitBtn}>Update</button>
          <button
            type="button"
            className={styles.cancelBtn}
            onClick={() => navigate('/users')}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditUser;