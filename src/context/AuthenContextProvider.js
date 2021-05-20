import { createContext, useReducer, useContext, useState } from 'react'
import service from '../services/localStorageService'
import axios from 'axios'


const { getToken, clearToken, setToken, setUser, clearUser, getUser } = service

export const AuthContext = createContext(null)


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
  const [loading, setLoading] = useState(false)
  const [cart, setCart] = useState([])
  const [checkCart, setCheckCart] = useState(false)
  const [maxCounter, setMaxCounter] = useState()
  const [filter, setFilter] = useState({
    status: false,
    word: ''
  })
  function showFilter(event) {

    const { textContent } = event.target
    setFilter({ status: true, word: textContent })
  }
  const authenProvide = { state, dispatch, getMe, loading, setLoading, cart, setCart, checkCart, setCheckCart, maxCounter, setMaxCounter, filter, setFilter, showFilter }
  return (
    <AuthContext.Provider value={authenProvide}>{props.children}</AuthContext.Provider>
  )
}

function useAuthContext() {

  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must use under AuthProvider");
  }
  return context;
}

export { AuthenProvider, useAuthContext }
