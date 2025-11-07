import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import createShortUrl from './routes/shortUrl.route'
import authRoute from './routes/auth.route'
import redirectFromShortUrl from './controllers/redirectFromShortUrl'
import { dbconnect } from './databases/dbconnect'
import { globalErrorHandler } from './middlewares/errorHandler'
import { addUser } from './utils/addUser'
import cookieParser from 'cookie-parser'
import { getAllUrls } from './controllers/getAllUrls.controller'

dotenv.config()
const PORT=process.env.PORT || 9000
const app=express()
app.use(express.json())
app.use(cookieParser());
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
}))
app.use('/api/auth',authRoute);
app.use(addUser);
app.use('/api/create',createShortUrl);
app.get('/:id',redirectFromShortUrl)
app.get('/api/allUrls',getAllUrls);

app.use(globalErrorHandler)

app.listen(PORT,()=>
     dbconnect().then(()=>
 console.log("Server is running at Port :",PORT)))
