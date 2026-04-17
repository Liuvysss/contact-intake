const express = require('express');
const cors = require('cors');
const fs = require('fs/promises');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 4000;
const DATA_FILE = path.join(__dirname, 'intake-submissions.json');

app.use(cors());
app.use(express.json());

// Helper: Load submissions
async function loadSubmissions() {
  try {
    const data = await fs.readFile(DATA_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
}

// Helper: Save submissions
async function saveSubmissions(submissions) {
  await fs.writeFile(DATA_FILE, JSON.stringify(submissions, null, 2));
}

// POST /api/contact
app.post('/api/contact', async (req, res) => {
  const { name, contactMethod, contactTime, message } = req.body ?? {};

  // Basic validation
  if (!contactMethod?.trim() || !message?.trim()) {
    return res.status(400).json({ error: 'Contact method and message are required.' });
  }

  const submission = {
    id: Date.now().toString(),
    name: name?.trim() || '',
    contactMethod: contactMethod.trim(),
    contactTime: contactTime?.trim() || '',
    message: message.trim(),
    createdAt: new Date().toISOString(),
  };

  try {
    const submissions = await loadSubmissions();
    submissions.push(submission);
    await saveSubmissions(submissions);
    res.status(201).json({ message: 'Your request was received securely.' });
  } catch (err) {
    res.status(500).json({ error: 'Could not save your request. Please try again later.' });
  }
});

// Health check (optional)
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Safe Contact Intake API running on port ${PORT}`);
});
