import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { lessons } from '../data/lessons'

const initialAnswers = () =>
  Object.fromEntries(lessons.map((l) => [l.id, []]))

const initialCompleted = () =>
  Object.fromEntries(lessons.map((l) => [l.id, false]))

export const useLessonStore = create(
  persist(
    (set, get) => ({
      answers: initialAnswers(),
      completed: initialCompleted(),
      currentQuestions: [],

      setQuestions: (questions) => set({ currentQuestions: questions }),

      submitAnswer: (lessonId, correct) => {
        const { answers } = get()
        const prev = answers[lessonId] ?? []
        set({ answers: { ...answers, [lessonId]: [...prev, correct] } })
      },

      completeLesson: (lessonId) => {
        const { completed } = get()
        set({ completed: { ...completed, [lessonId]: true } })
      },

      reset: () =>
        set({
          answers: initialAnswers(),
          completed: initialCompleted(),
          currentQuestions: [],
        }),

      getTotalScore: () => {
        const { answers } = get()
        let correct = 0
        let total = 0
        for (const arr of Object.values(answers)) {
          total += arr.length
          correct += arr.filter(Boolean).length
        }
        return { correct, total }
      },

      allDone: () => {
        const { completed } = get()
        return Object.values(completed).every(Boolean)
      },
    }),
    { name: 'sql-learn-progress' }
  )
)
