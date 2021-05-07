import React, { useState, useEffect } from 'react'
import Bottom from '../component/Bottom'
import { useAuthen } from '../context/AuthenContextProvider'
import User from '../component/User'
import Product from '../component/Product'

function AdminPage() {
  const [nameUser, setNameUser] = useState()

  const [status, setStatus] = useState({
    user: false,
    product: false,
    order: false,
    supplier: false,
    transport: false
  })


  const { state, getMe } = useAuthen()
  useEffect(async () => {
    const respond = await getMe(state.user)
    const { name } = respond

    setNameUser(name)

  }, [])

  return (
    <div className="App">
      <div style={{
        height: status.product ? '92%' : '92vh'
      }}>
        <div style={{
          height: '5vh',
          backgroundColor: '#ee87bcbb',
          display: 'flex',
          justifyContent: 'space-around',
          color: 'white'
        }}>
          <button style={{
            width: '20vw',
            backgroundColor: 'inherit',
            border: 'none',
          }} onClick={() => setStatus({ user: true })} >User</button>
          <button style={{
            width: '20vw',
            backgroundColor: 'inherit',
            border: 'none',
          }} onClick={() => setStatus({ product: true })} > Product</button>
          <button style={{
            width: '20vw',
            backgroundColor: 'inherit',
            border: 'none',
          }}>Order</button>
          <button style={{
            width: '20vw',
            backgroundColor: 'inherit',
            border: 'none',
          }}>Supplier</button>
          <button style={{
            width: '20vw',
            backgroundColor: 'inherit',
            border: 'none',
          }}>Transport</button>
        </div>
        {
          !status.user && !status.order && !status.product && !status.supplier && !status.transport && (
            <div style={{ textAlign: 'center', marginTop: '10px' }}>
              <h1 style={{ color: 'white' }}><strong>WELCOME {nameUser?.toUpperCase()}</strong></h1>
            </div>
          )
        }
        {
          status.user && (
            <div>
              <User />
            </div>
          )
        }
        {
          status.product && (
            <div>
              <Product />
            </div>
          )
        }
      </div>
      <Bottom />
    </div >
  )
}

export default AdminPage
