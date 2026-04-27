export default async function handler(req, res) {
  try {
    const { text } = req.body;

    const prompt = `
You are a senior developer debugging assistant.

Analyze this error:
${text}

Return:
1. Root cause
2. Fix
3. Steps
4. Code if needed
Be direct.
`;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }]
      })
    });

    const data = await response.json();

    if (!data.choices) {
      return res.status(500).json({
        result: "AI error",
        debug: data
      });
    }

    return res.status(200).json({
      result: data.choices[0].message.content
    });

  } catch (error) {
    return res.status(500).json({
      result: "Server error",
      error: error.message
    });
  }
}
