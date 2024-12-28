import express from 'express';

import { createuser,deleteuser,getuser, updateuser } from '../controllers/usercontroller.js';

const routers = express.Router();
routers.post('/create',createuser)
routers.get('/get',getuser)
routers.put('/update/:id',updateuser)
routers.delete('/delete/:id',deleteuser)

export default routers;