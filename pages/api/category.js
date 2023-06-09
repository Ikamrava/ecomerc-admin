
import mongoose from 'mongoose';


export default async function handler(req, res) {
    const {method } =req;
    const {category,properties} = req.body;
    console.log(req.body)
    
    await mongoose.connect(process.env.MONGODB_URI)

    const schema = new mongoose.Schema({
        category: {
            type: String,
            required: true,
          },
          properties: [{
            type: Object,
            required: false,
          }],
      });

    const Category = mongoose.models.Category || mongoose.model('Category', schema);

    if(method === 'POST'){
        await Category.create({category,properties:properties});
        res.status(200).json("The category has been added")

   }if(method === 'GET'){

       if(req.query?.id){
           res.status(200).json(await Category.findOne({_id:req.query.id}))
       }else{
           res.status(200).json(await Category.find())
       }
   }if(method === 'DELETE'){
       const {id} = req.query;
       res.status(200).json(await Category.deleteOne({_id:id}))

   }if(method === 'PUT'){
       const {id} = req.query;
       res.status(200).json(await Category.updateOne({_id:id}, {category,properties:properties}))
   }
}

  
  