import { useNavigate } from 'react-router-dom'
import { lessons } from '../data/lessons'
import { useLessonStore } from '../store/useLessonStore'

export default function Home() {
  const navigate = useNavigate()
  const { completed, answers, reset, allDone } = useLessonStore()

  const totalAnswered = Object.values(answers).flat().length
  const totalCorrect = Object.values(answers).flat().filter(Boolean).length
  const pct = totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : 0

  return (
    <div className="min-h-screen bg-gray-950 text-white px-4 py-10">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-indigo-400 mb-2">🗃️ SQL Learn</h1>
          <p className="text-gray-400 text-lg">Aprenda SQL passo a passo com questões geradas por IA</p>
        </div>

        {totalAnswered > 0 && (
          <div className="bg-gray-800 rounded-2xl p-5 mb-8 flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Progresso geral</p>
              <p className="text-white font-semibold text-lg">{totalCorrect}/{totalAnswered} respostas corretas</p>
            </div>
            <div className="text-right">
              <p className="text-4xl font-bold text-indigo-400">{pct}%</p>
              {allDone() && (
                <button
                  onClick={() => navigate('/results')}
                  className="mt-1 text-sm text-indigo-300 underline hover:text-indigo-200"
                >
                  Ver resultado final →
                </button>
              )}
            </div>
          </div>
        )}

        <div className="grid gap-4">
          {lessons.map((lesson, i) => {
            const isDone = completed[lesson.id]
            const lessonAnswers = answers[lesson.id] ?? []
            const lessonCorrect = lessonAnswers.filter(Boolean).length
            const prevDone = i === 0 || completed[lessons[i - 1].id]

            return (
              <button
                key={lesson.id}
                onClick={() => prevDone && navigate(`/lesson/${lesson.id}`)}
                className={`flex items-center gap-4 rounded-2xl p-5 text-left transition-all duration-200 border
                  ${isDone
                    ? 'bg-indigo-950/50 border-indigo-700 hover:bg-indigo-900/40'
                    : prevDone
                    ? 'bg-gray-800 border-gray-700 hover:bg-gray-700'
                    : 'bg-gray-900 border-gray-800 opacity-50 cursor-not-allowed'
                  }`}
              >
                <div className="text-3xl w-12 text-center">{lesson.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-gray-500">#{String(i + 1).padStart(2, '0')}</span>
                    {isDone && <span className="text-xs bg-indigo-600 text-white px-2 py-0.5 rounded-full">Concluído</span>}
                    {!prevDone && <span className="text-xs text-gray-600">🔒 Bloqueado</span>}
                  </div>
                  <p className="text-white font-semibold mt-0.5">{lesson.title}</p>
                  {isDone && (
                    <p className="text-sm text-indigo-300 mt-0.5">{lessonCorrect}/3 corretas</p>
                  )}
                </div>
                <div className="text-gray-500 text-xl">{prevDone ? '→' : '🔒'}</div>
              </button>
            )
          })}
        </div>

        {totalAnswered > 0 && (
          <div className="text-center mt-8">
            <button
              onClick={() => { if (confirm('Resetar todo o progresso?')) reset() }}
              className="text-sm text-gray-600 hover:text-red-400 underline transition-colors"
            >
              Resetar progresso
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
