import React, { useState, useEffect } from 'react'
import Bottom from '../component/Bottom'
import { Button, Modal } from 'antd';
import axios from 'axios'
import { EyeOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom'

function Profile() {
  const [state, setState] = useState({})
  const [editMode, setEditMode] = useState({
    status: false,
    word: ''
  })
  const [editPwd, setEditPwd] = useState({
    status: false,
    word: ''
  })

  const [password, setPassword] = useState({
    newpassword: '',
    confirmPassword: '',
    oldpassword: ''
  })

  const [editName, setEditName] = useState({
    status: false,
    word: ''
  })

  const [editUsername, setEditUsername] = useState({
    status: false,
    word: ''
  })

  const [editEmail, setEditEmail] = useState({
    status: false,
    word: ''
  })

  const [editPhoneNumber, setEditPhoneNumber] = useState({
    status: false,
    word: ''
  })

  const [changePasswordMode, setChangePasswordMode] = useState({
    status: false,
    text: 'password'
  })
  const [changePasswordMode2, setChangePasswordMode2] = useState({
    status: false,
    text: 'password'
  })
  const [changePasswordMode3, setChangePasswordMode3] = useState({
    status: false,
    text: 'password'
  })
  async function getData() {
    const respond = await axios.get('/user/me')

    const { data: { data: { name, userName, email, phoneNumber, address, isAdmin } } } = respond

    setState({ name, userName, email, phoneNumber, address, isAdmin })
  }

  const history = useHistory()

  useEffect(() => { getData() }, {})


  async function handlerEdit(event) {
    if (editMode.status === false) {
      setEditMode({ status: true, word: '' })
    }

    if (event.key === "Enter") {
      if (editMode.status === true) {

        await axios.put('/user', { address: editMode.word })

        setEditMode({ status: false })

        getData()
      }
    }

  }

  function handlerEditAddress(event) {
    editMode.word = event.target.value
    console.log(editMode)
  }

  function handlerEditPwd(event) {
    if (editPwd.status === false) {
      setEditPwd({ status: true, word: '' })
    }
    if (event.key === "Enter") {
      if (editPwd.status === true) {
        setEditPwd({ status: false })
      }
    }

  }

  function handlerModalPassword(event) {
    const { id, value } = event.target
    setPassword((previous) => ({ ...previous, [id]: value }))
  }

  async function handlerChangePassword() {
    await axios.put('/user', password)
    setEditPwd({ status: false })
    getData()
  }

  function handlerChangeName(event) {
    editName.word = event.target.value
  }

  async function handlerEditName(event) {
    if (event.key === 'Enter') {
      await axios.put('/user', { name: editName.word })
      setEditName({ status: false })
      getData()
    }

  }

  async function handlerEditUsername(event) {
    if (event.key === 'Enter') {
      await axios.put('user', { userName: editUsername.word })
      setEditUsername({ status: false })
      getData()
    }
  }
  function handlerChangeUsername(event) {
    editUsername.word = event.target.value
  }
  function handlerChangeEmail(event) {
    editEmail.word = event.target.value
  }
  async function handlerEditEmail(event) {

    if (event.key === 'Enter') {
      const isEmail = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
      !isEmail.test(editEmail.word) ? alert('Invalid Email') : await axios.put('/user', { email: editEmail.word })
      setEditEmail({ status: false })
      getData()
    }

  }
  async function handlerEditPhoneNumber(event) {
    if (event.key === 'Enter') {
      isNaN(+editPhoneNumber.word) ? alert('Phone number must be numeral') : await axios.put('/user', { phoneNumber: editPhoneNumber.word })
      setEditPhoneNumber({ status: false })
      getData()
    }
  }
  function handlerChangePhoneNumber(event) {
    editPhoneNumber.word = event.target.value
  }
  return (
    <div className="App">
      <div style={{ height: '92vh' }}>
        <div className='App-profile-header'>
          <h1 style={{
            paddingTop: '10px',
            color: 'white'
          }}>Profile</h1>
          {
            state.isAdmin === `Admin` ? (

              <Button style={{
                background: "inherit",
                color: 'white',
                border: 'none',
                height: '40px',
                marginLeft: '100px',
                fontSize: '16px',
                borderRadius: '20px',
                textAlign: 'center',

              }} shape="square"
                onClick={() => history.push('/admin')}>Admin Page</Button>

            ) : (
              <Button style={{
                background: "inherit",
                color: 'white',
                border: 'none',
                height: '40px',
                marginLeft: '100px',
                fontSize: '16px',
                borderRadius: '20px',
                textAlign: 'center',

              }} shape="square"
                onClick={() => history.push('/order')}>Order Status</Button>
            )
          }

        </div>
        <div className='App-profile-content1'>
          <div className='profile-pic'>
            <div>
              <img src="https://picsum.photos/200" alt="profile-picture"></img>
            </div>

          </div>
          <div className='profile-text1'>
            <h3 style={{ color: 'white' }}>Name</h3>
            {!editName.status ? (
              <div onClick={() => setEditName({ status: true })}>
                <h4 className='profile-content-text1'>{state.name}</h4>
              </div>
            ) : (
              <div style={{ marginBottom: '17px' }} >
                <input defaultValue={state.name} value={editName.word} onChange={(e) => handlerChangeName(e)} onKeyUp={(e) => handlerEditName(e)} style={{ width: '140px' }}></input>
              </div>
            )}

            <h3 style={{ color: 'white' }}>Username</h3>
            {!editUsername.status ? (
              <div onClick={() => setEditUsername({ status: true })}>
                <h4 className='profile-content-text1'>{state.userName}</h4>
              </div>
            ) : (
              <div style={{ marginBottom: '17px' }}>
                <input value={editUsername.word} defaultValue={state.userName} onChange={(e) => handlerChangeUsername(e)} onKeyUp={(e) => handlerEditUsername(e)} style={{ width: '140px' }}></input>
              </div>
            )}

            <h3 style={{ color: 'white' }}>Password</h3>
            {!editPwd.status ? (
              <div onClick={handlerEditPwd}>
                <h4 className='profile-content-text1'>##############</h4>
              </div>
            ) : (
              <div>
                <h4 className='profile-content-text1'>##############</h4>
                <Modal visible={editPwd.status} onOk={handlerChangePassword} onCancel={() => setEditPwd({ status: false })}>
                  <p>Change Password</p>
                  <label htmlFor="oldPassword">Old Password : </label>
                  <span>
                    <input style={{
                      outline: 'none',
                      border: 'none',
                      backgroundColor: '#ee316b',
                      color: 'white'
                    }} type={changePasswordMode.text} onChange={(e) => handlerModalPassword(e)} id="oldpassword" value={password.oldpassword}></input>
                    <Button style={{
                      border: 'none',

                    }} shape="none" size="small" icon={<EyeOutlined />} onClick={() => changePasswordMode.status ? setChangePasswordMode({ status: false, text: 'password' }) : setChangePasswordMode({ status: true, text: 'text' })}></Button>
                  </span>
                  <br />
                  <br />
                  <label htmlFor='newpassword'>New Password : </label>
                  <span>
                    <input style={{
                      outline: 'none',
                      border: 'none',
                      backgroundColor: '#ee316b',
                      color: 'white'
                    }} type={changePasswordMode2.text} onChange={(e) => handlerModalPassword(e)} value={password.newpassword} id='newpassword'></input>
                    <Button style={{ border: 'none' }} shape="none" size="small" icon={<EyeOutlined />} onClick={() => changePasswordMode2.status ? setChangePasswordMode2({ status: false, text: 'password' }) : setChangePasswordMode2({ status: true, text: 'text' })}></Button>
                  </span>
                  <br />
                  <br />
                  <label htmlFor='confirmPassword'>Confirm Password : </label>
                  <span>
                    <input style={{
                      outline: 'none',
                      border: 'none',
                      backgroundColor: '#ee316b',
                      color: 'white'
                    }} type={changePasswordMode3.text} onChange={(e) => handlerModalPassword(e)} id='confirmPassword' value={password.confirmpassword}></input>
                    <Button style={{ border: 'none' }} shape="none" size="small" icon={<EyeOutlined />} onClick={() => changePasswordMode3.status ? setChangePasswordMode3({ status: false, text: 'password' }) : setChangePasswordMode3({ status: true, text: 'text' })}></Button>
                  </span>
                </Modal>
              </div>


            )}

          </div>
        </div>
        <div className='profile-text2'>
          <h3 style={{ marginLeft: '5px', color: 'white' }}>Email</h3>
          {!editEmail.status ?
            (
              <div onClick={() => setEditEmail({ status: true })}>
                <h4 className='profile-content-text1' style={{ textAlign: 'center' }}>{state.email}</h4>
              </div>
            ) : (
              <div style={{ marginBottom: '17px' }}>
                <input defaultValue={state.email} value={editEmail.word} onChange={(e) => handlerChangeEmail(e)} onKeyUp={(e) => handlerEditEmail(e)} style={{ marginLeft: '8px', width: '358px' }}></input>
              </div>
            )}


        </div>
        <div className='profile-text2'>
          <h3 style={{ marginLeft: '5px', color: 'white' }}>Phone Number</h3>
          {!editPhoneNumber.status ?
            (
              <div onClick={() => setEditPhoneNumber({ status: true })}>
                <h4 className='profile-content-text1' style={{ textAlign: 'center' }}>{state.phoneNumber}</h4>
              </div>
            ) : (
              <div style={{ marginBottom: '17px' }}>
                <input defaultValue={state.phoneNumber} value={editPhoneNumber.word} onKeyUp={(e) => handlerEditPhoneNumber(e)} onChange={(e) => handlerChangePhoneNumber(e)} style={{ marginLeft: '8px', width: '358px', }} ></input>
              </div>
            )
          }

        </div>
        <br />
        <div style={{
          wordWrap: 'break-word',
          height: '242.5px'
        }}>
          <h3 style={{ marginLeft: '5px', color: 'white' }}>Address</h3>

          {editMode.status === false && (
            <div >
              <div onClick={handlerEdit}>
                <h4 className='profile-content-text1'>{state.address ? state.address.trim() === "" ? `Please insert your address...` : state.address === null ? `Please insert your address...` : state.address : state.address}</h4>
              </div>
            </div>
          )}
          {
            editMode.status === true && (
              <div >
                <textarea defaultValue={state.address} onKeyUp={handlerEdit} onChange={(e) => handlerEditAddress(e)} value={editMode.text} style={{ marginLeft: '10px', width: '350px', height: '150px' }}></textarea>
              </div>
            )
          }

        </div>

      </div>
      <Bottom />
    </div >
  )
}

export default Profile
