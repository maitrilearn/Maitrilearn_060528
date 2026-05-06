async function askDoubtService(
  question,
  subject,
  topic
) {

  const prompt = `
Subject: ${subject}
Topic: ${topic}

Question:
${question}

Explain simply for students with examples.
`;

  const res = await fetch(
    "https://api.groq.com/openai/v1/chat/completions",
    {
      method: "POST",

      headers: {
        "Authorization":
          `Bearer ${GROQ_API_KEY}`,

        "Content-Type":
          "application/json"
      },

      body: JSON.stringify({

        model:
          "llama-3.1-8b-instant",

        messages: [
          {
            role: "user",
            content: prompt
          }
        ]

      })
    }
  );

  const data = await res.json();

  console.log(JSON.stringify(data, null, 2));

  return data.choices?.[0]
    ?.message?.content
    || "No answer";
}
