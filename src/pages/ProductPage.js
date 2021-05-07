import React, { useEffect, useState } from 'react'
import SnackCarousel from '../component/SnackCarousel'
import Head from '../component/Head'
import Bottom from '../component/Bottom'
import axios from 'axios'

function ProductPage() {

  const [categories, setCategories] = useState()
  async function getCategory() {
    const cat = await axios.get('/category')

    const { data: { respond } } = cat

    setCategories(respond)

  }

  useEffect(() => { getCategory() }, [])

  return (
    <div className='App'>
      <Head />
      <div style={{
        paddingTop: '20px',
        paddingBottom: '6px',
        height: '84%'
      }}>{
          categories?.map((item) => {
            const { id, name } = item
            return (
              <>
                <SnackCarousel category={id} name={name} />
              </>
            )
          })
        }
      </div>
      <Bottom />
    </div >

  )
}

export default ProductPage
