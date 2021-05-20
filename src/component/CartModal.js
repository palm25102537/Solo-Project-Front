import React, { useState, useEffect } from 'react'
import { Modal, Button, Dropdown, Menu, message } from 'antd'
import { useAuthContext } from '../context/AuthenContextProvider'
import { DownOutlined, InfoCircleFilled, InfoOutlined } from '@ant-design/icons'
import service from '../services/localStorageService'
import axios from '../config/axios'
import CheckOrderModal from '../component/CheckOrderModal'
function CartModal() {
  const { checkCart, setCheckCart, cart, setCart, getMe, maxCounter, setMaxCounter } = useAuthContext()

  const { getUser } = service
  const [visible, setVisible] = useState(false)
  const [info, setInfo] = useState({
    name: '',
    address: '',
    transportId: '',
    id: ''
  })
  const [trans, setTrans] = useState()
  const [newAddress, setNewAddress] = useState(false)
  const [show, setShow] = useState({
    transport: 'Transport By',
    address: `${info.address}`
  })
  const [see, setSee] = useState(false)

  const sumSold = cart.reduce((acc, item) => {

    return acc = acc + (item.price * item.amount)

  }, 0)

  function handleVisibility() {
    setCheckCart(false)
    setVisible(true)
  }

  async function getTrans() {
    const trans = await axios.get('/transport')
    console.log(trans)
    const { data: { data } } = trans
    setTrans(data)
  }


  useEffect(async () => {
    const respond = await getMe(getUser())
    if (respond) {
      const { name, address, id } = respond
      setInfo({ name, address, id, transportId: '' })
    }
    getTrans()
  }, [])

  function handleTransport(event) {
    const { id, value } = event.target
    setShow({ transport: value, address: '' })
    info.transportId = id
  }
  function handleAddress(event) {
    const { value } = event.target
    console.log(value)
    setShow({ transport: show.transport, address: value })
    if (value === 'New Address') {
      setNewAddress(true)
    }
  }

  function handleNewChange(event) {
    const { value } = event.target
    setShow({ transport: show.transport, address: value })
  }

  async function handleNewAddress() {
    await axios.put('/user', { address: show.address, id: info.id })
    setNewAddress(false)
    const respond = await getMe(getUser())
    if (respond) {
      const { name, address, id } = respond
      console.log(id)
      setInfo({ name, address, id, transportId: info.transportId })
    }

  }
  const success = () => {

    message.success('Placed Order')
  }

  async function createOrder() {
    const { name, address, id, transportId } = info
    console.log(transportId)
    await axios.post('/order/register', { deliveryAddress: address, transportId, item: cart })
    let i;
    let j;
    let a = 1;
    for (i = 0; i <= cart.length && i + 1 < cart.length; i++) {
      console.log(i, i + 1)
      if (cart[i].productId === cart[i + 1].productId) {
        a = a + 1
        j = a * cart[i].amount
        // console.log(a)
        console.log(j)
        console.log(maxCounter)
      }
    }

    cart.map(async (item) => {

      await axios.put(`/product/edit/${item.productId}`, { amount: maxCounter - item.amount })
      setMaxCounter(+maxCounter - item.amount)
    })
    success()


  }

  const menuTransport = (
    <Menu>
      {
        trans?.map((item) => {
          return (
            <Menu.Item >
              <button onClick={(e) => handleTransport(e)} id={item.id} value={item.name} style={{ backgroundColor: 'inherit', border: 'none', outline: 'none' }}>
                {item.name}
              </button>
            </Menu.Item>
          )
        })
      }
    </Menu>
  )

  const menuDeliverAddress = (
    <Menu>
      <Menu.Item >
        <button value={info.address} onClick={(e) => handleAddress(e)} style={{ backgroundColor: 'inherit', border: 'none', outline: 'none' }}>
          {info.address}
        </button>
      </Menu.Item>
      <Menu.Item >
        <button value="New Address" onClick={(e) => handleAddress(e)} style={{ backgroundColor: 'inherit', border: 'none', outline: 'none' }}>
          New Address
        </button>
      </Menu.Item>
    </Menu>
  )

  function setSeeAble() {
    setVisible(false)
    setSee(true)

  }




  return (
    <div>

      <Modal visible={checkCart} onCancel={() => setCheckCart(false)} onOk={() => handleVisibility()} >
        <h1>Cart</h1>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-evenly', width: '100%' }}>
            <div style={{ width: '40%' }}>
              <p><strong>Name</strong></p>
            </div>
            <div style={{ width: '20%', textAlign: 'center' }}>
              <p><strong>Price</strong></p>
            </div>
            <div style={{ width: '20%', textAlign: 'center' }}>
              <p><strong>Amount</strong></p>
            </div>
            <div style={{ width: '20%', textAlign: 'center' }}>
              <p><strong>Total</strong></p>
            </div>
          </div>
          {
            cart.map((item) => {
              const net = item.price * item.amount
              return (
                <div key={item.id} style={{ display: 'flex', width: '100%' }}>
                  <div style={{ width: '40%' }}>
                    <p>{item.name}</p>
                  </div>
                  <div style={{ width: '20%', textAlign: 'center' }}>
                    <p>{item.price}</p>
                  </div>
                  <div style={{ width: '20%', textAlign: 'center' }}>
                    <p>{item.amount}</p>
                  </div>
                  <div style={{ width: '20%', textAlign: 'center' }}>
                    <p>{net}</p>
                  </div>
                </div>
              )
            })
          }
          <div>
            <strong><p>Net  <span>{sumSold}</span>   <span>THB</span>  </p></strong>
          </div>
          <div>
            <Button onClick={() => setCart([])} type="danger">Clear</Button>
          </div>
        </div>
      </Modal >
      <Modal visible={visible} onCancel={() => setVisible(false)} onOk={setSeeAble}>
        <h1>Cofirm Order</h1>
        <div style={{ display: 'flex', justifyContent: 'space-evenly', width: '100%' }}>
          <div style={{ width: '50%' }}>
            <p><strong>Name</strong></p>
          </div>
          <div style={{ width: '50%', textAlign: 'center' }}>
            <p><strong>Amount</strong></p>
          </div>
        </div>
        {
          cart.map((item) => {
            return (
              <div key={item.id} style={{ display: 'flex', width: '100%' }}>
                <div style={{ width: '50%' }}>
                  <p>{item.name}</p>
                </div>
                <div style={{ width: '50%', textAlign: 'center' }}>
                  <p>{item.amount}</p>
                </div>
              </div>
            )
          })
        }
        <div>
          <strong><p>Net  <span>{sumSold}</span>   <span>THB</span>  </p></strong>
        </div>
        <div>
          <label htmlFor="name">Transport By : </label>
          <Dropdown overlay={menuTransport} placement="bottomCenter" trigger={['click']} >
            <a style={{ backgroundColor: 'inherit', border: 'none' }} >
              {show.transport} <DownOutlined />
            </a>
          </Dropdown>
        </div>
        <div>
          <label htmlFor="name">Deliver Address : </label>
          <Dropdown overlay={menuDeliverAddress} placement="bottomCenter" trigger={['click']} >
            <a style={{ backgroundColor: 'inherit', border: 'none' }} >
              {show.address || 'Your Address'} <DownOutlined />
            </a>
          </Dropdown>
        </div>
        <div style={{ marginTop: '10px' }}>
          {
            newAddress ? (
              <div>
                <label htmlFor='address'>Address</label>
                <br />
                <textarea onChange={(e) => handleNewChange(e)} value={show.address} id='address' style={{ width: '250px', height: '100px' }}></textarea>
                <br />
                <div>
                  <button onClick={handleNewAddress}>Add new Address</button>
                </div>
              </div>
            ) : (
              <div>
                <button onClick={() => createOrder()}>Submit</button>
              </div>
            )
          }
        </div>

      </Modal>
      <CheckOrderModal see={see} setSee={setSee} />
    </div >
  )
}

export default CartModal
