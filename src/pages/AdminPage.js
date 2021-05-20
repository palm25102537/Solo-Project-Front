import React, { useState, useEffect } from 'react'
import Bottom from '../component/Bottom'
import { useAuthContext } from '../context/AuthenContextProvider'
import User from '../component/User'
import Product from '../component/Product'
import Order from '../component/Order'
import { useHistory } from 'react-router-dom'
import axios from 'axios'


function AdminPage() {
  const [nameUser, setNameUser] = useState()

  const [status, setStatus] = useState({
    user: false,
    product: false,
    order: false,
    supplier: false,
    transport: false,

  })

  const history = useHistory()


  const { state, getMe } = useAuthContext()
  const [supplier, setSupplier] = useState()
  const [category, setCategory] = useState()
  useEffect(async () => {
    const respond = await getMe(state.user)

    const { name, isAdmin } = respond

    if (isAdmin !== "Admin") history.push('/')
    setNameUser(name)

    const supply = await axios.get('/supplier')
    setSupplier(supply)

    const cat = await axios.get('/category')

    setCategory(cat)

  }, [])

  return (
    <div className="App">
      <div style={{
        height: status.product || status.order ? '92%' : '92vh'
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
          }} onClick={() => setStatus({ order: true })}>Order</button>
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
              <h1 style={{ color: 'white' }}><strong>WELCOME <br /> {nameUser?.toUpperCase()}</strong></h1>
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
              <Product supplier={supplier} category={category} />
            </div>
          )
        }
        {
          status.order && (
            <div >
              <Order />
              <br />
            </div>
          )
        }
      </div>
      <Bottom />
    </div >
  )
}

export default AdminPage
