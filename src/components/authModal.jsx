import { useState } from 'react';
import axios from 'axios';

export default function AuthModal({ onSuccess }) {
  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint =
        mode === 'login' ? '/api/auth/login' : '/api/auth/signup';
      await axios.post(
        endpoint,
        { email, password, username },
        {
          withCredentials: true,
        }
      );
      onSuccess();
    } catch (err) {
      setError(err.response?.data?.error || 'Error');
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '300px' }}>
      <h2>{mode === 'login' ? 'Login' : 'Sign Up'}</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        {mode === 'signup' && (
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        )}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">{mode === 'login' ? 'Login' : 'Sign Up'}</button>
      </form>

      <button onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}>
        {mode === 'login' ? 'Need account?' : 'Have account?'}
      </button>
    </div>
  );
}
