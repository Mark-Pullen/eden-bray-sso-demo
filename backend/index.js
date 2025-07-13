const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Root route with SVG diagram and explanation
app.get('/', (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Simulated SSO Backend</title>
        <style>
          body { font-family: sans-serif; text-align: center; padding: 40px; }
          h1 { color: #00205B; }
          code { background: #f3f3f3; padding: 2px 6px; border-radius: 4px; }
        </style>
      </head>
      <body>
        <h1>🔐 Simulated SSO Backend for Tradelink Loyalty</h1>
        <p>This backend simulates the Identity Provider in a secure SSO workflow, connecting a Partner Portal to the Tradelink Loyalty Platform.</p>

        <svg viewBox="0 0 900 500" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="max-width: 800px; display: block; margin: 30px auto;">
          <style>
            .box { fill: #fefefe; stroke: #ccc; stroke-width: 2; rx: 10; ry: 10; }
            .title { font: bold 16px sans-serif; fill: #00205B; }
            .text { font: 14px sans-serif; fill: #333; }
            .arrow { stroke: #cb2026; stroke-width: 2; marker-end: url(#arrowhead); }
          </style>
          <defs>
            <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#cb2026" />
            </marker>
          </defs>

          <rect class="box" x="50" y="50" width="200" height="100"/>
          <text class="title" x="150" y="75" text-anchor="middle">Partner Portal</text>
          <text class="text" x="150" y="100" text-anchor="middle">edenbraehomes.com.au</text>

          <rect class="box" x="350" y="50" width="200" height="100"/>
          <text class="title" x="450" y="75" text-anchor="middle">Simulated SSO Backend</text>
          <text class="text" x="450" y="100" text-anchor="middle">/sso-login + /points</text>

          <rect class="box" x="650" y="50" width="200" height="100"/>
          <text class="title" x="750" y="75" text-anchor="middle">Tradelink Loyalty</text>
          <text class="text" x="750" y="100" text-anchor="middle">frontend-loyalty.vercel.app</text>

          <line class="arrow" x1="250" y1="100" x2="350" y2="100"/>
          <line class="arrow" x1="550" y1="100" x2="650" y2="100"/>
          <line class="arrow" x1="650" y1="130" x2="550" y2="130"/>
          <line class="arrow" x1="350" y1="130" x2="250" y2="130"/>

          <text class="text" x="300" y="90" text-anchor="middle">1. POST /sso-login</text>
          <text class="text" x="600" y="90" text-anchor="middle">2. Redirect with token</text>
          <text class="text" x="600" y="145" text-anchor="middle">3. Fetch /points</text>
          <text class="text" x="300" y="145" text-anchor="middle">4. Display points</text>
        </svg>

        <p style="margin-top: 30px;">
          <strong>Endpoints:</strong><br/>
          <code>POST /sso-login</code> — Simulates login and returns token redirect<br/>
          <code>GET /points/:customerId</code> — Returns mock loyalty points<br/>
        </p>

        <p>💡 To test the flow, visit the <a href="https://frontend-partner.vercel.app" target="_blank">Partner Portal</a>.</p>
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

  res.json({
    redirect_url: `https://frontend-loyalty.vercel.app/?token=${token}`,
  });
});

// Dummy points API
app.get('/points/:customerId', (req, res) => {
  const { customerId } = req.params;
  res.json({ points: 5000 }); // Simulated loyalty points
});

app.listen(PORT, () =>
  console.log(`✅ SSO Backend running on http://localhost:${PORT}`)
);
