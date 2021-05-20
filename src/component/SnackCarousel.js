import React, { useState, useEffect } from 'react'
import { Carousel, Button } from 'antd';
import axios from 'axios'
import { useAuthContext } from '../context/AuthenContextProvider'
function SnackCarousel(props) {

  const { category, name, token } = props

  const [productDetail, setProductDetail] = useState()

  const { maxCounter, setMaxCounter } = useAuthContext()
  const [counter, setCounter] = useState(0)

  const { cart, setCart } = useAuthContext()
  async function getProductData() {
    let product;
    token === null ? product = await axios.get(`/product/notoken?category=${category}`) : product = await axios.get(`/product?category=${category}`)

    if (product) {
      const { data: { data } } = product

      setProductDetail(data)
    }

  }
  const contentStyle = {

    height: token ? '480px' : '320px',
    textAlign: 'center'
  };
  useEffect(() => getProductData(), [])

  function controlCounter(event) {
    let { value, id } = event.target
    setMaxCounter(value)
    if (id === 'plus') {
      setCounter(counter + 1)

      if (counter == value) {
        setCounter(value)

      }
    }

    if (id === "minus") {
      setCounter(counter - 1)
      if (counter <= 1) {
        setCounter(0)

      }
    }
    getProductData()
  }

  function controlProduct(event) {
    const { id, value, name } = event.target
    const addedToCardItem = { name: id, price: value, amount: counter, productId: name }
    setCart([...cart, addedToCardItem])
  }

  return (
    <div>
      <h2 style={{ paddingLeft: '10px', color: 'white' }}>{name}</h2>
      <Carousel style={contentStyle}>
        {
          productDetail?.map((item, index) => {

            return (
              <>

                <div>
                  <img src={item.picture || "https://picsum.photos/200"} style={{
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    width: '200px',
                    height: '200px'
                  }}></img>
                  <div style={{ paddingTop: '10px', textAlign: `center`, color: 'white', fontSize: '16px' }}>
                    <p>Product : <strong>{item.name}</strong> </p>
                    <p>Price : <strong>{item.price}</strong> THB</p>
                  </div>
                  <div>
                    {
                      token ? (
                        <div>
                          <div style={{ display: 'flex', justifyContent: 'center' }} >
                            <button id="minus" value={item.amount} onClick={(e) => controlCounter(e)} >-</button> <input value={counter} style={{ width: '40px', height: '32px', textAlign: 'center' }}></input> <button value={item.amount} id="plus" onClick={(e) => controlCounter(e)}>+</button>
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                            <button onClick={() => setCounter(0)}>Clear</button>
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                            <button id={item.name} value={item.price} name={item.id} onClick={(e) => controlProduct(e)}>Add to Cart</button>
                          </div>
                        </div>
                      ) : (
                        <div>
                        </div>
                      )
                    }
                  </div>
                  <br />
                </div>
              </>
            )
          })
        }
      </Carousel>
    </div >
  )
}

export default SnackCarousel
