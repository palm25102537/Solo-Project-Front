import React, { useState, useEffect } from 'react'
import { Modal, message } from 'antd'
import { useHistory } from 'react-router-dom'
import axios from '../config/axios'
import service from '../services/localStorageService'
import { useAuthContext } from '../context/AuthenContextProvider'
function CheckOrderModal(props) {
  const { see, setSee } = props
  const { getUser } = service
  const [sell, setSell] = useState()
  const history = useHistory()
  const { setCart } = useAuthContext()

  useEffect(async () => {

    if (see === true) getMyOrder()


  }, [see])

  async function getMyOrder() {


    const res = await axios.get(`/order?me=${getUser()}&sort=yes&item=id&desc=desc`)
    const { data: { data } } = res
    console.log(res)
    setSell(data.filter((item, index) => index === 0))


  }

  const goodBye = () => {
    message.success('Bye and Please come again :) ')
  }
  function handlerEndSell() {
    setCart([])
    goodBye()
    setSee(false)
    history.push('/profile')
  }

  return (
    <div>
      <Modal visible={see} onCancel={() => setSee(false)} onOk={() => handlerEndSell()}>


        {
          sell?.map((item) => {

            return (
              <div>
                <h1>Dear Customer {item.Customer.userName.toUpperCase()} </h1>
                <p>Your order number is <strong>{item.id}</strong></p>
                <p>Order Status : <strong>{item.orderStatus}</strong></p>
                <p>Delivery Address : <strong>{item.deliveryAddress}</strong></p>
                <p>Deliver By : <strong>{item.Transport.name}</strong></p>
                <h3>Thank you</h3>
              </div>
            )
          })
        }
      </Modal>
    </div>
  )
}

export default CheckOrderModal
