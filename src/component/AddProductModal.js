import React from 'react'
import { Modal } from 'antd'



function AddProductModal(props) {
  const { send, setSend, view, setView, newProduct } = props
  return (
    <div>
      <Modal visible={view} onCancel={() => setView(false) && setSend([])} onOk={newProduct}>
        <h1>Added Product</h1>
        {
          send.map((item) => {

            return (
              <div>
                <h3>Name : {item.name} Price : {item.price} Amount : {item.amount}</h3>
              </div>
            )
          })
        }
      </Modal>
    </div>
  )
}

export default AddProductModal
