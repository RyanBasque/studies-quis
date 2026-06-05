const API_KEY = 'AQ.Ab8RN6JJwBEzmM0Ih-QaYGhHDsZVAQ_4XPbDaUZ7Jq2NQHMVLw'
const API_URL =
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent'

export async function generateQuiz(lessonTitle, lessonContent) {
  const prompt = `Você é um professor de SQL. Baseado no tópico "${lessonTitle}", crie exatamente 3 perguntas de múltipla escolha em português brasileiro.

Contexto:
${lessonContent}

Responda SOMENTE com o JSON abaixo, sem nenhum texto antes ou depois, sem markdown:
{"questions":[{"question":"pergunta 1?","options":["A","B","C"],"answer":0},{"question":"pergunta 2?","options":["A","B","C"],"answer":1},{"question":"pergunta 3?","options":["A","B","C"],"answer":2}]}

Substitua os valores mantendo o formato exato. "answer" é o índice 0, 1 ou 2 da opção correta.`

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-goog-api-key': API_KEY,
    },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.5,
        maxOutputTokens: 2048,
        responseMimeType: 'application/json',
      },
    }),
  })

  if (!response.ok) {
    const err = await response.text()
    throw new Error(`Erro na API Gemini: ${response.status} — ${err}`)
  }

  const data = await response.json()
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text ?? ''

  // extrair JSON mesmo que venha com markdown ou texto extra
  const match = text.match(/\{[\s\S]*\}/)
  if (!match) throw new Error(`Resposta inesperada do Gemini: ${text.slice(0, 200)}`)

  const parsed = JSON.parse(match[0])
  return parsed.questions
}
