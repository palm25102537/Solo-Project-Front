import React, { useState } from 'react'
import Bottom from '../component/Bottom'
import { Button } from 'antd';
import { UserOutlined, EyeOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom'
import axios from '../config/axios'
import { useAuthen } from '../context/AuthenContextProvider'

function SignInPage() {
  const [state, setState] = useState({
    username: '',
    password: ''
  })

  const history = useHistory()

  const { dispatch } = useAuthen()

  const [cover, setCover] = useState({
    status: false,
    type: "password"
  })

  function handlerChange(event) {
    const { id, value } = event.target
    setState((stack) => ({ ...stack, [id]: value }))
  }

  async function handlerSubmitSignin() {
    try {
      let respond = await axios.post('/user', state)

      const { data: { data, message, token } } = respond

      dispatch({ type: 'getToken', token, user: data.id })

      history.push('/')
    } catch (err) {
      console.log(err.response)
    }
  }

  function handlerChangeMode() {
    if (cover.status === false) {
      setCover({ status: true, type: "text" })
    }

    if (cover.status === true) {
      setCover({ status: false, type: 'password' })
    }

  }
  return (
    <div className="App">
      <div style={{ height: '92vh' }}>
        <div className="App-login">
          <h1>Snick Snack</h1>
        </div>
        <div className='App-login-form-container'>
          <form >
            <div className='App-login-input-container'>
              <div>
                <label htmlFor='username'>Username : </label>
                <input id='username' className="signIn-input1" placeholder='Username/Email' value={state.userName} onChange={(e) => { handlerChange(e) }}></input>
              </div>
              <div >
                <label htmlFor='password'>Password : </label>
                <input type={cover.type} id='password' className="signIn-input2" placeholder="Password" value={state.password} onChange={(e) => { handlerChange(e) }}></input>
                <Button onClick={handlerChangeMode} shape="none" size='small' style={{
                  position: 'absolute',
                  backgroundColor: 'inherit',
                  marginTop: '44px',
                  marginLeft: '-30px',
                  border: 'none',

                }} icon={<EyeOutlined />}></Button>
              </div>
            </div>
            <div className='App-login-button-container'>
              <Button onClick={handlerSubmitSignin} style={{ background: "#ED639E", color: 'white', height: '40px', width: '150px', fontSize: '18px', borderRadius: '20px' }} shape="square" icon={<UserOutlined />}> Sign In </Button>
            </div>
          </form>
          <br />
          <br />
        </div>
        <div className='App-login-bottom'>
          <a href="/signup">Sign up</a>
          <br />
          <br />
          <a>Reset Password</a>
        </div>
      </div>
      <Bottom />
    </div >
  )
}

export default SignInPage
