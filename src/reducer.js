export const initialState = {
  questions: [],
  currentIndex: 0,
  answers: [],
  locked: false,
  loading: true,
  error: null
}

export function quizReducer(state, action){
  switch(action.type){
    case 'LOAD_QUESTIONS':
      return {...state, questions: action.payload, loading:false}
    case 'SET_ERROR':
      return {...state, error: action.payload, loading:false}
    case 'SELECT_ANSWER':
      const q = state.questions[state.currentIndex]
      const isCorrect = q && action.payload!=null && q.correctIndex === action.payload
      const newAnswers = [...state.answers]
      newAnswers[state.currentIndex] = {selectedIndex: action.payload, isCorrect}
      return {...state, answers: newAnswers, locked:true}
    case 'NEXT':
      return {...state, currentIndex: Math.min(state.currentIndex+1, state.questions.length-1), locked:false}
    case 'RESTART':
      return {...initialState, questions: state.questions, loading:false}
    default:
      return state
  }
}
