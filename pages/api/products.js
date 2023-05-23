
import mongoose from 'mongoose';





export default async function handler(req, res) {
    const {method } =req;
    const {name,description,price} = req.body;
    console.log( req.body)
    
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
          pop: {
            type: String,
            required: false,
          },
      });

    const Product = mongoose.models.Product || mongoose.model('Product', schema);
      
      

    if(method === 'POST'){
        const pop = "pop"
        await Product.create({ name,description,price,pop});
        
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
       res.status(200).json(await Product.updateOne({_id},{name,description,price,_id,images}))
   }
}

  
  