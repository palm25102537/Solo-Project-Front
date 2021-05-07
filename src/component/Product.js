import React, { useState, useEffect } from 'react'
import axios from 'axios'
function Product() {
  const [product, setProduct] = useState()

  const [name, setName] = useState({ status: false, word: "" })
  const [price, setPrice] = useState({ status: false, word: "" })
  const [amount, setAmount] = useState({ status: false, word: "" })


  async function getProduct() {
    const res = await axios.get('/product')
    const { data: { data } } = res
    setProduct(data)
  }
  useEffect(() => { getProduct() }, [])
  async function handlerProduct(event) {

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
                      !name.status ?
                        (
                          <div onClick={() => setName({ status: true })}>
                            <p key={item.id} >Name : {item.name}</p>
                          </div>
                        )
                        :
                        (<input defaultValue={item.name} value={name.word}></input>)

                    }
                    {
                      !price.status ?
                        (
                          <div onClick={() => setPrice({ status: true })}>
                            <p key={item.id}>Price : {item.price}</p>
                          </div>
                        )
                        :
                        (<input defaultValue={item.price} value={price.word}></input>)
                    }
                    {
                      !amount.staus ?
                        (
                          <div onClick={() => setAmount({ status: true })}>
                            <p key={item.id}>Amount: {item.amount}</p>
                          </div>
                        )
                        :
                        (<input defaultValue={item.amount} value={amount.word}></input>)
                    }

                  </div>
                </div>
              )
            })
          }
        </div>

      }
    </div >
  )
}

export default Product
