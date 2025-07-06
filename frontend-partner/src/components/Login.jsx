import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const users = {
  Bricklayer: {
    customer_id: 'CUST1001',
    email: 'brick@example.com',
    member_type: 'Bricklayer',
    member_flag: 'Y',
  },
  Plumber: {
    customer_id: 'CUST1002',
    email: 'plumb@example.com',
    member_type: 'Plumber',
    member_flag: 'Y',
  },
  Guest: {
    customer_id: 'CUST9999',
    email: 'guest@example.com',
    member_type: 'Guest',
    member_flag: 'N',
  },
};

function Login() {
  const [trade, setTrade] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    const user = users[trade];
    if (user && user.member_flag === 'Y') {
      localStorage.setItem('currentUser', JSON.stringify(user));
      navigate('/dashboard');
    } else {
      setError('You are not currently eligible for the loyalty program.');
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Welcome to Eden Bray</h1>
      <h3>Select your trade to log in:</h3>
      <select style={styles.select} value={trade} onChange={(e) => {
        setTrade(e.target.value);
        setError('');
      }}>
        <option value="">-- Select Trade --</option>
        {Object.keys(users).map((key) => (
          <option key={key} value={key}>{key}</option>
        ))}
      </select>
      <br /><br />
      <button style={styles.button} onClick={handleLogin} disabled={!trade}>Login</button>
      {error && <p style={styles.error}>{error}</p>}
    </div>
  );
}

const styles = {
  container: {
    padding: 20,
    maxWidth: 400,
    margin: '80px auto',
    border: '1px solid #ccc',
    borderRadius: 8,
    backgroundColor: '#fff',
    textAlign: 'center',
    fontFamily: 'sans-serif',
  },
  title: {
    color: '#cb2026',
    marginBottom: 20,
  },
  select: {
    width: '100%',
    padding: 8,
    fontSize: 16,
  },
  button: {
    padding: '10px 20px',
    fontSize: 16,
    backgroundColor: '#cb2026',
    color: '#fff',
    border: 'none',
    borderRadius: 4,
    cursor: 'pointer',
  },
  error: {
    color: 'red',
    marginTop: 15,
  },
};

export default Login;
