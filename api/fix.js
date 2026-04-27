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
Be direct and practical.
`;

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        input: prompt
      })
    });

    const data = await response.json();

    console.log("OPENAI RESPONSE:", data);

    // zabezpieczenie jak struktura się zmieni
    let outputText = "Brak odpowiedzi AI";

    if (data.output && data.output[0] && data.output[0].content) {
      outputText = data.output[0].content[0].text;
    }

    return res.status(200).json({
      result: outputText
    });

  } catch (error) {
    console.error("ERROR:", error);

    return res.status(500).json({
      result: "Server error",
      error: error.message
    });
  }
}
