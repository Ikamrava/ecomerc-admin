import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import ProductForm from '../../../components/ProductForm'
import { useState } from 'react'
import { set } from 'mongoose'

function editpage() {
  const router = useRouter()
  const id = router.query.id
  const[productInfo,setProductInfo] = useState(null)
  useEffect(() => {
    if(!id){
      return
    }
    axios.get(`http://localhost:3000/api/products?id=${id}`)
    .then(res => {
      setProductInfo(res.data)
    })
  },[id])
 
  return (
    <div>
       {productInfo && (
          <ProductForm {...productInfo} />
       )}
    </div>
    
    
    
  )
}

export default editpage