import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import axios from 'axios';
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.css';
import { set } from 'mongoose';


function category() {
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [properies, setProperies] = useState([]);
  const [editedcat,setEditedCat] = useState(null)

  function propertyHandler(){
    setProperies(prev=>{
      return [...prev, {name:'', value:''}]
    })
  }

  function handleChangePropertyName(item,newName,index){
     setProperies(prev=>{
      const newArr = [...prev]
      newArr[index].name = newName
      return newArr
     })
  }

 function handleChangePropertyValue(item,newValue,index){
  setProperies(prev=>{
   const newArr = [...prev]
   newArr[index].value = newValue
   return newArr
  })
}


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
    const propertiesObject = properies.map(item=>{
      return {name:item.name, value:item.value.split(",")}
    })
      if(!category) {
        alert('Category is required')
        return
      }

      if(categories.some((item)=>item.category === category)&& (!editedcat)){
        alert('Category already exists')
        return
      }
      
      if(editedcat){
        const res = await axios.put(`http://localhost:3000/api/category?id=${editedcat._id}`,{category,properties:propertiesObject})
        fetchData()
        setEditedCat(null)
        setCategory('')
        setProperies([])
        
        return
      }else{
        const cat = await axios.post('http://localhost:3000/api/category', {category,properties:propertiesObject})
        fetchData()
        setCategory('')
        setProperies([])
      
      }
      
    
  }

  function updateHandler(category){
    setEditedCat(category)
    const cat = categories.find((item)=>item._id === category._id)
    setCategory(cat.category)

    console.log(cat.properties)
    if(cat.properties.length > 0){
      cat.properties.map(item=>{
      const name = item.name
      const value = item.value.join()
      setProperies(prev=>{
        return [...prev,{name,value}]
      })
    })
  }
    
    // setProperies(cat.properties.map(item=>{
    //   return {name:item.name, value:item.value.split(",")}
    
  }


  
  return (
    <Layout>
        <label className=' mb-2 font-bold'>{editedcat? `Update ${editedcat.category} Category`:'Add Category'}</label>
       <input value={category} onChange={(e)=>setCategory(e.target.value)}  name="category" id="category" className='input input-bordered w-full max-w-xs border-2 p-1' type="text" placeholder='Category Name'/>
       
       
       <div className='flex  mt-5'>
        <button onClick={propertyHandler} className='btn btn-primary px-3  py-2 rounded-lg text-white font-bold text-center bg-blue-700  '>Add Property</button>
       </div>
       <div className='ml-2'>
          {properies.length > 0 && properies.map((item,index)=>(
            <div className='flex gap-2 mt-3 '>
              <input value={item.name}
               onChange={(e)=>handleChangePropertyName(item,e.target.value,index)}
               className='input input-bordered  border-2 px-2 py-1 rounded-lg font-bold' type="text" placeholder='Property Name'/>
              <input value={item.value}
              onChange={(e)=>handleChangePropertyValue(item,e.target.value,index)}
               className='input input-bordered  border-2 px-2 py-1 rounded-lg font-bold' type="text" placeholder='Property Value'/>
             <button className='btn btn-primary px-3  py-2 rounded-lg text-white font-bold text-center bg-red-700 ' onClick={()=>setProperies(prev=>prev.filter((item,ind)=>ind!==index))}>Delete</button>
            </div>
            ))}
       </div>

       <div className='flex gap-3 '>
       <button onClick={addHandler} className='btn btn-primary px-4 py-2 rounded-lg text-white font-bold text-center bg-slate-700 mt-3 '>Save</button>
       <button onClick={()=>{
        setEditedCat(null)
        setCategory('')
        setProperies([])}} 
        className='btn btn-primary px-4 py-2 rounded-lg text-white font-bold text-center bg-gray-500 mt-3 '>Cancel</button>
       
       </div>
       
       
       
       <div className='flex flex-col'> 

       {!editedcat && (
         <table className='table-auto  mt-8 max-w-md '>

         <thead >
                <tr className='bg-slate-700 text-white text-left w-full  '>
                  <th className='p-1 border-2 border-black w-full'>Category Name</th>
                  <th className='p-1 border-t-2 border-b-2 border-black '></th>
                  <th className='p-1 border-t-2 border-b-2 border-black border-r-2'></th>
                 
                </tr>
                </thead>
          { categories.length > 0  && categories.map((item)=>(
                <tbody>
                  <tr>
                    <td className='p-1 border-2 border-black' >{item.category}</td>
                    <td className='p-1 border-2 border-black text-center cursor-pointer' onClick={()=>updateHandler(item)}>Edit</td>
                    <td className='p-1 border-2 border-black text-red-700 text-center cursor-pointer' onClick={()=>showConfirmation(item._id)}>Delete</td>
                    </tr>
                </tbody>
              ))}
                </table>
       )}

      
       </div>
    </Layout>
  )
        }
        
        

export default category