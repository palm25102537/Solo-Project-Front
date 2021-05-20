import React, { useState, useEffect } from 'react'
import 'antd/dist/antd.css';
import { Carousel } from 'antd';
import axios from 'axios'
function BestSellerCard() {
  const [state, setState] = useState()
  const contentStyle = {

    height: '320px',
    textAlign: 'center'
  };
  async function getBestSeller() {
    const bestseller = await axios.get('/order/bestseller')

    if (bestseller) {
      const { data: { data } } = bestseller
      setState(data)
    }
  }

  useEffect(() => getBestSeller(), [])

  return (
    <div style={{ marginLeft: '5px' }}>
      <h3 style={{ color: 'white' }}>Best Seller</h3>
      <Carousel autoplay style={contentStyle}>
        {
          state?.map((item, index) => {
            const { picture, price, name } = item.Product

            return (
              <div key={index} >

                <div>
                  <img src={picture || "https://picsum.photos/200"} style={{
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    width: '200px',
                    height: '200px'
                  }}></img>
                  <div className="card-container">
                    <p>Product : {name}</p>
                    <p>Price : {price} THB</p>
                  </div>
                </div>

              </div>
            )

          })
        }
      </Carousel>

    </div >
  )
}

export default BestSellerCard
