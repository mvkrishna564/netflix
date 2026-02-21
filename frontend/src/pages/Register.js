import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../axios';
import { useAuth } from '../context/AuthContext';
import './Auth.css';

const Register = () => {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const { dispatch, loading, error } = useAuth();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: 'LOGIN_START' });
    try {
      const { data } = await axios.post('/auth/register', form);
      dispatch({ type: 'LOGIN_SUCCESS', payload: data });
    } catch (err) {
      dispatch({
        type: 'LOGIN_FAILURE',
        payload: err.response?.data?.message || 'Registration failed',
      });
    }
  };

  return (
    <div className="auth">
      <div className="auth__background">
        <img
          src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1600"
          alt="bg"
        />
        <div className="auth__overlay" />
      </div>

      <div className="auth__logo">NETFLIX</div>

      <div className="auth__form-container">
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit} className="auth__form">
          <div className="auth__field">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={form.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="auth__field">
            <input
              type="email"
              name="email"
              placeholder="Email address"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="auth__field">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              minLength={6}
            />
          </div>
          {error && <div className="auth__error">{error}</div>}
          <button type="submit" className="auth__submit" disabled={loading}>
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>
        <div className="auth__footer">
          <span>Already have an account? </span>
          <Link to="/login">Sign in now</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
