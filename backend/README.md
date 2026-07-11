# CVastra AI — Backend (Phase 1: Resume Parser + Gemini Analysis)

Idhu unga CVastra AI project-oda backend. Resume (PDF/DOCX) upload panna, text extract panni, Gemini API-ku anupi, structured score + analysis JSON return pandra.

## Files
- `server.js` — Express server + `/api/analyze` endpoint
- `parser.js` — PDF/DOCX text extraction
- `gemini.js` — Gemini API call + analysis prompt
- `package.json` — dependencies
- `.env.example` — environment variable template

## API

**POST** `/api/analyze`
- Form-data body:
  - `resume` — file (PDF or DOCX)
  - `role` — string (optional, e.g. "Full Stack Developer")
- Returns JSON with all scores, ATS issues, keywords, skill gap, roadmap, etc.

## Phone-only Setup Steps (GitHub browser upload)

1. Unga GitHub-la oru new repo create pannu (e.g. `cvastra-backend`).
2. Repo-la "Add file" → "Upload files" or "Create new file" trick use panni, indha 5 files-ஐயும் upload pannu:
   - `server.js`
   - `parser.js`
   - `gemini.js`
   - `package.json`
   - `.env.example`
   - `README.md`
3. **Gemini API Key vangunga:**
   - https://aistudio.google.com/apikey ku poi free API key generate pannunga (unga Telegram bot-la already use panreenga, same key use panlaam).
4. **Render-la deploy pannunga:**
   - Render dashboard → New → Web Service → unga GitHub repo select pannunga.
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Environment tab-la add pannunga:
     - `GEMINI_API_KEY` = unga key
     - `GEMINI_MODEL` = `gemini-2.0-flash`
   - Deploy button click pannunga.
5. Deploy aana apparam, unga Render URL kedaikum (e.g. `cvastra-backend.onrender.com`). Idha frontend-la use pannalam.

## Test panna (deploy aana apparam)

Postman or curl mூlama test pannalam:
```
curl -X POST https://your-app.onrender.com/api/analyze \
  -F "resume=@/path/to/resume.pdf" \
  -F "role=Full Stack Developer"
```

## Next Steps (Phase 2)
- Frontend upload UI + dashboard (score cards, charts) build panrom.
- ATS rule-based checks (formatting, missing sections) add pannalam — idhu AI illama plain JS logic-la pannalam, cost kammiya irukum.

## Notes
- Free Gemini tier rate limits irukku — heavy testing pannumbodhu konjam wait pannunga.
- Scanned/image-only PDFs (text illama scan panniya) work aagathu — text-based PDF/DOCX mattum support pannuthu.
- UptimeRobot vachu unga Telegram bot maadhiri, indha Render service-ayum ping pannalam sleep aagama irukka.
