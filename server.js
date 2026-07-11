import express from 'express';
import multer from 'multer';
import cors from 'cors';
import dotenv from 'dotenv';
import { extractText } from './parser.js';
import { analyzeResume } from './gemini.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB max
});

app.get('/', (req, res) => {
  res.send('CVastra AI backend is running ✅');
});

app.post('/api/analyze', upload.single('resume'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No resume file uploaded. Use field name "resume".' });
    }

    const targetRole = req.body.role || 'Full Stack Developer';

    const text = await extractText(req.file);

    if (!text || text.trim().length < 50) {
      return res.status(400).json({
        error: 'Could not extract enough text from the resume. Try a different file (avoid scanned/image-only PDFs).',
      });
    }

    const analysis = await analyzeResume(text, targetRole);

    res.json({
      success: true,
      targetRole,
      analysis,
    });
  } catch (err) {
    console.error('Analyze error:', err);
    res.status(500).json({ error: 'Resume analysis failed', details: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`CVastra AI backend running on port ${PORT}`);
});
