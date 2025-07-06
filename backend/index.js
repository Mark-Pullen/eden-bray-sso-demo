const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

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

app.listen(PORT, () => console.log(`SSO Server running on http://localhost:${PORT}`));
