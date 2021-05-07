import React, { useState, useEffect } from 'react'
import { Carousel } from 'antd';
import axios from 'axios'

function SnackCarousel(props) {

  const { category, name } = props
  const [productDetail, setProductDetail] = useState()
  async function getProductData() {
    const product = await axios.get(`/product?category=${category}`)

    if (product) {
      const { data: { data } } = product
      setProductDetail(data)
    }

  }
  const contentStyle = {

    height: '320px',
    textAlign: 'center'
  };
  useEffect(() => { getProductData() }, [])
  return (
    <div>
      <h2 style={{ paddingLeft: '10px', color: 'white' }}>{name}</h2>
      <Carousel style={contentStyle}>
        {
          productDetail?.map((item, index) => {
            const { Category: { name } } = item
            return (
              <>

                <div>
                  <img src="https://picsum.photos/200" style={{
                    marginLeft: 'auto',
                    marginRight: 'auto',
                  }}></img>
                  <div style={{ paddingTop: '10px', textAlign: `center`, color: 'white', fontSize: '16px' }}>
                    <p>Product : {item.name}</p>
                    <p>Price: {item.price} THB</p>
                  </div>
                  <br />
                </div>
              </>
            )
          })
        }
      </Carousel>
    </div>
  )
}

export default SnackCarousel
