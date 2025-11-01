import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import urlRoutes from './routes/url.route'
import { dbconnect } from './databases/dbconnect'

dotenv.config()
const app=express()
app.use(express.json())
app.use(cors({
    origin:"*",
    credentials:true,
}))
app.use('/api',urlRoutes);

const PORT=process.env.PORT || 9000


dbconnect()
app.listen(PORT,()=>
    console.log("Server is running at Port :",PORT))
