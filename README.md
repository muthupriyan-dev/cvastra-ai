# 📄 CVastra AI

**CVastra AI** is a full-stack SaaS resume analyzer that uses Google's Gemini API to score and evaluate resumes across multiple dimensions, giving users actionable feedback to improve their CVs.

## ✨ Features

- 🤖 AI-powered resume analysis using the Gemini API
- 📊 Structured scoring across **7 key dimensions**
- ⚡ Fast, full-stack architecture with a clean API layer
- 🌐 Deployed and live

## 🛠️ Tech Stack

**Backend**
- Node.js
- Express.js
- Google Gemini API
- Deployed on [Render](https://render.com)

**Frontend**
- Vanilla JavaScript, HTML, CSS
- Deployed on [Netlify](https://netlify.com)

## 🚀 Live Demo
https://poetic-bonbon-f18691.netlify.app/

## 📦 Getting Started

### Backend
```bash
git clone https://github.com/muthupriyan-dev/cvastra-ai.git
cd cvastra-ai/backend
npm install
# Add your GEMINI_API_KEY to a .env file
npm start
```

### Frontend
```bash
cd cvastra-ai/frontend
# Open index.html or deploy the folder to Netlify
```

## 🔑 Environment Variables

| Variable | Description |
|---|---|
| `GEMINI_API_KEY` | Your Google Gemini API key |

## 📊 How It Works

1. User uploads/pastes their resume
2. Backend sends a structured prompt to the Gemini API
3. Gemini returns scores across 7 dimensions
4. Frontend displays the results in an easy-to-read format


---

Made with ❤️ by [Muthupriyan](https://github.com/muthupriyan-dev)
