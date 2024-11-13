import { Router } from 'express';
import upload from '../Utils/upload'; 
import { uploadImage,LoginAdmin,DetalleOrdenProdcuto,DetalleOrdenCliente,ObtenerOrdenes } from '../Controllers/Admin.controller'; 

const router = Router();


router.post('/upload', upload.single('file'), uploadImage);
router.post('/login', LoginAdmin);
router.get('/detalle/orden/:IdOrden', DetalleOrdenProdcuto);
router.get('/detalle/cliente/orden/:IdOrden', DetalleOrdenCliente);
router.post('/ordenes', ObtenerOrdenes);




export default router;
