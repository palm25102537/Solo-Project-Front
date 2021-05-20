import React, { useState, useEffect } from 'react'
import Head from '../component/Head'
import Bottom from '../component/Bottom'
import axios from '../config/axios'
import service from '../services/localStorageService'
import { Button, Modal, Dropdown, Menu } from 'antd';
import { DownOutlined } from '@ant-design/icons'
import { useAuthContext } from '../context/AuthenContextProvider'

function OrderPage() {

  const { getUser } = service
  const [order, setOrder] = useState()
  const [account, setAccount] = useState()
  const [showAccount, setShowAccount] = useState({
    name: '',
    account: 'Account',
    bankName: '',
    id: '',

  })
  const { filter, setFilter, showFilter } = useAuthContext()
  const [visible, setVisible] = useState()
  const [pic, setPic] = useState({
    file: null,
    orderId: ''
  })
  async function getOrder() {
    const respond = await axios.get(`/order?me=${getUser()}&sort=ok&item=id&desc=desc`)

    const { data: { data } } = respond
    setOrder(data)
  }

  async function getAccount() {
    const respond = await axios.get('/bankaccount')
    const { data: { data } } = respond
    setAccount(data)
  }


  useEffect(() => {
    getOrder()
    getAccount()

  }, [])

  function prepareFile(event) {
    const { files, id } = event.target

    setPic({ file: files[0], orderId: id })
  }
  function selectAccountToShow(event) {

    const { name, id, value, title } = event.target

    setShowAccount({ name, account: id, bankName: value, id: title, orderId: showAccount.orderId })
  }
  const menu = (
    <Menu>
      <Menu.Item >
        {
          account?.map((item) => {

            return (
              <div>
                <button onClick={(e) => selectAccountToShow(e)} title={item.id} name={item.name} id={item.accountNumber} value={item.bankName} style={{ backgroundColor: 'inherit', border: 'none', outline: 'none' }}>
                  {item.name}-{item.accountNumber}-{item.bankName}
                </button>
              </div>
            )
          })
        }
      </Menu.Item>
    </Menu>
  )

  async function payment() {
    const formData = new FormData()
    const { orderId, file } = pic
    const { id } = showAccount
    formData.append('image', file)
    formData.append('bankAccountId', id)
    formData.append('orderId', orderId)

    await axios.post('payment/register', formData)

    setVisible(false)
    getOrder()
  }

  return (
    <div className='App'>
      <Head />
      <div style={{ height: '84%' }}>
        <h2 style={{ textAlign: 'center' }}>Order Histrory</h2>
        <div style={{
          display: 'flex',
          justifyContent: 'space-evenly'
        }} >
          <Button onClick={(e) => showFilter(e)} value='Placed Order' style={{ backgroundColor: '#ee87bcbb', color: 'white' }}>Placed Order</Button>
          <Button onClick={(e) => showFilter(e)} value='Paid' style={{ backgroundColor: '#ee87bcbb', color: 'white' }}>Paid</Button>
          <Button onClick={(e) => showFilter(e)} value='In transit' style={{ backgroundColor: '#ee87bcbb', color: 'white' }}>In transit</Button>
          <Button onClick={(e) => showFilter(e)} value='Delivered' style={{ backgroundColor: '#ee87bcbb', color: 'white' }}>Delivered</Button>
        </div>
        <br />
        {
          !filter.status && (
            order?.map((item) => {

              const { id, orderStatus, detail, Transport } = item
              return (
                <div style={{ marginLeft: '10px' }}>
                  <h3>Order Number : <span style={{ color: 'white' }}>{id}</span></h3>
                  <h4>Order Status : {orderStatus}</h4>
                  <h4>Order detail</h4>
                  {
                    detail?.map((item) => {

                      return (

                        <div>
                          <p style={{ color: 'white' }}>{item.Product.name} <span>Price {item.price} THB Amount {item.amount} pieces</span></p>

                        </div>
                      )
                    })}
                  <p><strong>Deliver By :</strong> <span style={{ color: 'white' }}>{Transport.name}</span></p>
                  <p><strong>Net</strong> <strong>{detail?.reduce((acc, item) => {
                    acc = acc + (item.amount * item.price)
                    return acc
                  }, 0)} THB</strong>  </p>
                </div>
              )
            })
          )}

        {
          filter.status && (
            <div style={{ marginTop: '5px' }}>
              <h2 style={{ textAlign: 'center' }}>Order status : {filter.word}</h2>
              {
                order?.filter((item) => item.orderStatus === filter.word)?.map((item) => {
                  console.log(item)
                  const { id, detail, Transport, Payment } = item
                  return (
                    <div style={{ marginLeft: '10px' }}>
                      <h3>Order Number : <span style={{ color: 'white' }}>{id}</span></h3>
                      <h4>Order detail</h4>
                      {
                        detail?.map((item) => {

                          return (

                            <div>
                              <p style={{ color: 'white' }}>{item.Product.name} <span>Price {item.price} THB Amount {item.amount} pieces</span></p>

                            </div>
                          )
                        })}
                      <p><strong>Deliver By :</strong> <span style={{ color: 'white' }}>{Transport.name}</span></p>
                      <p><strong>Net</strong> <strong>{detail?.reduce((acc, item) => {
                        acc = acc + (item.amount * item.price)
                        return acc
                      }, 0)} THB</strong>  </p>
                      <p><strong>Payment status : {Payment ? Payment.status : Payment === null ? "Wait for upload payment" : Payment.status}</strong></p>
                      <div>
                        {
                          (filter.word === "Placed Order") && (<Button onClick={() => setVisible(true)} style={{ marginRight: '10px' }}>Pay</Button>)

                        }
                        <Button onClick={() => setFilter({ status: false, word: '' })} style={{ backgroundColor: '#ee87bcbb', color: 'white' }}>Back</Button>
                      </div>
                      <div>
                        <Modal visible={visible} onCancel={() => setVisible(false)} onOk={() => payment()}>
                          <h1>Payment</h1>
                          <div>
                            <label htmlFor='slip'><strong>Upload Slip</strong></label>
                            <br />
                            <br />
                            <input onChange={(e) => prepareFile(e)} id={item.id} type='file' />
                          </div>
                          <br />
                          <div style={{ marginTop: '5px' }} >
                            <label >Pay to </label>

                            <Dropdown overlay={menu} placement="bottomCenter" trigger={['click']} >
                              <a style={{ backgroundColor: 'inherit', border: 'none' }} >
                                {showAccount.name} {showAccount.account} {showAccount.bankName} <DownOutlined />
                              </a>
                            </Dropdown>
                          </div>
                        </Modal>
                      </div>
                    </div>
                  )
                })
              }

            </div>)
        }

      </div>
      <br />
      <Bottom />
    </div >
  )
}

export default OrderPage
