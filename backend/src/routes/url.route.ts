import {Router,Request,Response} from 'express'
import UrlSchema from '../models/url.model'
import {nanoid} from 'nanoid'
const route:Router=Router()


route.get('/:id',async(req:Request,res:Response)=>{
       try {
         const token_id=req.params.id
         console.log(token_id)
        if(!token_id){
            return res.status(400).json({
                message:"Bad request, id is missing"
            })
        }

        const urldoc=await UrlSchema.findOne({mappId:token_id});
        console.log(urldoc,"............testing.....");
       
        if(!urldoc){
            return res.status(400).json({
                message:"Could not find this site"
            })
        }
        res.redirect(urldoc.fullUrl)
      
       
       } catch (error) {
        console.log(error);

       }
        

})
route.post('/url',async(req:Request,res:Response)=>{
  try {
      const { url } = req.body;
        console.log(url,"...testing");
      const token_id = nanoid();
      const newdoc = new UrlSchema();
      newdoc.mappId = token_id;
      newdoc.fullUrl = url;
      newdoc.shortUrl = "http://localhost:3000/" + token_id;
      await newdoc.save();
      console.log(newdoc);
      return res.status(200).json({
        shorten_url: newdoc.shortUrl,
        message: "Done with shortning url",
      });

  } catch (error) {
    console.log(error);
  }
})
export default route
