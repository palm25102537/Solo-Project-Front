import React from 'react'
import '../App.css'
import Head from '../component/Head'
import Bottom from '../component/Bottom'
import PromotionCard from '../component/PromotionCard'
import BestSellerCard from '../component/BestSellerCard'
import CartModal from '../component/CartModal'

function HomePage() {


  return (
    <div className="App">
      <Head />
      <div style={{ height: '84vh', paddingTop: '12px' }}>
        <PromotionCard />
        <BestSellerCard />
      </div>
      <CartModal />
      <br />
      <Bottom />
    </div >

  )
}

export default HomePage
