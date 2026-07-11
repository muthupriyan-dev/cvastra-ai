const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-2.0-flash';
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;

/**
 * Sends resume text + target role to Gemini and returns structured analysis JSON.
 */
export async function analyzeResume(resumeText, targetRole) {
  if (!GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY is not set in environment variables.');
  }

  const prompt = buildPrompt(resumeText, targetRole);

  const response = await fetch(GEMINI_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.4,
        responseMimeType: 'application/json',
      },
    }),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Gemini API error: ${response.status} - ${errText}`);
  }

  const data = await response.json();
  const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!rawText) {
    throw new Error('Empty response from Gemini API.');
  }

  try {
    return JSON.parse(rawText);
  } catch (e) {
    throw new Error('Gemini did not return valid JSON: ' + rawText.slice(0, 300));
  }
}

function buildPrompt(resumeText, targetRole) {
  return `You are an expert resume reviewer and ATS (Applicant Tracking System) analyst.

Analyze the following resume text for a candidate targeting the role: "${targetRole}".

Resume Text:
"""
${resumeText.slice(0, 12000)}
"""

Return ONLY valid JSON (no markdown formatting, no code fences, no extra commentary) matching exactly this schema:

{
  "overallScore": number (0-100),
  "atsScore": number (0-100),
  "skillsScore": number (0-100),
  "projectsScore": number (0-100),
  "experienceScore": number (0-100),
  "educationScore": number (0-100),
  "certificationsScore": number (0-100),
  "atsIssues": [ { "issue": string, "suggestion": string } ],
  "matchedKeywords": [string],
  "missingKeywords": [string],
  "suggestedSkillsToAdd": [string],
  "improvementSuggestions": [string],
  "weakSentences": [ { "original": string, "improved": string } ],
  "rewrittenSummary": string,
  "skillGap": {
    "currentSkills": [string],
    "missingSkills": [string],
    "recommendedSkills": [string]
  },
  "learningRoadmap": [string],
  "placementReadiness": {
    "level": "Beginner" | "Intermediate" | "Advanced" | "Industry Ready",
    "probabilityPercent": number
  }
}

Rules:
- Be honest and specific. Base every score strictly on the actual resume content, do not inflate.
- "missingKeywords" should list technologies/skills relevant to "${targetRole}" that are NOT present in the resume.
- "weakSentences": pick up to 3 genuinely weak lines from the resume and rewrite them to be stronger and more quantifiable.
- "learningRoadmap" should be an ordered array of topics/technologies to learn next for "${targetRole}".
- Do not include any text outside the JSON object. No markdown code fences.`;
}
