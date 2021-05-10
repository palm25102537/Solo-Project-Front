import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Modal, Menu, Dropdown, Button } from 'antd'
import { DownOutlined } from '@ant-design/icons'
function Product(props) {
  const { supplier, category } = props
  const supp = supplier.data.data
  const cats = category.data.respond

  const [product, setProduct] = useState()
  const [isEdit, setIsEdit] = useState(false)
  const [edit, setEdit] = useState({
    name: '',
    price: '',
    amount: '',
    status: '',
    description: '',
    promotion: '',
  })
  const [create, setCreate] = useState({
    name: '',
    price: '',
    amount: '',
    description: '',
    promotion: '',
    supplierId: '',
    categoryId: ''
  })
  const [show, setShow] = useState({
    promotion: 'Promotion',
    category: 'Category',
    supplier: 'Supplier',
  })
  const [visible, setVisible] = useState(false)
  const [view, setView] = useState(false)
  const [send, setSend] = useState([])
  async function getProduct() {
    const res = await axios.get('/product')
    const { data: { data } } = res
    console.log(data)
    setProduct(data)
  }
  useEffect(() => { getProduct() }, [])
  async function handlerProduct(event) {
    setVisible(true)

  }

  function handlerChange(event) {
    const { id, value } = event.target
    setEdit((previous) => ({ ...previous, [id]: value }))

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
  async function handlerEdit(event) {

    const { key, target: { id } } = event

    if (key === 'Enter') {
      const isConfirm = window.confirm('Are you confirm to edit this product?')

      if (isConfirm) {

        const { name, price, amount, description } = edit
        await axios.put(`/product/edit/${isEdit.id}`, { name, price, amount, description })

        getProduct()
        setIsEdit({ status: false })
        setEdit({ name: '', price: '', amount: '', status: '', description: '', promotion: '', })

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
      setEdit({ name: '', price: '', amount: '', status: '', description: '', promotion: '', })
    }
    if (id == "Promotion" || id == "No Promotion") {
      console.log(id)
      edit.promotion = id
      const { promotion } = edit
      await axios.put(`/product/edit/${isEdit.id}`, { promotion })
      getProduct()
      setIsEdit({ status: false })
      setEdit({ name: '', price: '', amount: '', status: '', description: '', promotion: '', })
    }
  }

  function changePromotionId(event) {
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
  function handlerCreatePicChange(event) {

  }
  function addProduct() {
    send.push(({ ...create }))

  }
  function handleView() {
    setVisible(false)
    setView(true)
  }

  async function newProduct() {
    await axios.post('/product/register', { product: send })
    setView(false)
  }
  return (
    <div className="App">
      <div style={{ textAlign: 'center', marginTop: '10px', color: 'white' }}>
        <h1 style={{ color: 'white' }}> Product</h1>
      </div>
      <div style={{
        display: 'flex',
        justifyContent: 'center'
      }}>
        <button id="add"
          shape="round"
          onClick={(e) => handlerProduct(e)}>Add</button>
      </div >
      {
        <div style={{ marginLeft: '10px', marginTop: '20px' }}>
          {
            product?.map((item) => {

              return (
                <div style={{ color: 'white', marginTop: '30px' }}>
                  <div style={{ textAlign: 'center' }}>
                    <img src="https://picsum.photos/150" />
                  </div>
                  <div style={{ textAlign: 'center', marginTop: '10px' }}>
                    {
                      isEdit.status && isEdit.id === item.id ? (
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
                              <input defaultValue={item.name} onKeyUp={(e) => handlerEdit(e)} onChange={(e) => handlerChange(e)} id='name' value={edit.name} ></input>
                            </div>
                            <div style={{ marginTop: '5px' }}>
                              <label htmlFor='price'>Price</label>
                              <br />
                              <input defaultValue={item.price} onKeyUp={(e) => handlerEdit(e)} onChange={(e) => handlerChange(e)} value={edit.price} id='price'></input>
                            </div>
                            <div style={{ marginTop: '5px' }}>
                              <label htmlFor='amount'>Amount</label>
                              <br />
                              <input defaultValue={item.amount} onKeyUp={(e) => handlerEdit(e)} onChange={(e) => handlerChange(e)} value={edit.amount} id='amount'></input>
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
                              <label htmlFor='description'>Description</label>
                              <textarea defaultValue={item.description} onKeyUp={(e) => handlerEdit(e)} value={edit.description} onChange={(e) => handlerChange(e)} id='description' style={{ width: '200px', height: '150px' }}></textarea>
                            </div>
                            <div>
                              <a onClick={(e) => {
                                e.preventDefault()
                                setIsEdit({ status: false })
                              }}>Back</a>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div style={{ color: 'white' }} key={item.id} onClick={() => setIsEdit({ status: true, id: item.id })}>
                          <p >Name : {item.name}</p>
                          <p >Price : {item.price}</p>
                          <p >Amount: {item.amount}</p>
                          <p>Status : {item.status}</p>
                          <p>Promotion : {item.promotion}</p>
                          <p style={{ color: item.description ? "white" : "black" }}>Desc : {item.description}</p>
                        </div>
                      )
                    }

                  </div>
                </div>
              )

            })
          }
        </div>

      }
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
          < div >
            <label htmlFor="name">Picture : </label>
            <input onChange={(e) => handlerCreatePicChange(e)} type="file" id="name"></input>
          </div >
          <br />
          <div>
            <Button onClick={addProduct} type="primary">Submit</Button>
          </div>
        </Modal>
      </div>
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
    </div >
  )
}

export default Product

