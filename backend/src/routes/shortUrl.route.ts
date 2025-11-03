import  {Request,Response, Router} from 'express'


import createShortUrl from '../controllers/createShortUrl'
const route:Router=Router()



route.post('/',createShortUrl)
export default route
