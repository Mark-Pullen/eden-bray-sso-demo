// --- frontend-loyalty/src/App.jsx ---
import { useEffect, useState } from 'react';

function App() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    if (token) {
      try {
        const decoded = JSON.parse(atob(token));
        setUserData(decoded);
      } catch (e) {
        console.error('Invalid token', e);
        setUserData({ error: 'Invalid token' });
      }
    }
  }, []);

  const handleBack = () => {
    window.location.href = 'https://frontend-partner.vercel.app';
  };

  if (!userData) return <h2 style={styles.message}>No token received. Please log in via partner portal.</h2>;
  if (userData.error) return <h2 style={styles.message}>Invalid token. Please try logging in again.</h2>;

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Welcome to Tradelink Loyalty</h2>
        <p><strong>Customer ID:</strong> {userData.customer_id}</p>
        <p><strong>Email:</strong> {userData.email}</p>
        <p><strong>Member Type:</strong> {userData.member_type}</p>
        <p><strong>Status:</strong> {userData.member_flag === 'Y' ? 'Active Member' : 'Not Eligible'}</p>
        <p>Welcome to the program. You can now redeem rewards and view your loyalty history.</p>
        <button style={styles.button} onClick={handleBack}>⬅️ Return to Eden Bray Portal</button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: '#F3F3F3',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'sans-serif',
  },
  card: {
    backgroundColor: '#fff',
    padding: '40px',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    maxWidth: '500px',
  },
  title: {
    color: '#00205B',
    marginBottom: '20px',
  },
  button: {
    marginTop: '20px',
    padding: '10px 20px',
    backgroundColor: '#FBC700',
    color: '#00205B',
    fontWeight: 'bold',
    fontSize: '16px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  message: {
    padding: '40px',
    textAlign: 'center',
    fontFamily: 'sans-serif',
    color: '#cb2026',
  }
};

export default App;
