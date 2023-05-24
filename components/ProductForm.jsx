import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import Layout from "./Layout"
import axios from "axios"
import ClipLoader from "react-spinners/ClipLoader"
import { ReactSortable } from "react-sortablejs"
import { set } from "mongoose"





function ProductForm(productinfo) {

    const [name, setName] = useState(productinfo.name ||"")
    const [description, setDescription] = useState(productinfo.description ||"")
    const [price, setPrice] = useState(productinfo.price || "")
    const [images, setImages] = useState(productinfo.images || [])
    const [succcess, setSucccess] = useState(false)
    const [response , setResposne] = useState()
    const [loading, setLoading] = useState(false)
    const [categories,setCategories] = useState([])
    const [category,setCategory] = useState(productinfo.category || "")


    async function fetchData(){
      const res = await axios.get('http://localhost:3000/api/category')
      setCategories(res.data)
    }
  
    useEffect(()=>{
      fetchData()
    },[])

    



    const override = {
      display: "block",
      margin: "0 auto",
      borderColor: "red",
    };
 

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

    

   



    async function  addProductHandler(e) {
      e.preventDefault()
      console.log(productinfo._id)
      if(productinfo._id) {
        
        const res = await axios.put(`http://localhost:3000/api/products`, {price, name, description, _id: productinfo._id,images,category})
        setSucccess(true)
        setResposne(res.data)
        setName('')
        setDescription('')
        setPrice('')
        
        return
      }else{
        const data = {name, description, price,images,category}
        const res = await axios.post('http://localhost:3000/api/products', data)
        setSucccess(true)
        setResposne(res.data)
        setName('')
        setDescription('')
        setPrice('')

      }
    }

    function  setImagesOrder(images){
      setImages(images)
    
    }

  return (
    <Layout>
        <div className='flex flex-col gap-4'>
        <label className='text-l'>Product Name</label>
        <input type="text" placeholder="Name" className='  p-2 border-2 border-gray-300 rounded-md' value={name} onChange={(e) => setName(e.target.value)} />
        
        
        <label className=" bg-gray-200 rounded-md p-2  w-40 text-center ">
     
        <div >
        
          <div className="flex gap-2">
            <div>Upload Image</div>
                {loading ? <div className=" text-red-500">
              <ClipLoader
              loading={loading}
              cssOverride={override}
              size={24}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
              </div>:null}
            

          </div>
          
          <input type="file" id="file" className="hidden" onChange={uploadImages} />
        </div>

        </label>

        

       <div className="flex flex-wrap gap-1 mb-2">
        <ReactSortable className=" flex gap-1 flex-wrap" list={images} setList={setImagesOrder}>
           {images?.length && images.map((images) => (
            <div className="h-24" key={images._id}  >
              <img src={images} className=" rounded-lg h-full" />
            </div>
            ))}
           </ReactSortable>
        </div>
        
        
        <label className='text-l'>Product Description</label>
        
        <textarea type="text" placeholder="Description" className='  p-2 border-2 border-gray-300 rounded-md' value={description} onChange={(e) => setDescription(e.target.value)} />
        <label className='text-l'>Product Price</label>
        <input type="text" placeholder="Price" className='  p-2 border-2 border-gray-300 rounded-md' value={price} onChange={(e) => setPrice(e.target.value)} />
        <select className=" p-2 border-2 border-gray-300 rounded-md font-black" onChange={(e) => setCategory(e.target.value)} value={category}>
          <option>Select Category</option>
          {categories?.map((category) => (
            <option className=" text-black rounded-md p-2" key={category._id} value={category.category} >{category.category}</option>
            ))}
          
        </select>
        <button className='bg-blue-500 text-white p-2 rounded-md mt-4 font-bold' onClick={addProductHandler}>Submit</button>
        <h3 className=' text-red-500 font-bold'>{!succcess ? response : productinfo._id ? 'Product Updated Successfully' : 'Product Added Successfully'}</h3>
        </div>
        
    </Layout>
  )
}

export default ProductForm