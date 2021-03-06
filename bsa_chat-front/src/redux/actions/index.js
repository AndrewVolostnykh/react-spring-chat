import Messages from "../../data/Messages";

export const getMessages = (userId) => ({
  type: 'GET_MESSAGES',
  payload: userId
})

export const deleteMessage = msId => ({
  type: 'DELETE_MESSAGE',
  payload: msId
})

export const setLike = msId => ({
  type: 'SET_LIKE',
  payload: msId
})

export const addMessage = ms => ({
  type: 'ADD_MESSAGE',
  payload: ms
})

export const editMessage = (ms, body, history) => ({
  type: 'EDIT_MESSAGE',
  payload: {ms: {...ms, text: body}, history: history}
})

export const toggleEditWindow = ms => ({
  type: 'TOGGLE_EDIT',
  payload: ms
})

export const loginUser = (name, password) => ({
  type: "LOGIN_USER",
  payload: {userName: name, password: password}
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

export const getUsers = adminId => ({
  type: 'GET_USERS',
  payload: adminId
})

export const editUser = ({userName, isAdmin, password, avatar, userId}) => ({
  type: 'EDIT_USER',
  payload: {userName, isAdmin, password, avatar, userId}
})

export const deleteUser = ({userId}) => ({
  type: 'DELETE_USER',
  payload: userId
})

export const createUser = ({userName, isAdmin, password, avatar, userId}) => ({
  type: 'CREATE_USER',
  payload: {userName, isAdmin, password, avatar, userId}
})
