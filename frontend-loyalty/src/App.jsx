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
      }
    }
  }, []);

  if (!userData) return <h2>No token received. Please log in via partner portal.</h2>;

  return (
    <div style={{ padding: 20 }}>
      <h2>Loyalty Platform - Welcome</h2>
      <p><strong>Customer ID:</strong> {userData.customer_id}</p>
      <p><strong>Email:</strong> {userData.email}</p>
      <p><strong>Member Type:</strong> {userData.member_type}</p>
      <p><strong>Status:</strong> {userData.member_flag === 'Y' ? 'Active Member' : 'Not Eligible'}</p>
    </div>
  );
}

export default App;
