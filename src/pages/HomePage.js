import React, { useEffect } from 'react'
import '../App.css'
import Head from '../component/Head'
import Bottom from '../component/Bottom'
import PromotionCard from '../component/PromotionCard'
import BestSellerCard from '../component/BestSellerCard'
import { useAuthen } from '../context/AuthenContextProvider'
import service from '../services/localStorageService'

function HomePage() {
  const { getUser, getToken } = service
  const { state, getMe } = useAuthen()


  async function AdminCheck() {
    let a = await getMe(getUser())
    const { isAdmin } = a

    return isAdmin === "Not admin" ? false : true

  }

  useEffect(() => console.log('login'), [state.isAuthen])

  return (
    <div className="App">
      <Head />
      <div style={{ height: '84vh', paddingTop: '12px' }}>
        <PromotionCard />
        <BestSellerCard />
      </div>
      <Bottom />
    </div >

  )
}

export default HomePage
