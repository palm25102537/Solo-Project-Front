import React, { useState, useEffect } from 'react'
import { Dropdown, Menu } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import axios from 'axios'


function EditProduct(props) {
  const { isEdit, setIsEdit, getProduct, supp, cats, item } = props
  const [edit, setEdit] = useState({
    name: '',
    price: '',
    amount: '',
    status: '',
    description: '',
    promotion: '',
    categoryId: '',
    supplierId: ''
  })

  useEffect(() => {
    setEdit({
      name: item.name,
      price: item.price,
      amount: item.amount,
      status: item.status,
      description: item.description,
      promotion: item.promotion,
      categoryId: '',
      supplierId: ''
    })
  }, [])

  function handlerChange(event) {
    const { id, value } = event.target
    setEdit((previous) => ({ ...previous, [id]: value }))

  }
  const [test, setTest] = useState()

  async function editSupplierId(event) {
    const { id } = event.target
    edit.supplierId = id
    const { supplierId } = edit
    await axios.put(`/product/edit/${isEdit.id}`, { supplierId })
    getProduct()
    setIsEdit({ status: false })
    setEdit({ name: '', price: '', amount: '', status: '', description: '', promotion: '', supplierId: '', categoryId: '' })
  }
  async function editCategoryId(event) {
    const { id } = event.target
    edit.categoryId = id
    console.log(edit.categoryId)
    const { categoryId } = edit
    await axios.put(`/product/edit/${isEdit.id}`, { categoryId })
    getProduct()
    setIsEdit({ status: false })
    setEdit({ name: '', price: '', amount: '', status: '', description: '', promotion: '', supplierId: '', categoryId: '' })
  }
  async function handlerEdit(event) {

    const { key, target: { id } } = event

    if (key === 'Enter') {
      const isConfirm = window.confirm('Are you confirm to edit this product?')

      if (isConfirm) {

        const { name, price, amount, description } = edit
        await axios.put(`/product/edit/${isEdit.id}`, { name, price, amount, description })

        getProduct()
        setIsEdit({ status: false })
        setEdit({ name: '', price: '', amount: '', status: '', description: '', promotion: '', supplierId: '', categoryId: '' })

      } else {
        return
      }
    }
    if (id == "Avaliable" || id == "Not Avaliable") {
      edit.status = id
      const { status } = edit
      await axios.put(`/product/edit/${isEdit.id}`, { status })
      getProduct()
      setIsEdit({ status: false })
      setEdit({ name: '', price: '', amount: '', status: '', description: '', promotion: '', supplierId: '', categoryId: '' })
    }
    if (id === "Promotion" || id === "No Promotion") {

      edit.promotion = id
      const { promotion } = edit
      await axios.put(`/product/edit/${isEdit.id}`, { promotion })
      getProduct()
      setIsEdit({ status: false })
      setEdit({ name: '', price: '', amount: '', status: '', description: '', promotion: '', supplierId: '', categoryId: '' })
    }
  }


  const menuStatus = (
    <Menu>
      <Menu.Item >
        <button onClick={(e) => handlerEdit(e)} id="Avaliable" style={{ backgroundColor: 'inherit', border: 'none', outline: 'none' }}>
          Avaliable
        </button>
      </Menu.Item>
      <Menu.Item >
        <button onClick={(e) => handlerEdit(e)} id="Not Avaliable" style={{ backgroundColor: 'inherit', border: 'none', outline: 'none' }}>
          Not Avaliable
        </button>
      </Menu.Item>
    </Menu>
  )
  const menuPromotion = (
    <Menu>
      <Menu.Item >
        <button onClick={(e) => handlerEdit(e)} id="Promotion" style={{ backgroundColor: 'inherit', border: 'none', outline: 'none' }}>
          Promotion
        </button>
      </Menu.Item>
      <Menu.Item >
        <button onClick={(e) => handlerEdit(e)} id="No Promotion" style={{ backgroundColor: 'inherit', border: 'none', outline: 'none' }}>
          No Promotion
        </button>
      </Menu.Item>
    </Menu>
  )



  const menuEditSupplier = (
    <Menu>
      {
        supp?.map((item) => {

          return (
            <Menu.Item>
              <button id={item.id} name={item.name} onClick={(e) => editSupplierId(e)} style={{ backgroundColor: 'inherit', border: 'none', outline: 'none' }}>
                {item.name}
              </button>
            </Menu.Item>
          )
        })
      }

    </Menu>
  )
  const menuEditCategory = (
    <Menu>
      {
        cats?.map((item) => {

          return (
            <Menu.Item>
              <button id={item.id} name={item.name} onClick={(e) => editCategoryId(e)} style={{ backgroundColor: 'inherit', border: 'none', outline: 'none' }}>
                {item.name}
              </button>
            </Menu.Item>
          )
        })
      }

    </Menu>
  )

  return (
    <div key={edit.id} style={{ display: 'flex', justifyContent: 'center' }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        width: '200px',
        color: 'black'
      }}>
        <div>
          <label htmlFor='name'>Name</label>
          <br />
          <input onKeyUp={(e) => handlerEdit(e)} onChange={(e) => handlerChange(e)} id='name' value={edit.name} ></input>
        </div>
        <div style={{ marginTop: '5px' }}>
          <label htmlFor='price'>Price</label>
          <br />
          <input onKeyUp={(e) => handlerEdit(e)} onChange={(e) => handlerChange(e)} value={edit.price} id='price'></input>
        </div>
        <div style={{ marginTop: '5px' }}>
          <label htmlFor='amount'>Amount</label>
          <br />
          <input onKeyUp={(e) => handlerEdit(e)} onChange={(e) => handlerChange(e)} value={edit.amount} id='amount'></input>
        </div>
        <div style={{ marginTop: '5px' }}>
          <label htmlFor='status'>Status</label>
          <br />
          <Dropdown overlay={menuStatus} placement="bottomCenter" trigger={['click']} >
            <a style={{ backgroundColor: 'inherit', border: 'none' }} >
              {item.status} <DownOutlined />
            </a>
          </Dropdown>
        </div>
        <div style={{ marginTop: '5px' }} >
          <label htmlFor='promotion'>Promotion</label>
          <br />
          <Dropdown overlay={menuPromotion} placement="bottomCenter" trigger={['click']} >
            <a style={{ backgroundColor: 'inherit', border: 'none' }} >
              {item.promotion} <DownOutlined />
            </a>
          </Dropdown>
        </div>
        <div style={{ marginTop: '5px' }} >
          <label htmlFor='promotion'>Category</label>
          <br />
          <Dropdown overlay={menuEditCategory} placement="bottomCenter" trigger={['click']} >
            <a style={{ backgroundColor: 'inherit', border: 'none' }} >
              {item.Category.name} <DownOutlined />
            </a>
          </Dropdown>
        </div>
        <div style={{ marginTop: '5px' }} >
          <label htmlFor='promotion'>Supplier</label>
          <br />
          <Dropdown overlay={menuEditSupplier} placement="bottomCenter" trigger={['click']} >
            <a style={{ backgroundColor: 'inherit', border: 'none' }} >
              {item.Supplier.name} <DownOutlined />
            </a>
          </Dropdown>
        </div>
        <div style={{ marginTop: '5px' }} >
          <label htmlFor='description'>Description</label>
          <textarea onKeyUp={(e) => handlerEdit(e)} value={edit.description} onChange={(e) => handlerChange(e)} id='description' style={{ width: '200px', height: '150px' }}></textarea>
        </div>
        <div>
          <a onClick={(e) => {
            e.preventDefault()
            setIsEdit({ status: false })
          }}>Back</a>
        </div>
      </div>
    </div>
  )
}

export default EditProduct
