import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import shortUrlRoute from './routes/shortUrl.route'
import authRoute from './routes/auth.route'
import redirectFromShortUrl from './controllers/redirectFromShortUrl'
import { dbconnect } from './databases/dbconnect'
import { globalErrorHandler } from './middlewares/errorHandler'
import { addUser } from './utils/addUser'
import cookieParser from 'cookie-parser'
import { getAllUrls } from './controllers/getAllUrls.controller'
import {rateLimit} from 'express-rate-limit'
import morgan from 'morgan'

const basicLimit = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  limit: 100, 
  standardHeaders: "draft-8", 
  legacyHeaders: false, 
  ipv6Subnet: 56,
});
const limit = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minutes
  limit: 15,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  ipv6Subnet: 56,
});
dotenv.config()
const PORT=process.env.PORT || 9000
const app=express()
app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser());
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
}))
app.use('/api/auth',authRoute);
app.use(addUser);
app.use('/api/create',limit,shortUrlRoute);
app.get('/:id',basicLimit,redirectFromShortUrl)
app.get('/api/allUrls',basicLimit,getAllUrls);

app.use(globalErrorHandler)

app.listen(PORT,()=>
     dbconnect().then(()=>
 console.log("Server is running at Port :",PORT)))
