import { useRouter } from "next/router"
import { useState } from "react"
import Layout from "./Layout"
import axios from "axios"
import { set } from "mongoose"





function ProductForm(productinfo) {

    const [name, setName] = useState(productinfo.name ||"")
    const [description, setDescription] = useState(productinfo.description ||"")
    const [price, setPrice] = useState(productinfo.price || "")
    const [images, setImages] = useState(productinfo.images || [])
    const [succcess, setSucccess] = useState(false)
    const [response , setResposne] = useState()
    const [loading, setLoading] = useState(false)
 

    async function uploadImages(e){
      const files = e.target?.files

      // Assuming you have a form with id "myForm" in your component

  e.preventDefault();

  const formData = new FormData();
  for (const file of files) {
         formData.append('image', file)
       }

  try {
    setLoading(true)
    const res = await axios.post('http://localhost:3000/api/upload', formData)
    
    setImages(oldImages=>{
      return [...oldImages, ...res.data.links]
    })
    setLoading(false)
  }catch(error){
    console.log(error)
  }
}

      // if(files?.length>0){
      //   const formData = new FormData()

      //   for (const file of files) {
      //     formData.append('image', file)
      //   }

      //   const res = await axios.post('http://localhost:3000/api/upload', formData,{
      //     headers: {
      //       'Content-Type': 'multipart/form-data'
      //     }
      //   })
      // }
  
        
      //   const res = await axios.post('http://localhost:3000/api/upload', formData,{
      //     headers: {
      //       'Content-Type': 'multipart/form-data'
      //     }
      //   })
      //   console.log(res.data)
      // }
        

   



    async function  addProductHandler(e) {
      e.preventDefault()
      console.log(productinfo._id)
      if(productinfo._id) {
        
        const res = await axios.put(`http://localhost:3000/api/products`, {price, name, description, _id: productinfo._id,images})
        setSucccess(true)
        setResposne(res.data)
        setName('')
        setDescription('')
        setPrice('')
        
        return
      }else{
        const data = {name, description, price,images}
        const res = await axios.post('http://localhost:3000/api/products', data)
        setSucccess(true)
        setResposne(res.data)
        setName('')
        setDescription('')
        setPrice('')

      }


  
      

    }

  return (
    <Layout>
        <div className='flex flex-col gap-4'>
        <label className='text-l'>Product Name</label>
        <input type="text" placeholder="Name" className='  p-2 border-2 border-gray-300 rounded-md' value={name} onChange={(e) => setName(e.target.value)} />
        <label className=" bg-gray-200 rounded-md p-2  w-32 text-center ">
        <div>
          {loading ? <div>Uploading ...</div>:<div>Upload Image</div>}
          
         
          <input type="file" id="file" className="hidden" onChange={uploadImages} />
        </div>
        </label>
       <div>
           {images?.length ? 
           <div className=" flex gap-2 overflow-auto">

            {images.map((images) => (
            <img className=" w-16 h-16 object-fit " src={images} />))}

           </div>

            : <div src={images} alt="" >No Image Available</div>}
        </div>
        {loading ? <div className=" text-red-500">Uploading the image ...</div>:null}
        <label className='text-l'>Product Description</label>
        <textarea type="text" placeholder="Description" className='  p-2 border-2 border-gray-300 rounded-md' value={description} onChange={(e) => setDescription(e.target.value)} />
        <label className='text-l'>Product Price</label>
        <input type="text" placeholder="Price" className='  p-2 border-2 border-gray-300 rounded-md' value={price} onChange={(e) => setPrice(e.target.value)} />
        <button className='bg-blue-500 text-white p-2 rounded-md mt-4 font-bold' onClick={addProductHandler}>Submit</button>
        <h3 className=' text-red-500 font-bold'>{!succcess ? response : productinfo._id ? 'Product Updated Successfully' : 'Product Added Successfully'}</h3>
        </div>
        
    </Layout>
  )
}

export default ProductForm