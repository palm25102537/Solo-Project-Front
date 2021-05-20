import React from 'react'
import 'antd/dist/antd.css';
import { Carousel } from 'antd';

function PromotionCard() {
  const contentStyle = {

    height: '320px',
    textAlign: 'center'
  };
  return (
    <div style={{ marginLeft: '5px' }}>
      <h3 style={{ color: 'white' }}>Promotion</h3>
      <div >
        <Carousel autoplay style={contentStyle}>
          <div>
            <img src="https://picsum.photos/200" style={{
              marginLeft: 'auto',
              marginRight: 'auto',
            }}></img>
            <div className="card-container">
              <p>Product : xxxx </p>
              <p>Price : xx bath</p>
            </div>
          </div>
          <div>
            <img src="https://picsum.photos/200" style={{
              marginLeft: 'auto',
              marginRight: 'auto',
            }}></img>
            <div className="card-container">
              <p>Product : xxxx </p>
              <p>Price : xx THB</p>
            </div>
          </div>
          <div>
            <img src="https://picsum.photos/200" style={{
              marginLeft: 'auto',
              marginRight: 'auto',
            }}></img>
            <div className="card-container">
              <p>Product : xxxx </p>
              <p>Price : xx bath</p>
            </div>
          </div>
          <div>
            <img src="https://picsum.photos/200" style={{
              marginLeft: 'auto',
              marginRight: 'auto',
            }}></img>
            <div className="card-container">
              <p>Product : xxxx </p>
              <p>Price : xx bath</p>
            </div>
          </div>
        </Carousel>
      </div>

    </div>
  )
}

export default PromotionCard
