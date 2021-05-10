import React, { useEffect, useState } from 'react'
import { Menu, Dropdown } from 'antd';
import axios from 'axios'
import { DownOutlined } from '@ant-design/icons'

function User() {
  const [user, setUser] = useState()
  const [id, setId] = useState()
  async function getUser() {
    const res = await axios.get('/user')
    console.log(res)
    const { data: { data } } = res
    setUser(data)
  }
  useEffect(() => { getUser() }, [])

  const menuRole = (
    <Menu>
      <Menu.Item>
        <button onClick={(e) => handlerEditRole(e)} id="Admin" style={{ backgroundColor: 'inherit', border: 'none' }}>
          Admin
          </button>
      </Menu.Item>
      <Menu.Item >
        <button id="Not admin" onClick={(e) => handlerEditRole(e)} style={{ backgroundColor: 'inherit', border: 'none' }} >
          Not Admin
          </button>
      </Menu.Item>
    </Menu>
  )

  const menuStatus = (
    <Menu>
      <Menu.Item >
        <button id="Deleted" onClick={(e) => handlerStatus(e)} style={{ backgroundColor: 'inherit', border: 'none' }} >
          Delete
        </button>
      </Menu.Item>
    </Menu>
  )
  async function handlerEditRole(event) {

    const isAccept = window.confirm('Are you confirmed to change this user role ?')
    if (isAccept) {
      await axios.put('/user', { isAdmin: event.target.id, id })

      getUser()
    } else {
      return
    }


  }

  async function handlerStatus(event) {
    const isAccept = window.confirm('Are you confirmed to deleted this user ?')
    if (isAccept) {
      await axios.put('/user', { status: event.target.id, id })
      getUser()
    } else {
      return
    }
  }
  return (
    <div className="App">
      {
        user?.map((item) => {

          return (
            <div style={{ marginLeft: '10px', marginTop: '10px', height: '85%' }}>
              <div>
                <p style={{ color: 'white' }}>User number {item.id}</p>
              </div>
              <p style={{ color: 'white' }}>Name : {item.name} <span>Email : {item.email} </span></p>

              <Dropdown overlay={menuRole} placement="topCenter" trigger={['click']} onClick={() => setId(item.id)}>
                <a style={{ backgroundColor: 'inherit', border: 'none' }} >
                  Role : {item.isAdmin} <DownOutlined />
                </a>
              </Dropdown>
              <br />
              <Dropdown overlay={menuStatus} placement="bottomCenter" trigger={['click']} onClick={() => setId(item.id)}>
                <a style={{ backgroundColor: 'inherit', border: 'none' }} >
                  Status : {item.status} <DownOutlined />
                </a>
              </Dropdown>

            </div>

          )
        })
      }
      <br />
      <div style={{ marginLeft: '10px', marginTop: '10px' }}>
        <a href="/">Back to Home ...</a>
      </div>
    </div >
  )
}

export default User
