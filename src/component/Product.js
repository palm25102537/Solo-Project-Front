import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Modal, message } from 'antd'
import EditProduct from './EditProduct'
import AddProductModal from './AddProductModal'
import NewProductModal from './NewProductModal'
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { useAuthContext } from '../context/AuthenContextProvider'


function Product(props) {
  const { supplier, category } = props
  const supp = supplier.data.data
  const cats = category.data.respond
  const [view, setView] = useState(false)
  const [product, setProduct] = useState()
  const [isEdit, setIsEdit] = useState(false)
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  const [create, setCreate] = useState({
    name: '',
    price: '',
    amount: '',
    description: '',
    promotion: '',
    supplierId: '',
    categoryId: ''
  })

  const [visible, setVisible] = useState(false)

  const [send, setSend] = useState([])
  const [open, setOpen] = useState({ status: false, id: '' })
  const { loading, setLoading } = useAuthContext()
  const [pic, setPic] = useState(null)



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

  function handlerCreatePicChange(event) {
    const { id } = event.target
    setOpen({ status: true, id: +id + 1 })

  }
  function addImg(event) {
    const { files } = event.target
    setPic(files[0])
  }
  async function addImgToBack() {
    const formData = new FormData()
    formData.append('image', pic)
    try {
      setLoading(true)
      await axios.put(`/product/edit/${open.id}`, formData)

    } catch (err) {
      console.log(err)
    } finally {

      setLoading(false)
      getProduct()
      setOpen({ status: false, id: '' })
    }

  }

  const success = () => {
    message.success('Added product')
  }

  function addProduct() {
    send.push(({ ...create }))
    success()
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
            product?.map((item, index) => {

              return (
                <div style={{ color: 'white', marginTop: '30px' }}>

                  <div style={{ textAlign: 'center' }}>
                    <img style={{ width: '150px', height: '150px' }} onClick={(e) => handlerCreatePicChange(e)} id={index} src={item.picture || "https://picsum.photos/150"} />

                  </div>
                  <Modal visible={open.status} onCancel={() => setOpen({ status: false, id: "" })} onOk={addImgToBack}>
                    {
                      loading ? (
                        <div>
                          <h5>Loading... <Spin indicator={antIcon} /></h5>
                        </div>
                      ) : (
                        <div>
                          <h1>Add image</h1>
                          <input onChange={(e) => addImg(e)} type="file"></input>
                        </div>
                      )
                    }
                  </Modal>

                  <div style={{ textAlign: 'center', marginTop: '10px' }}>
                    {
                      isEdit.status && isEdit.id === item.id ? (
                        <EditProduct supp={supp} cats={cats} getProduct={getProduct} isEdit={isEdit} item={item} setIsEdit={setIsEdit} />
                      ) : (
                        <div style={{ color: 'white' }} key={item.id} onClick={() => setIsEdit({ status: true, id: item.id })}>
                          <p >Name : <strong>{item.name}</strong></p>
                          <p>Category : <strong>{item.Category.name}</strong></p>
                          <p >Price : <strong>{item.price}</strong></p>
                          <p >Amount: <strong>{item.amount}</strong></p>
                          <p>Status : <strong>{item.status}</strong></p>
                          <p>Promotion : <strong>{item.promotion}</strong></p>
                          <p>Supplier : <strong>{item.Supplier.name}</strong></p>
                          <p style={{ color: item.description ? "white" : "black" }}>Desc : <strong>{item.description}</strong></p>
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
      <NewProductModal addProduct={addProduct} create={create} setCreate={setCreate} supp={supp} cats={cats} visible={visible} setVisible={setVisible} handleView={handleView} />
      <AddProductModal view={view} setView={setView} send={send} setSend={setSend} newProduct={newProduct} />
    </div >
  )
}

export default Product

