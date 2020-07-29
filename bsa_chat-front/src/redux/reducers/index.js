const messages = (state, action) => {
  switch (action.type) {
    // case 'GET_MESSAGES':
    //   return {
    //     ...state,
    //     messages: action.payload
    //   }
    case 'ADD_MESSAGE':
      return {
        ...state,
        messages: [...state.messages, action.payload]
      }
    // case 'EDIT_MESSAGE':
    //   return {
    //     ...state,
    //     messages: state.messages.map(m =>
    //       m.id === action.payload.id ?
    //         action.payload : m)
    //   }
    // case 'DELETE_MESSAGE':
    //   return {
    //     ...state,
    //     messages: state.messages.filter(m => m.id !== action.payload)
    //   }

    case 'TOGGLE_EDIT':
      return {
        ...state,
        editMessage: action.payload
      }

    case 'IN_PROGRESS':
      return {
        ...state,
        isLoading: true
      }

    case 'SUCCESS':
      return {
        ...state,
        isLoading: false
      }

    case 'ERROR':
      return {
        ...state,
        isLoading: false,
        error: action.payload
      }

    case 'FILL_USER':
      console.log(action.payload);
      return {
        ...state,
        currentUser: action.payload
      }

    case 'DROP_USER':
      return {
        ...state,
        currentUser: action.payload
      }

    case 'FILL_MESSAGES':
      return {
        ...state,
        messages: action.payload
      }

    case 'SUCCESS_MESSAGE_EDIT':
      return{
        ...state,
        messages: state.messages.map(m =>
            m.id === action.payload.id ?
                action.payload : m)
      }

    case 'STORE_ADD_MESSAGE':
      return{
        ...state,
        messages: [...state.messages, action.payload]
      }

    case 'SUCCESS_DELETE_MESSAGE':
      return {
        ...state,
        messages: state.messages.filter(m => m.id !== action.payload)
      }

    case 'SUCCESS_SET_LIKE':
      return {
        ...state,
        messages: state.messages.map(m => m.id === action.payload ? {...m, isLike: !m.isLike} : m)
      }

    default:
      return state
  }
}

export default messages;
