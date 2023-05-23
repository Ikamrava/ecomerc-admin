import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import Link from 'next/link'
import axios from 'axios'

function products() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    axios.get('/api/products')
    .then(res => {
      setProducts(res.data)

    })
    


  },[])
  return (
    <Layout>
      <Link href={"/products/new"} className='btn btn-primary bg-slate-500'>
        <div className='btn btn-primary bg-slate-600  p-2 rounded-lg text-white font-bold text-center w-40'>
          Add New Product
        </div>
      </Link>
      <table className='table-auto w-full mt-5'>
        <thead>
          <tr className='bg-slate-700  text-white font-bold  border-2 border-slate-400'>  
            <td className='p-2 font-bold first-letter:capitalize border-2 border-slate-400 '>Product Name</td>
            <td className='p-2 font-bold first-letter:capitalize border-2 border-slate-400 text-center'>Price</td>
            <td></td>
          </tr>
          </thead>
          <tbody>
            
            {products.length > 0 && products.map(product => (
            <tr key={product.id} className='  rounded-lg border-2 border-slate-400 '>
              <td className='font-bold first-letter:capitalize border-2 border-slate-400 w-[60%] pl-2 py-1'>{product.name}</td>
              <td className=' font-bold first-letter:capitalize border-2 border-slate-400 w-[10%] text-center'>{product.price}</td>

              <td className=' flex justify-between ml-2  font-bold first-letter:capitalize border-2  gap-10 w-[10%]'>

                  <Link href={`/products/edit/${product._id}`}>
                    <div className=' flex justify-between  bg-slate-600 relative rounded-xl'>

                        
                                <div className=' absolute text-white left-1 top-1'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                    </svg>
                                </div>
                            
                                <button className='btn btn-primary px-4 py-1 rounded-lg text-white font-bold text-right   pl-12'>Edit</button>

                   
                    
                    </div>
                  
                  </Link>
                  <Link href={`/products/delete/${product._id}`}>
                    <div className=' flex justify-between bg-red-600 relative rounded-xl'>

                        
                                <div className=' absolute text-white left-1 top-1'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9.75L14.25 12m0 0l2.25 2.25M14.25 12l2.25-2.25M14.25 12L12 14.25m-2.58 4.92l-6.375-6.375a1.125 1.125 0 010-1.59L9.42 4.83c.211-.211.498-.33.796-.33H19.5a2.25 2.25 0 012.25 2.25v10.5a2.25 2.25 0 01-2.25 2.25h-9.284c-.298 0-.585-.119-.796-.33z" />
                              </svg>

                                </div>
                            
                                <button className='btn btn-primary px-4 py-1 rounded-lg text-white font-bold text-right   pl-12'>Delete</button>

                    </div>
                  
                  </Link>

             


                  



              </td>
              
            </tr>
            
          ))}
            
          </tbody>
      </table>
      <div>
        
          
        </div>

    </Layout>
  )
}

export default products