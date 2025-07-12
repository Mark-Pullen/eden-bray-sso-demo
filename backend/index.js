const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Optional root route for info
app.get('/', (req, res) => {
  res.send(`
    <h1>🧩 Simulated SSO Backend for Tradelink Loyalty</h1>
    <p>This service simulates a partner SSO Identity Provider used to access the Tradelink Loyalty Platform.</p>
    <ul>
      <li><strong>POST /sso-login</strong>: Simulates SSO login and returns a redirect URL with token</li>
      <li><strong>GET /points/:customerId</strong>: Returns a dummy points balance</li>
    </ul>
    <p>To test the full SSO flow, start from the <strong>Partner Portal frontend</strong>.</p>
    <p><a href="https://frontend-partner-git-mark-pullens-projects.vercel.app" target="_blank">➡️ Launch Partner Portal</a></p>
  `);
});

// SSO login POST endpoint
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

  // Redirect to deployed loyalty frontend
  res.json({
    redirect_url: `https://frontend-loyalty.vercel.app//?token=${token}`,
  });
});

// Simulated points lookup
app.get('/points/:customerId', (req, res) => {
  const { customerId } = req.params;
  res.json({ points: 5000 });
});

app.listen(PORT, () => console.log(`SSO Server running on port ${PORT}`));
