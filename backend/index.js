const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// ✅ Root route with basic HTML documentation
app.get('/', (req, res) => {
  res.send(`
    <h1>🧩 Simulated SSO Backend for Tradelink Loyalty</h1>
    <p>This service simulates a partner SSO Identity Provider used to access the Tradelink Loyalty Platform.</p>
    
    <h2>Available Endpoints</h2>
    <ul>
      <li><strong>POST /sso-login</strong><br/>
          Accepts JSON with <code>customer_id</code>, <code>email</code>, and <code>member_type</code>, and returns a tokenized redirect URL.</li>
      <li><strong>GET /points/:customerId</strong><br/>
          Returns a simulated points balance for the given customer ID.</li>
    </ul>

    <h2>How to Test</h2>
    <ol>
      <li>Start the <strong>Partner Portal frontend</strong> (Eden Bray) on <code>http://localhost:5173</code> or deployed link.</li>
      <li>Select a trade and log in.</li>
      <li>Click "Visit Tradelink Loyalty" to test SSO token handoff.</li>
    </ol>

    <p><a href="http://localhost:5173" target="_blank">➡️ Open Partner Portal</a></p>

    <hr/>
    <p style="font-size: 12px; color: #666;">This service is for development/testing purposes only.</p>
  `);
});

// ✅ Simulate SSO login + generate redirect URL with token
app.post('/sso-login', (req, res) => {
  const { customer_id, email, member_type } = req.body;

  if (!customer_id || !email || !member_type) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  const token = Buffer.from(
    JSON.stringify({
      customer_id,
      email,
      member_flag: 'Y',
      member_type,
    })
  ).toString('base64');

  res.json({ redirect_url: `http://localhost:5174/?token=${token}` });
});

// ✅ Simulated loyalty points endpoint
app.get('/points/:customerId', (req, res) => {
  const { customerId } = req.params;
  res.json({ points: 5000 }); // You can randomize this if needed
});

app.listen(PORT, () => console.log(`SSO Server running on port ${PORT}`));
