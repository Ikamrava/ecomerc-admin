import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import axios from 'axios';
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.css';


function category() {
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);


const  showConfirmation = (_id) => {
  const item = categories.find((item)=>item._id === _id)
    
  Swal.fire({
    title: 'Are you sure?',
    text: `You are about to delete ${item.category} category.`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'No, cancel!',



  }).then((result) => {
    if (result.isConfirmed) {
      const res =  axios.delete(`http://localhost:3000/api/category?id=${_id}`)
      Swal.fire('Deleted!', 'The item has been deleted.', 'success');
      fetchData()

    } else if (result.dismiss === Swal.DismissReason.cancel) {
      // Handle cancel action
      Swal.fire('Cancelled', 'The deletion was cancelled.', 'error');
    }
  });
  
}

  async function fetchData(){
    const res = await axios.get('http://localhost:3000/api/category')
    setCategories(res.data)
  }

  useEffect(()=>{
    fetchData()
  },[])

  async function addHandler(){
      if(!category) {
        alert('Category is required')
        return
      }
    
    
      if(categories.some((item)=>item.category === category)){
        alert('Category already exists')
        return
      }else{
      const cat = await axios.post('http://localhost:3000/api/category', {category})
      fetchData()
      setCategory('')
    }
  }
  



    
  





  return (
    <Layout>
        <label className=' mb-2 font-bold'>New Category Name</label>
       <input value={category} onChange={(e)=>setCategory(e.target.value)}  name="category" id="category" className='input input-bordered w-full max-w-xs border-2 p-1' type="text" placeholder='Category Name'/>
       <button onClick={addHandler} className='btn btn-primary px-4 py-2 rounded-lg text-white font-bold text-center bg-slate-700 mt-3 w-36'>Add Category</button>
       <div className='flex flex-col'> 

       <table className='table-auto  mt-8 max-w-md '>

       <thead >
              <tr className='bg-slate-700 text-white text-left  '>
                <th className='p-1 border-2 border-black'>Category Name</th>
                <th className='p-1 border-2 border-black text-center'>Action</th>
              </tr>
              </thead>
        { categories.length > 0  && categories.map((item)=>(
          
         
            
              <tbody>
                <tr>
                  <td className='p-1 border-2 border-black' >{item.category}</td>
                  <td className='p-1 border-2 border-black text-red-700 text-center cursor-pointer' onClick={()=>showConfirmation(item._id)}>Delete</td>
                  </tr>
              </tbody>
      

      
            ))}
              </table>
       </div>
    </Layout>
  )
        }
        
        

export default category