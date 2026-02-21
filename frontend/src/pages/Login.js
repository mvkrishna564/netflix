import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../axios';
import { useAuth } from '../context/AuthContext';
import './Auth.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { dispatch, loading, error } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: 'LOGIN_START' });
    try {
      const { data } = await axios.post('/auth/login', { email, password });
      dispatch({ type: 'LOGIN_SUCCESS', payload: data });
    } catch (err) {
      dispatch({
        type: 'LOGIN_FAILURE',
        payload: err.response?.data?.message || 'Login failed',
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
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit} className="auth__form">
          <div className="auth__field">
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="auth__field">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <div className="auth__error">{error}</div>}
          <button type="submit" className="auth__submit" disabled={loading}>
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
          <div className="auth__help">
            <label className="auth__remember">
              <input type="checkbox" /> Remember me
            </label>
            <a href="#!">Need help?</a>
          </div>
        </form>
        <div className="auth__footer">
          <span>New to Netflix? </span>
          <Link to="/register">Sign up now</Link>
        </div>
        <p className="auth__disclaimer">
          This page is protected by Google reCAPTCHA to ensure you're not a bot.
        </p>
      </div>
    </div>
  );
};

export default Login;
