import React, { useEffect, useState } from 'react'
import Layout from '../../../components/Layout'
import { useRouter } from 'next/router'
import axios from 'axios'

function deletePage() {
    const router = useRouter()
   
    function goBack(){  
        router.back()
    
    }
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

  function deleteHandler(){
    axios.delete(`http://localhost:3000/api/products?id=${id}`)
    .then(res => {
      router.push('/products')
    })
    .catch(err => {
      console.log(err)
    })
}
  

  return (
    <Layout>
        <h1 className='text-2xl text-gray-800 font-bold mb-5'>Delete Page</h1>
        <p className='text-gray-800 font-bold'>Are you sure you want to delete this product? <span>{productInfo?.name}</span></p>
        
        <div className='flex  mt-5 gap-4'>
        <button className='bg-red-800 py-2 px-5 mt-3 text-white rounded-md hover:bg-gray-800' onClick={deleteHandler}>Yes</button>
        <button className=' bg-slate-700 py-2 px-5 mt-3 text-white rounded-md hover:bg-gray-800' onClick={goBack}>No</button>
        </div>
        
        </Layout>
  )
}

export default deletePage