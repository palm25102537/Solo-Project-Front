import React, { useState } from 'react'
import { Modal, Dropdown, Menu, Button } from 'antd'
import { DownOutlined } from '@ant-design/icons'



function NewProductModal(props) {
  const { cats, supp, create, setCreate, setVisible, visible, handleView, addProduct } = props
  const [show, setShow] = useState({
    promotion: 'Promotion',
    category: 'Category',
    supplier: 'Supplier',
  })

  function changePromotionId(event) {
    console.log(event)
    const { id } = event.target
    setShow({ promotion: id, supplier: 'Supplier', category: 'Category' })
    create.promotion = id
  }
  function changeSupplierId(event) {
    const { id, name } = event.target
    setShow((promotion) => ({ ...promotion, supplier: name, category: 'Category' }))
    create.supplierId = id
  }
  function changeCatgoryId(event) {
    const { id, name } = event.target
    setShow((promotion, supplier) => ({ ...promotion, ...supplier, category: name }))
    create.categoryId = id
  }
  function handlerCreateChange(event) {
    const { value, id } = event.target
    setCreate((previous) => ({ ...previous, [id]: value }))
  }
  const menuAddPromotion = (
    <Menu>
      <Menu.Item >
        <button id="Promotion" onClick={(e) => changePromotionId(e)} style={{ backgroundColor: 'inherit', border: 'none', outline: 'none' }}>
          Promotion
        </button>
      </Menu.Item>
      <Menu.Item >
        <button id="No Promotion" onClick={(e) => changePromotionId(e)} style={{ backgroundColor: 'inherit', border: 'none', outline: 'none' }}>
          No Promotion
        </button>
      </Menu.Item>
    </Menu>
  )
  const menuSupplier = (
    <Menu>
      {
        supp?.map((item) => {

          return (
            <Menu.Item>
              <button id={item.id} name={item.name} onClick={(e) => changeSupplierId(e)} style={{ backgroundColor: 'inherit', border: 'none', outline: 'none' }}>
                {item.name}
              </button>
            </Menu.Item>
          )
        })
      }

    </Menu>
  )
  const menuCategory = (
    <Menu>
      {
        cats?.map((item) => {

          return (
            <Menu.Item>
              <button id={item.id} name={item.name} onClick={(e) => changeCatgoryId(e)} style={{ backgroundColor: 'inherit', border: 'none', outline: 'none' }}>
                {item.name}
              </button>
            </Menu.Item>
          )
        })
      }


    </Menu>
  )



  return (
    <div>
      <Modal visible={visible} onCancel={() => setVisible(false)} onOk={handleView}>
        <h1>New Product</h1>
        <div>
          <label htmlFor="name">Name : </label>
          <input onChange={(e) => handlerCreateChange(e)} style={{ width: '310px' }} id="name"></input>
        </div>
        <br />
        <div>
          <label htmlFor="price">Price : </label>
          <input onChange={(e) => handlerCreateChange(e)} style={{ width: '320px' }} id="price"></input>
        </div>
        <br />
        <div>
          <label htmlFor="amount">Amount : </label>
          <input onChange={(e) => handlerCreateChange(e)} style={{ width: '300px' }} id="amount"></input>
        </div>
        <br />
        <div>
          <label htmlFor="description">Description  </label>
          <br />
          <textarea onChange={(e) => handlerCreateChange(e)} style={{ width: '300px', height: '80px' }} id="description"></textarea>
        </div>
        <br />
        <div>
          <label htmlFor="name">Promotion : </label>
          <Dropdown overlay={menuAddPromotion} placement="bottomCenter" trigger={['click']} >
            <a style={{ backgroundColor: 'inherit', border: 'none' }} >
              {show.promotion} <DownOutlined />
            </a>
          </Dropdown>
        </div>
        <br />
        <div>
          <label htmlFor="name">Supplier : </label>
          <Dropdown overlay={menuSupplier} placement="bottomCenter" trigger={['click']} >
            <a style={{ backgroundColor: 'inherit', border: 'none' }} >
              {show.supplier} <DownOutlined />
            </a>
          </Dropdown>
        </div>
        <br />
        <div>
          <label htmlFor="name">Category : </label>
          <Dropdown overlay={menuCategory} placement="bottomCenter" trigger={['click']} >
            <a style={{ backgroundColor: 'inherit', border: 'none' }} >
              {show.category} <DownOutlined />
            </a>
          </Dropdown>
        </div>
        <br />
        <div>
          <Button onClick={addProduct} type="primary">Submit</Button>
        </div>
      </Modal>
    </div>
  )
}

export default NewProductModal
