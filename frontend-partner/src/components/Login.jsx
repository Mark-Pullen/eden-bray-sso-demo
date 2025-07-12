import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const users = {
  Bricklayer: { customer_id: 'CUST1001', email: 'brick@example.com', member_type: 'Bricklayer', member_flag: 'Y' },
  Plumber: { customer_id: 'CUST1002', email: 'plumb@example.com', member_type: 'Plumber', member_flag: 'Y' },
  Carpenter: { customer_id: 'CUST1003', email: 'carp@example.com', member_type: 'Carpenter', member_flag: 'Y' },
  Electrician: { customer_id: 'CUST1004', email: 'spark@example.com', member_type: 'Electrician', member_flag: 'N' }, // not yet a member
  Plasterer: { customer_id: 'CUST1005', email: 'smooth@example.com', member_type: 'Plasterer', member_flag: 'Y' },
};

function Login() {
  const [trade, setTrade] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (trade) {
      const user = users[trade];
      if (user.member_flag === 'Y') {
        localStorage.setItem('currentUser', JSON.stringify(user));
        navigate('/dashboard');
      } else {
        setError(`Sorry, ${user.member_type}s are not eligible for the loyalty program.`);
      }
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h1 style={styles.heading}>Welcome to Eden Bray</h1>
        <p style={styles.subtext}>Select your trade to log in:</p>
        <select
          style={styles.select}
          value={trade}
          onChange={(e) => {
            setTrade(e.target.value);
            setError('');
          }}
        >
          <option value="">-- Select Trade --</option>
          {Object.keys(users).map((key) => (
            <option key={key} value={key}>{key}</option>
          ))}
        </select>
        <br /><br />
        <button onClick={handleLogin} style={styles.button} disabled={!trade}>
          Login
        </button>
        {error && <p style={styles.error}>{error}</p>}
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    display: 'flex',
    height: '100vh',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F3F3F3',
  },
  card: {
    background: '#fff',
    padding: '40px',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    width: '360px',
  },
  heading: {
    color: '#00205B',
    marginBottom: '10px',
  },
  subtext: {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#00205B',
  },
  select: {
    padding: '10px',
    width: '100%',
    fontSize: '16px',
    marginTop: '15px',
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
  button: {
    backgroundColor: '#FBC700',
    color: '#00205B',
    fontWeight: 'bold',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  error: {
    color: 'crimson',
    marginTop: '15px',
    fontWeight: 'bold',
  },
};

export default Login;
