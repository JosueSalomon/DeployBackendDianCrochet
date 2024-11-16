import { Router } from 'express';
import upload from '../Utils/upload'; 
import { uploadImage,LoginAdmin,DetalleOrdenProdcuto,DetalleOrdenCliente,ObtenerOrdenes,
    ObtenerEstdosFactura,ActualizarEstadoOrden,
    CrearProductoSinTallas,
    CrearProductoConTallas,
    CrearMaterialSinTallas,
    CrearMaterialConGrosor
} from '../Controllers/Admin.controller'; 

const router = Router();


router.post('/upload', upload.single('file'), uploadImage);
router.post('/login', LoginAdmin);
router.get('/detalle/orden/:IdOrden', DetalleOrdenProdcuto);
router.get('/detalle/cliente/orden/:IdOrden', DetalleOrdenCliente);
router.post('/ordenes', ObtenerOrdenes);
router.get('/factura/estados', ObtenerEstdosFactura);
router.put('/update/estado/:IdOrden', ActualizarEstadoOrden);


router.post('/create/producto/sintalla', CrearProductoSinTallas);
router.post('/create/producto/contalla', CrearProductoConTallas);
router.post('/create/material/sintalla', CrearMaterialSinTallas);
router.post('/create/material/contalla', CrearMaterialConGrosor);




export default router;
