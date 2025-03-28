import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function Login() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}/api/login`, { password });
      
      if (response.status === 200) {
        localStorage.setItem('isAuthenticated', 'true');
        const from = location.state?.from?.pathname || '/Dashboard';
        navigate(from, { replace: true });
      }
    } catch (err) {
      setError('Şifre yanlış!');
      setTimeout(() => setError(''), 3000);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-container">
      <div className="welcome-message">
        <h2>YamYam Yönetim Paneline Hoşgeldiniz</h2>
        <p>YamYam Yönetim Paneline Giriş Yap</p>
      </div>
      
      <form className="login-form" onSubmit={handleLogin}>
        <div className="logo-container">
          <h1>YamYam Admin</h1>
          <div className="logo-underline"></div>
        </div>
        
        <div className="password-container">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Şifrenizi girin"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            className="toggle-password"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? "🔒" : "👁️"}
          </button>
        </div>

        <button type="submit" className="login-button">
          Giriş Yap
        </button>

        {error && (
          <div className="error-message">
            <p>{error}</p>
          </div>
        )}
      </form>
    </div>
  );
}

export default Login;
