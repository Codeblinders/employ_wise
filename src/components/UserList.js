import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './UserList.module.css';

function UserList() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [search, setSearch] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchAndMergeUsers = async () => {
      try {
        const response = await axios.get(`https://reqres.in/api/users?page=${page}`);
        let fetchedUsers = response.data.data;

        // Retrieve locally stored updates and deleted IDs
        const updatedUsers = JSON.parse(localStorage.getItem('updatedUsers') || '{}');
        const deletedUserIds = new Set(JSON.parse(localStorage.getItem('deletedUserIds') || '[]'));

        // Merge updates and filter out deleted users
        fetchedUsers = fetchedUsers
          .filter(user => !deletedUserIds.has(user.id))
          .map(user => ({
            ...user,
            ...updatedUsers[user.id]
          }));

        setUsers(fetchedUsers);
        setTotalPages(response.data.total_pages);
      } catch (err) {
        console.error('Error fetching users:', err);
        setMessage('Error loading users');
        setTimeout(() => setMessage(''), 2000);
      }
    };
    fetchAndMergeUsers();

    // Handle navigation state messages
    if (location.state?.message) {
      setMessage(location.state.message);
      if (location.state.updatedUser) {
        const updatedUsers = {
          ...JSON.parse(localStorage.getItem('updatedUsers') || '{}'),
          [location.state.updatedUser.id]: location.state.updatedUser
        };
        localStorage.setItem('updatedUsers', JSON.stringify(updatedUsers));
        // Update the local state immediately
        setUsers(prevUsers => 
          prevUsers.map(user => 
            user.id === location.state.updatedUser.id ? location.state.updatedUser : user
          )
        );
      }
      setTimeout(() => {
        setMessage('');
        navigate(location.pathname, { replace: true }); // Clear location state
      }, 2000);
    }
  }, [page, location, navigate]);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`https://reqres.in/api/users/${id}`);
      if (response.status === 204) {
        setUsers(users.filter(user => user.id !== id));
        // Update deleted user IDs in localStorage
        const deletedUserIds = new Set(JSON.parse(localStorage.getItem('deletedUserIds') || '[]'));
        deletedUserIds.add(id);
        localStorage.setItem('deletedUserIds', JSON.stringify([...deletedUserIds]));
        setMessage('User deleted successfully!');
        setTimeout(() => setMessage(''), 2000);
      }
    } catch (err) {
      setMessage('Error deleting user');
      setTimeout(() => setMessage(''), 2000);
      console.error('Error deleting user:', err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('updatedUsers');
    localStorage.removeItem('deletedUserIds');
    navigate('/login');
  };

  const filteredUsers = users.filter(user =>
    `${user.first_name} ${user.last_name}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Users</h2>
        <button className={styles.logoutBtn} onClick={handleLogout}>
          Logout
        </button>
      </div>
      {message && (
        <div className={`${styles.alert} ${message.includes('Error') ? styles.error : styles.success}`}>
          {message}
        </div>
      )}
      <input
        type="text"
        className={styles.search}
        placeholder="Search users..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className={styles.grid}>
        {filteredUsers.map(user => (
          <div key={user.id} className={styles.card}>
            <img src={user.avatar} alt="avatar" className={styles.avatar} />
            <div className={styles.cardContent}>
              <h5 className={styles.cardTitle}>{user.first_name} {user.last_name}</h5>
              <div className={styles.buttonGroup}>
                <button
                  className={styles.editBtn}
                  onClick={() => navigate(`/edit/${user.id}`)}
                >
                  Edit
                </button>
                <button
                  className={styles.deleteBtn}
                  onClick={() => handleDelete(user.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.pagination}>
        <button
          className={styles.pageBtn}
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
        >
          Previous
        </button>
        <span className={styles.pageInfo}>Page {page} of {totalPages}</span>
        <button
          className={styles.pageBtn}
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default UserList;