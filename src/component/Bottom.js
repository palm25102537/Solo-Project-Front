import React, { useEffect } from 'react'
import {
  HomeOutlined,
  IdcardOutlined,
  ShoppingCartOutlined,
  ShopOutlined,
  UserOutlined,
  UserAddOutlined
} from '@ant-design/icons'
import { useHistory } from 'react-router-dom'
import { useAuthen } from '../context/AuthenContextProvider'
import service from '../services/localStorageService'

const { getToken } = service

function Buttom() {
  const history = useHistory()
  const { state, dispatch } = useAuthen()


  function handlerSignOut() {

    history.push('/')
    dispatch({ type: 'clearToken' })
  }
  return (
    <div className="App-buttomer">
      <div>
        <button onClick={() => history.push('/')} className="button-buttom" style={{ backgroundColor: `inherit`, border: 'none' }}><HomeOutlined style={{ marginTop: '3px', fontSize: '32px', color: '#FFFFFF' }} />
          <br /><p style={{ color: 'white' }}>Home</p></button>
      </div>

      <div>
        <button className="button-buttom" style={{ backgroundColor: `inherit`, border: 'none' }}><ShoppingCartOutlined style={{ marginTop: '3px', fontSize: '32px', color: '#FFFFFF' }} />
          <br /><p style={{ color: 'white' }}>Cart</p></button>
      </div>
      <div>
        <button onClick={() => history.push('/product')} className="button-buttom" style={{ backgroundColor: `inherit`, border: 'none' }}><ShopOutlined style={{ marginTop: '3px', fontSize: '32px', color: '#FFFFFF' }} />
          <br /><p style={{ color: 'white' }}>Product</p></button>
      </div>
      {
        !state.isAuthen ? (
          <div>
            <button onClick={() => history.push('/signup')} className="button-buttom" style={{ backgroundColor: `inherit`, border: 'none' }}><UserAddOutlined style={{ marginTop: '3px', fontSize: '32px', color: '#FFFFFF' }} />
              <br /><p style={{ color: 'white' }}>SignUp</p></button>
          </div>
        ) : (
          <div>
            <button onClick={() => history.push('/profile')} className="button-buttom" style={{ backgroundColor: `inherit`, border: 'none' }}><IdcardOutlined style={{ marginTop: '3px', fontSize: '32px', color: '#FFFFFF' }} />
              <br /><p style={{ color: 'white' }}>Profile</p></button>
          </div>
        )
      }

      { !state.isAuthen ? (
        <div>
          <button onClick={() => history.push('/signin')} className="button-buttom" style={{ backgroundColor: `inherit`, border: 'none' }}><UserOutlined style={{ marginTop: '3px', fontSize: '32px', color: '#FFFFFF' }} />
            <br /><p style={{ color: 'white' }}>SignIn</p></button>
        </div>) : (<div>
          <button onClick={handlerSignOut} className="button-buttom" style={{ backgroundColor: `inherit`, border: 'none' }}><UserOutlined style={{ marginTop: '3px', fontSize: '32px', color: '#FFFFFF' }} />
            <br /><p style={{ color: 'white' }}>SignOut</p></button>
        </div>)
      }
    </div >
  )
}

export default Buttom
