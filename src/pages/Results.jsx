import { useNavigate } from 'react-router-dom'
import { lessons } from '../data/lessons'
import { useLessonStore } from '../store/useLessonStore'

export default function Results() {
  const navigate = useNavigate()
  const { answers, reset, getTotalScore } = useLessonStore()
  const { correct, total } = getTotalScore()
  const pct = total > 0 ? Math.round((correct / total) * 100) : 0

  function medal() {
    if (pct >= 90) return '🏆'
    if (pct >= 70) return '🥇'
    if (pct >= 50) return '🥈'
    return '📚'
  }

  function message() {
    if (pct >= 90) return 'Excelente! Você domina SQL!'
    if (pct >= 70) return 'Muito bem! Você tem um bom entendimento de SQL.'
    if (pct >= 50) return 'Bom começo! Continue praticando.'
    return 'Continue estudando, você vai melhorar!'
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white px-4 py-10">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <div className="text-7xl mb-4">{medal()}</div>
          <h1 className="text-3xl font-bold text-white mb-2">Resultado Final</h1>
          <p className="text-gray-400">{message()}</p>
        </div>

        <div className="bg-gray-800 rounded-2xl p-8 text-center mb-8">
          <p className="text-gray-400 mb-1">Pontuação geral</p>
          <p className="text-7xl font-bold text-indigo-400 mb-2">{pct}%</p>
          <p className="text-gray-500">{correct} de {total} respostas corretas</p>
        </div>

        <div className="grid gap-3 mb-10">
          {lessons.map((lesson) => {
            const lessonAnswers = answers[lesson.id] ?? []
            const lessonCorrect = lessonAnswers.filter(Boolean).length
            const lessonTotal = lessonAnswers.length
            const lessonPct = lessonTotal > 0 ? Math.round((lessonCorrect / lessonTotal) * 100) : 0
            const color = lessonPct >= 67 ? 'text-green-400' : lessonPct > 0 ? 'text-yellow-400' : 'text-gray-600'

            return (
              <div
                key={lesson.id}
                className="bg-gray-800 rounded-xl px-5 py-3 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{lesson.icon}</span>
                  <span className="text-gray-300 text-sm">{lesson.title}</span>
                </div>
                <div className="text-right">
                  <span className={`font-bold ${color}`}>
                    {lessonTotal > 0 ? `${lessonCorrect}/${lessonTotal} (${lessonPct}%)` : '—'}
                  </span>
                </div>
              </div>
            )
          })}
        </div>

        <div className="flex flex-col gap-3 max-w-xs mx-auto text-center">
          <button
            onClick={() => { reset(); navigate('/') }}
            className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 rounded-xl transition-colors"
          >
            🔄 Recomeçar do zero
          </button>
          <button
            onClick={() => navigate('/')}
            className="border border-gray-700 text-gray-400 hover:text-white hover:border-gray-500 font-medium py-3 rounded-xl transition-colors"
          >
            Voltar ao início
          </button>
        </div>
      </div>
    </div>
  )
}
