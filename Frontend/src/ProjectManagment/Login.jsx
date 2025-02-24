import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/login', { password });
      
      if (response.status === 200) {
        // Başarılı giriş yaptıktan sonra localStorage'da 'isAuthenticated' değerini true olarak kaydet
        localStorage.setItem('isAuthenticated', 'true');
        navigate('/Dashboard'); // Giriş başarılı, dashboard'a yönlendir
      }
    } catch (err) {
      setError('Şifre yanlış!'); // Hata mesajı
    }
  };

  return (
    <div>
      <h1>Admin Girişi</h1>
      <form onSubmit={handleLogin}>
        <input
          type="password"
          placeholder="Şifrenizi girin"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Giriş Yap</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default Login;
