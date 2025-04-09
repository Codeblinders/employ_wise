// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import UserList from './components/UserList';
import EditUser from './components/EditUser';
import "./index.css"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route 
          path="/users" 
          element={
            localStorage.getItem('token') ? <UserList /> : <Navigate to="/login" />
          } 
        />
        <Route 
          path="/edit/:id" 
          element={
            localStorage.getItem('token') ? <EditUser /> : <Navigate to="/login" />
          } 
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;