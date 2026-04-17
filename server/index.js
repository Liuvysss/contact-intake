const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 4000;


app.use(cors());
app.use(express.json());



// POST /api/contact
app.post('/api/contact', (req, res) => {
  const { name, contactMethod, contactTime, message } = req.body ?? {};

  // Basic validation
  if (!contactMethod?.trim() || !message?.trim()) {
    return res.status(400).json({ error: 'Contact method and message are required.' });
  }

  const createdAt = new Date().toISOString();
  db.run(
    `INSERT INTO submissions (name, contactMethod, contactTime, message, createdAt) VALUES (?, ?, ?, ?, ?)`,
    [name?.trim() || '', contactMethod.trim(), contactTime?.trim() || '', message.trim(), createdAt],
    function (err) {
      if (err) {
        res.status(500).json({ error: 'Could not save your request. Please try again later.' });
      } else {
        res.status(201).json({ message: 'Your request was received securely.' });
      }
    }
  );
});

// Health check (optional)
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Safe Contact Intake API running on port ${PORT}`);
});
