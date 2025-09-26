import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'Gemini API key not set' }, { status: 500 });
    }

    // Read rules from daksh-behavior.md
    const fs = require('fs');
    const path = require('path');
    const rulesPath = path.join(process.cwd(), 'app', 'ai-career-chat', 'daksh-behavior.md');
    let rules = '';
    try {
      rules = fs.readFileSync(rulesPath, 'utf8');
    } catch (e) {
      rules = '';
    }


  // Prepend rules to the user message
  const prompt = `${rules}\n\nUser: ${message}`;

    // Use gemini-2.5-flash as requested
    const model = 'gemini-2.5-flash';
    const geminiRes = await fetch(`https://generativelanguage.googleapis.com/v1/models/${model}:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    );

    if (!geminiRes.ok) {
      const errorText = await geminiRes.text();
      console.error('Gemini API error:', errorText);
      return NextResponse.json({ error: 'Gemini API error', details: errorText }, { status: 500 });
    }

    const data = await geminiRes.json();
    const answer = data?.candidates?.[0]?.content?.parts?.[0]?.text || 'No answer.';

    return NextResponse.json({ answer });
  } catch (err: any) {
    console.error('Server error:', err);
    return NextResponse.json({ error: 'Server error', details: err?.message || String(err) }, { status: 500 });
  }
}
