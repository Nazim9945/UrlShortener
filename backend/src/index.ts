import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import shortUrl from './routes/shortUrl.route'
import redirectFromShortUrl from './controllers/redirectFromShortUrl'
import { dbconnect } from './databases/dbconnect'

dotenv.config()
const PORT=process.env.PORT || 9000
const app=express()
app.use(express.json())
app.use(cors({
    origin:"*",
    credentials:true,
}))
app.use('/api/create',shortUrl);
app.get('/:id',redirectFromShortUrl)



app.listen(PORT,()=>
     dbconnect().then(()=>
 console.log("Server is running at Port :",PORT)))
