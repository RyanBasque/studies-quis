import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { lessons } from '../data/lessons'
import { useLessonStore } from '../store/useLessonStore'
import { generateQuiz } from '../services/gemini'
import QuizQuestion from '../components/QuizQuestion'
import ProgressBar from '../components/ProgressBar'

export default function Lesson() {
  const { id } = useParams()
  const navigate = useNavigate()
  const lesson = lessons.find((l) => l.id === Number(id))
  const { currentQuestions, setQuestions, submitAnswer, completeLesson, completed, answers } =
    useLessonStore()

  const [phase, setPhase] = useState('content') // content | loading | quiz | done
  const [questionIdx, setQuestionIdx] = useState(0)
  const [error, setError] = useState(null)

  const isAlreadyDone = completed[lesson?.id]
  const lessonAnswers = answers[lesson?.id] ?? []
  const lessonCorrect = lessonAnswers.filter(Boolean).length

  useEffect(() => {
    if (isAlreadyDone) setPhase('done')
  }, [isAlreadyDone])

  if (!lesson) return <div className="text-white p-10">Lição não encontrada.</div>

  async function startQuiz() {
    setPhase('loading')
    setError(null)
    try {
      const questions = await generateQuiz(lesson.title, lesson.content)
      setQuestions(questions)
      setQuestionIdx(0)
      setPhase('quiz')
    } catch (e) {
      setError(e.message)
      setPhase('content')
    }
  }

  function handleAnswer(correct) {
    submitAnswer(lesson.id, correct)
    if (questionIdx + 1 >= currentQuestions.length) {
      completeLesson(lesson.id)
      setPhase('done')
    } else {
      setQuestionIdx((i) => i + 1)
    }
  }

  const nextLesson = lessons.find((l) => l.id === lesson.id + 1)
  const allDoneNow = lessons.every((l) => completed[l.id] || l.id === lesson.id)

  return (
    <div className="min-h-screen bg-gray-950 text-white px-4 py-10">
      <div className="max-w-3xl mx-auto">
        <button
          onClick={() => navigate('/')}
          className="text-gray-500 hover:text-white text-sm mb-6 flex items-center gap-1 transition-colors"
        >
          ← Voltar
        </button>

        <div className="flex items-center gap-3 mb-6">
          <span className="text-4xl">{lesson.icon}</span>
          <div>
            <p className="text-gray-500 text-xs font-mono">Etapa {lesson.id} de {lessons.length}</p>
            <h1 className="text-2xl font-bold text-white">{lesson.title}</h1>
          </div>
        </div>

        {phase === 'content' && (
          <div>
            <div className="bg-gray-800 rounded-2xl p-6 mb-8 whitespace-pre-line text-gray-300 leading-relaxed font-mono text-sm">
              {lesson.content}
            </div>
            {error && (
              <div className="bg-red-900/30 border border-red-700 rounded-xl p-4 mb-4 text-red-300 text-sm">
                {error}
              </div>
            )}
            <button
              onClick={startQuiz}
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-4 rounded-2xl text-lg transition-colors"
            >
              Iniciar Quiz →
            </button>
          </div>
        )}

        {phase === 'loading' && (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-gray-400">Gerando perguntas com Gemini...</p>
          </div>
        )}

        {phase === 'quiz' && currentQuestions.length > 0 && (
          <div>
            <div className="flex justify-between text-sm text-gray-500 mb-2">
              <span>Pergunta {questionIdx + 1} de {currentQuestions.length}</span>
            </div>
            <ProgressBar current={questionIdx} total={currentQuestions.length} />
            <QuizQuestion
              question={currentQuestions[questionIdx]}
              onAnswer={handleAnswer}
            />
          </div>
        )}

        {phase === 'done' && (
          <div className="text-center py-10">
            <div className="text-6xl mb-4">
              {lessonCorrect === 3 ? '🏆' : lessonCorrect === 2 ? '👍' : '📚'}
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Etapa concluída!</h2>
            <p className="text-gray-400 mb-2">
              Você acertou{' '}
              <span className="text-indigo-400 font-bold">{lessonCorrect}/3</span>{' '}
              perguntas nesta etapa.
            </p>
            <p className="text-4xl font-bold text-indigo-400 mb-8">
              {Math.round((lessonCorrect / 3) * 100)}%
            </p>

            <div className="flex flex-col gap-3 max-w-xs mx-auto">
              {nextLesson && !allDoneNow ? (
                <button
                  onClick={() => navigate(`/lesson/${nextLesson.id}`)}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 rounded-xl transition-colors"
                >
                  Próxima etapa: {nextLesson.title} →
                </button>
              ) : (
                <button
                  onClick={() => navigate('/results')}
                  className="bg-green-600 hover:bg-green-500 text-white font-semibold py-3 rounded-xl transition-colors"
                >
                  🏁 Ver resultado final
                </button>
              )}
              <button
                onClick={() => navigate('/')}
                className="border border-gray-700 text-gray-400 hover:text-white hover:border-gray-500 font-medium py-3 rounded-xl transition-colors"
              >
                Voltar ao início
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
