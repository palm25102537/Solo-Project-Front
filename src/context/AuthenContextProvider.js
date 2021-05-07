import { createContext, useReducer, useContext, useState } from 'react'
import service from '../services/localStorageService'
import axios from 'axios'


const { getToken, clearToken, setToken, setUser, clearUser, getUser } = service

export const create = createContext()


const STATE = {
  isAuthen: getToken(),
  user: getUser(),
}

function authenToken(state, action) {
  switch (action.type) {
    case 'getToken': {
      setToken(action.token)
      setUser(action.user)

      return { ...state, isAuthen: action.token, user: action.user }
    }
    case 'clearToken': {
      clearToken()
      clearUser()
      return { isAuthen: getToken(), user: getUser() }
    }
    default: return state;
  }
}



async function getMe(id) {
  if (id) {
    const respond = await axios.get(`/user/me`)
    const { data: { data } } = respond
    return data
  } else {
    return null
  }

}
function AuthenProvider(props) {
  const [state, dispatch] = useReducer(authenToken, STATE)

  const authenProvide = { state, dispatch, getMe }
  return (
    <create.Provider value={authenProvide}>{props.children}</create.Provider>
  )
}

function useAuthen() {

  const context = useContext(create);
  if (context === undefined) {
    throw new Error("useCounter must use under CounterProvider");
  }
  return context;
}

export { AuthenProvider, useAuthen }
