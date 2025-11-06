import  {Router} from 'express'


import createShortUrl from '../controllers/createShortUrl'

const route:Router=Router()


// route.use(authMiddleWare);
route.post('/',createShortUrl)
export default route
