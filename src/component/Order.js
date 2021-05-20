import React, { useState, useEffect } from 'react'
import axios from '../config/axios'
import { Image, Button, Modal } from 'antd';
import { useAuthContext } from '../context/AuthenContextProvider'
function Order() {
  const [order, setOrder] = useState()

  async function getOrder() {
    const respond = await axios.get('order?sort=ok&item=id&desc=desc')
    const { data: { data } } = respond
    setOrder(data)
  }

  useEffect(() => {
    getOrder()
  }, [])


  const { filter, setFilter, showFilter } = useAuthContext()

  async function confirmOrder(event) {
    console.log(event)
    const { textContent, value, id } = event.target
    console.log(textContent, value, id)
    await axios.put(`payment/edit/${id}`, { status: textContent })
    await axios.put(`order/edit/${value}`, { orderStatus: 'In transit' })
    getOrder()
  }
  async function rejectedOrder(event) {
    const { textContent, value, id } = event.target
    await axios.put(`payment/edit/${id}`, { status: textContent })
    await axios.put(`order/edit/${value}`, { orderStatus: 'Cancelled' })
    getOrder()
  }
  const [edit, setEdit] = useState({
    status: false,
    id: '',

  })
  function editTrackingNumber(event) {
    const { id } = event.target
    console.log(id)
    setEdit({ status: true, id: id, word: '' })
  }

  function updateTrackNum(event) {
    const { value } = event.target
    console.log(value)
    setEdit({ ...edit, word: value })
  }

  async function changeTrackNum(event) {

    const { key } = event
    const { id, word } = edit
    if (key === "Enter") {
      await axios.put(`/order/edit/${id}`, { trackingNumber: word, orderStatus: 'Delivered' })

      getOrder()
      setEdit({ status: false, id: '', word: '' })
    }

  }
  return (
    <div className="App">
      <h1 style={{ textAlign: 'center', marginTop: '10px', }}>Manage Order and Payment</h1>
      <div style={{
        display: 'flex',
        justifyContent: 'space-evenly'
      }} >
        <Button onClick={(e) => showFilter(e)} value='Placed Order' style={{ backgroundColor: '#ee87bcbb', color: 'white' }}>Placed Order</Button>
        <Button onClick={(e) => showFilter(e)} value='Paid' style={{ backgroundColor: '#ee87bcbb', color: 'white' }}>Paid</Button>
        <Button onClick={(e) => showFilter(e)} value='In transit' style={{ backgroundColor: '#ee87bcbb', color: 'white' }}>In transit</Button>
        <Button onClick={(e) => showFilter(e)} value='Delivered' style={{ backgroundColor: '#ee87bcbb', color: 'white' }}>Delivered</Button>
        <Button style={{ backgroundColor: '#ee87bcbb', color: 'white' }}>Add Account</Button>
      </div>
      {
        !filter.status && (<div style={{ marginLeft: '5px', marginTop: '10px' }}>

          {
            order?.map((item) => {
              console.log(item)

              const { id, trackingNumber, orderStatus, Transport, Customer, detail, Payment } = item
              return (
                <div>
                  <h2>Order number  <span style={{ color: 'white' }}>{id}</span></h2>
                  <h3>Order by : {Customer.userName.toUpperCase()}</h3>
                  <h4>Status : <span style={{ color: 'white' }}>{orderStatus}</span></h4>
                  {
                    orderStatus === "Placed Order" ? (
                      <div>
                        <h4>Payment status : wait for customer upload slip</h4>
                      </div>
                    ) : (
                      <div>
                        <h4>Payment number : {Payment?.id}</h4>
                        <h4>Payment status: {Payment?.status}</h4>
                        <Image width={50} src={Payment?.slip} />
                      </div>
                    )
                  }
                  <h4>Tracking Number : <span>{trackingNumber ? trackingNumber : trackingNumber === null ? 'Please update tracking number' : trackingNumber}</span></h4>
                  <h4>Deliver by : {Transport.name}</h4>
                  <h4>Deliver at : <span>{item.deliveryAddress}</span></h4>
                  <h4>Order detail</h4>
                  {
                    detail?.map((item) => {
                      console.log(item)
                      const { Product, amount } = item
                      return (
                        <div>
                          <p style={{ color: 'white' }}>{Product.name} {amount} pieces</p>
                        </div>
                      )
                    })
                  }
                  <div>
                    <h4>Net : <span style={{ color: 'white' }}>{
                      detail?.reduce((acc, item) => {
                        acc = acc + (item.amount * item.price)
                        return acc
                      }, 0)
                    } </span> THB </h4>
                  </div>
                </div>
              )
            })
          }
        </div>)
      }

      {
        filter.status && (
          <div style={{ marginTop: '5px' }}>
            <h2 style={{ textAlign: 'center' }}>Order status : {filter.word}</h2>
            {
              order?.filter((item) => item.orderStatus === filter.word)?.map((item) => {
                console.log(item)
                const { id, detail, Transport, Payment, orderStatus, trackingNumber } = item
                return (
                  <div style={{ marginLeft: '10px' }}>
                    <h3>Order by : {item.Customer.userName.toUpperCase()}</h3>
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
                    <p><strong>Deliver at : <spnan>{item.deliveryAddress}</spnan></strong></p>
                    {
                      orderStatus === 'In transit' || orderStatus === 'Delivered' && (
                        <div>
                          {
                            trackingNumber ?
                              (<div>
                                <h4>Tracking Number : {trackingNumber}</h4>
                              </div>) : (
                                <div>
                                  <h4 id={item.id} onClick={(e) => editTrackingNumber(e)}>Tracking Number : wait for update</h4>
                                </div>
                              )
                          }
                          {
                            edit.status && edit.id == item.id && (
                              <div>
                                <label htmlFor='trackingNumbr'>Add tracking number : </label>
                                <input value={edit.word} onKeyUp={(e) => changeTrackNum(e)} onChange={(e) => updateTrackNum(e)} id='trackingNumber' />
                              </div>
                            )
                          }
                        </div>
                      )
                    }
                    <p><strong>Net</strong> <strong>{detail?.reduce((acc, item) => {
                      acc = acc + (item.amount * item.price)
                      return acc
                    }, 0)} THB</strong>  </p>
                    {
                      orderStatus === "Placed Order" ? (
                        <div>
                          <h4>Payment status : wait for customer upload slip</h4>
                        </div>
                      ) : (
                        <div>
                          <h4>Payment number : {Payment?.id}</h4>
                          <h4>Payment status: {Payment ? Payment?.status : Payment === null ? "Wait for upload payment" : Payment.status}</h4>

                        </div>
                      )
                    }

                    {
                      Payment === null ?
                        (<div>

                        </div>) : (
                          <div>
                            <Image width={150} src={Payment?.slip} />
                          </div>
                        )
                    }
                    <br />
                    <div>
                      {
                        item.orderStatus === 'Placed Order' && (
                          <Button onClick={() => setFilter({ status: false, word: '' })} style={{ backgroundColor: '#ee87bcbb', color: 'white' }}>Back</Button>
                        )
                      }
                      {
                        item.orderStatus === 'Paid' && (
                          <div>
                            <button value={id} id={Payment?.id} onClick={(e) => confirmOrder(e)} >Confirmed</button>
                            <button value={id} id={Payment?.id} onClick={(e) => rejectedOrder(e)} style={{ marginLeft: '5px', marginRight: '5px' }}>Rejected</button>
                            <Button onClick={() => setFilter({ status: false, word: '' })} style={{ backgroundColor: '#ee87bcbb', color: 'white' }}>Back</Button>
                          </div>
                        )
                      }
                    </div>
                    <br />
                  </div>
                )
              })
            }

          </div>)
      }
    </div >
  )
}

export default Order
