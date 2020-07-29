import Messages from "../../data/Messages";

export const getMessages = () => ({
  type: 'GET_MESSAGES',
  payload: Messages
})

export const deleteMessage = ms => ({
  type: 'DELETE_MESSAGE',
  payload: ms.id
})

export const setLike = ms => ({
  type: 'SET_LIKE',
  payload: {...ms, isLiked: !ms.isLiked}
})

export const addMessage = ms => ({
  type: 'ADD_MESSAGE',
  payload: ms
})

export const editMessage = (ms, body) => ({
  type: 'EDIT_MESSAGE',
  payload: {...ms, text: body}
})

export const toggleEditWindow = ms => ({
  type: 'TOGGLE_EDIT',
  payload: ms
})

export const loginUser = (name, password, history) => ({
  type: "LOGIN_USER",
  payload: {userName: name, password: password, history: history}
})

export const success = () => ({
  type: "SUCCESS"
})

export const inProgress = () => ({
  type: "IN_PROGRESS"
})

export const apiError = (error) => ({
  type: "ERROR",
  payload: error
})

export const dropUser = () => ({
  type: "DROP_USER",
  payload: null
})