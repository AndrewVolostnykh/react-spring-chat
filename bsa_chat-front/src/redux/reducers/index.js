const messages = (state, action) => {
  console.log(state.messages)
  switch (action.type) {
    case 'GET_MESSAGES':
      return {
        ...state,
        messages: action.payload
      }
    case 'SET_LIKE':
      return {
        ...state,
        messages: state.messages.map(m =>
          m.id === action.payload.id ?
            action.payload : m)
      }
    case 'ADD_MESSAGE':
      return {
        ...state,
        messages: [...state.messages, action.payload]
      }
    case 'EDIT_MESSAGE':
      return {
        ...state,
        messages: state.messages.map(m =>
          m.id === action.payload.id ?
            action.payload : m)
      }
    case 'DELETE_MESSAGE':
      return {
        ...state,
        messages: state.messages.filter(m => m.id !== action.payload)
      }

    case 'TOGGLE_EDIT':
      return {
        ...state,
        editMessage: action.payload
      }

    case 'LOGIN_USER':
      return {

      }

    default:
      return state
  }
}

export default messages;
