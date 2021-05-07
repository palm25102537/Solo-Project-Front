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

      }}>
        {
          categories?.map((item, index) => {
            const { id, name } = item
            return (

              <div>
                <SnackCarousel key={id} category={id} name={name} />
              </div>



            )
          })
        }
      </div>
      <Bottom />
    </div >

  )
}

export default ProductPage
