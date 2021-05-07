import React, { useState } from 'react'
import Bottom from '../component/Bottom'
import { Button } from 'antd';
import axios from 'axios'
import { useAuthen } from '../context/AuthenContextProvider'
import { useHistory } from 'react-router-dom'
import { EyeOutlined } from '@ant-design/icons';

function SignUpPage() {
  const [state, setState] = useState({
    name: '',
    userName: '',
    password: '',
    confirmPassword: '',
    email: '',
    phoneNumber: '',

  })

  const history = useHistory()

  const { dispatch } = useAuthen()
  function handlerChange(event) {
    const { id, value } = event.target
    setState((previous) => ({ ...previous, [id]: value }))
    console.log(state)
  }
  async function handlerSubmit() {
    try {
      const respond = await axios.post('user/register', state)
      console.log(respond)
      const { data: { data, message, token } } = respond
      dispatch({ type: 'getToken', token })
      alert(message)
      history.push('/')
    } catch (err) {
      console.log(err.response)
      const { data } = err.response
      alert(data)
    }


  }
  function handlerCancel() {
    const isCancel = window.confirm('Are you sure to cancel?')
    if (isCancel) {
      history.push('/')
    }
  }

  const [cover, setCover] = useState({
    status: false,
    type: "password"
  })
  const [covers, setCovers] = useState({
    status: false,
    type: "password"
  })
  function handlerChangeMode() {
    if (cover.status === false) {
      setCover({ status: true, type: "text" })
    }

    if (cover.status === true) {
      setCover({ status: false, type: 'password' })
    }

  }

  function handlerChangeMode2() {
    if (covers.status === false) {
      setCovers({ status: true, type: "text" })
    }

    if (covers.status === true) {
      setCovers({ status: false, type: 'password' })
    }

  }
  return (
    <div className="App">
      <div className='App-signUp-header'>
        <h1>Sign Up</h1>
      </div>
      <form>
        <div className='App-signUp-form-container'>
          <div>
            <label htmlFor="name">Name</label>
            <br />
            <input onChange={(e) => handlerChange(e)} id='name' className="signUp-input" value={state.name}></input>
          </div>
          <div>
            <label htmlFor="username">Username</label>
            <br />
            <input onChange={(e) => handlerChange(e)} id='userName' className="signUp-input" value={state.userName}></input>
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <br />
            <input type={cover.type} onChange={(e) => handlerChange(e)} id='password' className="signUp-input" value={state.password}></input>
            <Button onClick={handlerChangeMode} shape="none" size='small' style={{
              position: 'absolute',
              backgroundColor: 'inherit',
              marginTop: '0px',
              marginLeft: '-30px',
              border: 'none',

            }} icon={<EyeOutlined />}></Button>
          </div>
          <div>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <br />
            <input type={covers.type} onChange={(e) => handlerChange(e)} id='confirmPassword' className="signUp-input" value={state.confirmPassword}></input>
            <Button onClick={handlerChangeMode2} shape="none" size='small' style={{
              position: 'absolute',
              backgroundColor: 'inherit',
              marginTop: '0px',
              marginLeft: '-30px',
              border: 'none',

            }} icon={<EyeOutlined />}></Button>
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <br />
            <input onChange={(e) => handlerChange(e)} id='email' className="signUp-input" value={state.email}></input>
          </div>
          <div>
            <label htmlFor="phoneNumber">Phone Number</label>
            <br />
            <input onChange={(e) => handlerChange(e)} id='phoneNumber' className="signUp-input" value={state.phoneNumber}></input>
          </div>
          <div>
            <label htmlFor="address">Address</label>
            <br />
            <textarea onChange={(e) => handlerChange(e)} id='address' className="signUp-input2" type='textArea' value={state.address}></textarea>
          </div>
        </div>
      </form>
      <div className='signUp-button-container'>
        <Button style={{
          background: "#ED639E",
          color: 'white',
          height: '40px',
          width: '150px',
          fontSize: '18px',
          borderRadius: '20px',
          marginRight: '20px'
        }} shape="square" onClick={handlerSubmit}> Submit </Button>
        <Button style={{
          background: "#ED639E",
          color: 'white',
          height: '40px',
          width: '150px',
          fontSize: '18px',
          borderRadius: '20px'
        }} shape="square" onClick={handlerCancel}> Cancel </Button>
      </div>

      <Bottom />
    </div>
  )
}

export default SignUpPage
