import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Grid, Paper } from '@mui/material';
import './CustomerForm.css'; // Import your CSS file for custom styles

const CustomerForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [source, setSource] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      const res = await axios.post('http://localhost:5000/api/customers', {
        name,
        email,
        phone,
        address,
        source,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('Customer added:', res.data);
      navigate('/dashboard');
    } catch (err) {
      console.error('Error adding customer:', err);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} className="form-container">
        <Typography variant="h5" gutterBottom className="form-title">Add Customer</Typography>
        <form onSubmit={handleSubmit} className="form">
          <TextField
            label="Name"
            fullWidth
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            label="Phone"
            fullWidth
            margin="normal"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <TextField
            label="Address"
            fullWidth
            margin="normal"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <TextField
            label="Source"
            fullWidth
            margin="normal"
            value={source}
            onChange={(e) => setSource(e.target.value)}
            placeholder='Ex: new,contacted,interested'
          />
          <Button type="submit" variant="contained" color="primary" fullWidth className="submit-button">Add Customer</Button>
        </form>
      </Paper>
    </Container>
  );
};

export default CustomerForm;
