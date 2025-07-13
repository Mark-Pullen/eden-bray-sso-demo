const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Serve documentation and diagram on root
app.get('/', (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Simulated SSO Backend</title>
        <style>
          body {
            font-family: sans-serif;
            margin: 0;
            padding: 40px 20px;
            background: #f8f9fa;
            display: flex;
            flex-direction: column;
            align-items: center;
            color: #333;
          }
          h1 {
            font-size: 1.8rem;
            margin-bottom: 0.5rem;
            color: #1a1a1a;
          }
          p {
            max-width: 600px;
            text-align: center;
            font-size: 1rem;
            margin-bottom: 2rem;
          }
          svg {
            max-width: 100%;
            height: auto;
          }
        </style>
      </head>
      <body>
        <h1>🔐 Simulated SSO Backend for Tradelink Loyalty</h1>
        <p>This backend simulates the Identity Provider in a secure SSO workflow, connecting a Partner Portal to the Tradelink Loyalty Platform.</p>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 850 160">
          <style>
            .box { fill: #fff; stroke: #ccc; stroke-width: 1.5; }
            .label { font: 600 12px sans-serif; fill: #000; }
            .sub { font: 400 11px sans-serif; fill: #555; }
            .arrow { stroke: #cb2026; stroke-width: 1.5; marker-end: url(#arrowhead); }
            .note { font: 400 10px sans-serif; fill: #cb2026; }
          </style>
          <defs>
            <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#cb2026" />
            </marker>
          </defs>
          <rect x="30" y="40" width="150" height="60" rx="8" class="box"/>
          <text x="105" y="62" text-anchor="middle" class="label">Partner Portal</text>
          <text x="105" y="78" text-anchor="middle" class="sub">edenbraehomes.com.au</text>

          <rect x="250" y="40" width="170" height="60" rx="8" class="box"/>
          <text x="335" y="62" text-anchor="middle" class="label">Simulated SSO Backend</text>
          <text x="335" y="78" text-anchor="middle" class="sub">/sso-login + /points</text>

          <rect x="500" y="40" width="150" height="60" rx="8" class="box"/>
          <text x="575" y="62" text-anchor="middle" class="label">Tradelink Loyalty</text>
          <text x="575" y="78" text-anchor="middle" class="sub">frontend-loyalty.vercel.app</text>

          <!-- Arrows -->
          <line x1="180" y1="70" x2="250" y2="70" class="arrow"/>
          <text x="215" y="65" text-anchor="middle" class="note">1. POST /sso-login</text>

          <line x1="420" y1="70" x2="500" y2="70" class="arrow"/>
          <text x="460" y="65" text-anchor="middle" class="note">2. Redirect with token</text>

          <line x1="500" y1="100" x2="250" y2="100" class="arrow"/>
          <text x="375" y="95" text-anchor="middle" class="note">3. Fetch /points</text>

          <line x1="250" y1="130" x2="30" y2="130" class="arrow"/>
          <text x="140" y="125" text-anchor="middle" class="note">4. Display points</text>
        </svg>
      </body>
    </html>
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

  res.json({ redirect_url: `https://frontend-loyalty.vercel.app/?token=${token}` });
});

// Points endpoint
app.get('/points/:customerId', (req, res) => {
  const { customerId } = req.params;
  res.json({ points: 5000 });
});

app.listen(PORT, () => console.log(`SSO Server running on port ${PORT}`));
