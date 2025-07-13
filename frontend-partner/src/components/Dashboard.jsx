// --- frontend-partner/src/components/Dashboard.jsx ---
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [user, setUser] = useState(null);
  const [points, setPoints] = useState(null);
  const [memberFlag, setMemberFlag] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem('currentUser');
    if (saved) {
      const parsed = JSON.parse(saved);
      setUser(parsed);
      setMemberFlag(parsed.member === 'Y' ? 'Y' : 'N');
    }
  }, []);

  const handlePointsLookup = async () => {
    if (!user || memberFlag !== 'Y') return;
    setLoading(true);
    try {
      const res = await axios.get(`https://sso-backend-k5ps.onrender.com/points/${user.customer_id}`);
      setPoints(res.data.points);
    } catch (error) {
      console.error('Points lookup failed:', error);
      setPoints(null);
    } finally {
      setLoading(false);
    }
  };

  const handleLaunch = async () => {
    const res = await axios.post('https://sso-backend-k5ps.onrender.com/sso-login', user);
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

      {memberFlag === 'Y' ? (
        <>
          <button style={styles.lookupButton} onClick={handlePointsLookup} disabled={loading}>
            {loading ? 'Looking up points...' : '🔍 Simulate Points Lookup'}
          </button>

          {points !== null && (
            <div style={styles.infoBox}>
              <p><strong>Member Status:</strong> Yes</p>
              <p><strong>Points:</strong> {points.toLocaleString()}</p>
              <button style={styles.launchButton} onClick={handleLaunch}>Go to Loyalty Portal</button>
            </div>
          )}
        </>
      ) : (
        <div style={styles.infoBox}>
          <p><strong>Member Status:</strong> No</p>
          <p>You are not eligible for the loyalty program.</p>
        </div>
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
  lookupButton: {
    padding: '10px 20px',
    fontSize: 16,
    backgroundColor: '#0070f3',
    color: '#fff',
    border: 'none',
    borderRadius: 4,
    cursor: 'pointer',
    marginBottom: 20,
  },
  infoBox: {
    backgroundColor: '#f9f9f9',
    padding: '15px',
    borderRadius: 6,
    border: '1px solid #eee',
    marginTop: 20,
  },
  launchButton: {
    marginTop: 10,
    padding: '10px 20px',
    fontSize: 16,
    backgroundColor: '#cb2026',
    color: '#fff',
    border: 'none',
    borderRadius: 4,
    cursor: 'pointer',
  },
  logout: {
    marginTop: 30,
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
