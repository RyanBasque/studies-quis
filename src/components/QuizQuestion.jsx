import { useState } from 'react'

export default function QuizQuestion({ question, onAnswer }) {
  const [selected, setSelected] = useState(null)

  function choose(idx) {
    if (selected !== null) return
    setSelected(idx)
    const correct = idx === question.answer
    setTimeout(() => {
      onAnswer(correct)
      setSelected(null)
    }, 1200)
  }

  return (
    <div className="bg-gray-800 rounded-2xl p-6 w-full max-w-2xl mx-auto">
      <p className="text-white text-lg font-medium mb-6 leading-relaxed">
        {question.question}
      </p>
      <div className="flex flex-col gap-3">
        {question.options.map((opt, idx) => {
          let style =
            'border border-gray-600 bg-gray-700 hover:bg-gray-600 text-gray-100 cursor-pointer'
          if (selected !== null) {
            if (idx === question.answer)
              style = 'border border-green-500 bg-green-900/40 text-green-300 cursor-default'
            else if (idx === selected)
              style = 'border border-red-500 bg-red-900/40 text-red-300 cursor-default'
            else style = 'border border-gray-700 bg-gray-800 text-gray-500 cursor-default'
          }
          return (
            <button
              key={idx}
              onClick={() => choose(idx)}
              className={`rounded-xl px-5 py-3 text-left transition-all duration-200 font-medium ${style}`}
            >
              <span className="text-gray-400 mr-3 font-mono text-sm">
                {['A', 'B', 'C'][idx]})
              </span>
              {opt}
            </button>
          )
        })}
      </div>
      {selected !== null && (
        <p className={`mt-4 text-sm font-medium ${selected === question.answer ? 'text-green-400' : 'text-red-400'}`}>
          {selected === question.answer ? '✓ Correto!' : `✗ Incorreto. A resposta era: ${question.options[question.answer]}`}
        </p>
      )}
    </div>
  )
}
