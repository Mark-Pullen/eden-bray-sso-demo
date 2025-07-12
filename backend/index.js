const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Optional root route for quick check
app.get('/', (req, res) => {
  res.send('SSO Backend is running.');
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

  res.json({ redirect_url: `http://localhost:5174/?token=${token}` }); // update later for production
});

// This is the route that's failing on Render — it must be here
app.get('/points/:customerId', (req, res) => {
  const { customerId } = req.params;
  res.json({ points: 5000 });
});

app.listen(PORT, () => console.log(`SSO Server running on port ${PORT}`));
