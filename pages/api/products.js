
import mongoose from 'mongoose';





export default async function handler(req, res) {
    const {method } =req;
    const {name,description,price,images,category,properties} = req.body;
    console.log(req.body)
 
    
    await mongoose.connect(process.env.MONGODB_URI)

    const schema = new mongoose.Schema({
        name: {
            type: String,
            required: true,
          },
          description: {
            type: String,
            required: true,
          },
    
          price: {
            type: Number,
            required: true,
          },
          images: [{
            type: String,
            required: false,
          }],
          category: {
            type: String,
            required: true,
          },
          properties: {
            type: Object,
            required: false,
          }
      });

    const Product = mongoose.models.Product || mongoose.model('Product', schema);
      
      

    if(method === 'POST'){
        
        await Product.create({ name:name,description:description,price:price,images:images,category:category,properties:properties});
        
        res.status(200).json("The product has been added")

   }if(method === 'GET'){

       if(req.query?.id){
           res.status(200).json(await Product.findOne({_id:req.query.id}))
       }else{
           
           res.status(200).json(await Product.find())
       }
   }if(method === 'DELETE'){
       const {id} = req.query;
       res.status(200).json(await Product.deleteOne({_id:id}))

   }if(method === 'PUT'){
    const {name,description,price,_id,images} = req.body;
       res.status(200).json(await Product.updateOne({_id},{name,description,price,_id,images,category,properties}))
   }
}

  
  