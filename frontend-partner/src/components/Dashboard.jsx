import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [user, setUser] = useState(null);
  const [points, setPoints] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem('currentUser');
    if (saved) {
      const parsed = JSON.parse(saved);
      setUser(parsed);

      axios.get(`http://localhost:4000/points/${parsed.customer_id}`)
        .then((res) => setPoints(res.data.points))
        .catch(() => setPoints(null))
        .finally(() => setLoading(false));
    }
  }, []);

  const handleLaunch = async () => {
    const res = await axios.post('http://localhost:4000/sso-login', user);
    window.location.href = res.data.redirect_url;
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  if (!user) return <p>Please log in again.</p>;

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Welcome, {user.member_type}</h2>
      {loading ? (
        <p>Loading...</p>
      ) : points === null ? (
        <button style={styles.button} onClick={handleLaunch}>Visit Your Tradelink Loyalty</button>
      ) : (
        <>
          <p>You have <strong>{points.toLocaleString()}</strong> points.</p>
          <button style={styles.button} onClick={handleLaunch}>Go to Loyalty Portal</button>
        </>
      )}
      <br /><br />
      <button style={styles.logout} onClick={handleLogout}>Logout</button>
    </div>
  );
}

const styles = {
  container: {
    padding: 20,
    maxWidth: 500,
    margin: '80px auto',
    backgroundColor: '#fff',
    border: '1px solid #ccc',
    borderRadius: 8,
    fontFamily: 'sans-serif',
    textAlign: 'center',
  },
  title: {
    color: '#cb2026',
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
  logout: {
    marginTop: 20,
    padding: '6px 12px',
    backgroundColor: '#888',
    color: '#fff',
    border: 'none',
    borderRadius: 4,
    fontSize: 14,
    cursor: 'pointer',
  },
};

export default Dashboard;