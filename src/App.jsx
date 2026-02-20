import { useState } from 'react';
import AuthModal from './components/authModal';

export default function App() {
  const [user, setUser] = useState(null);

  return (
    <div style={{ padding: '20px' }}>
      <h1>WriteHere</h1>
      {user ? (
        <div>
          <p>Welcome, {user.username}!</p>
          <button onClick={() => setUser(null)}>Logout</button>
        </div>
      ) : (
        <AuthModal onSuccess={() => setUser({ username: 'user' })} />
      )}
    </div>
  );
}
