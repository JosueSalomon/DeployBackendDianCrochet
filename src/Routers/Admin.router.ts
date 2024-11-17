import { Router } from 'express';
import upload from '../Utils/upload'; 
import { uploadImage,LoginAdmin,DetalleOrdenProdcuto,DetalleOrdenCliente,ObtenerOrdenes,
    ObtenerEstdosFactura,ActualizarEstadoOrden,Obtener_productos_admin,
    Obtener_productos_por_categoria_admin,
    CrearProductoSinTallas,
    CrearProductoConTallas,
    CrearMaterialSinTallas,
    CrearMaterialConGrosor,
    ObtenerProductoAdmin
} from '../Controllers/Admin.controller'; 

const router = Router();


router.post('/upload', upload.single('file'), uploadImage);
router.post('/login', LoginAdmin);
router.get('/detalle/orden/:IdOrden', DetalleOrdenProdcuto);
router.get('/detalle/cliente/orden/:IdOrden', DetalleOrdenCliente);
router.post('/ordenes', ObtenerOrdenes);
router.get('/factura/estados', ObtenerEstdosFactura);
router.put('/update/estado/:IdOrden', ActualizarEstadoOrden);
router.get('/productos', Obtener_productos_admin);
router.get('/prodcutos/categoria/:IdCategoria', Obtener_productos_por_categoria_admin);




router.post('/create/producto/sintalla', CrearProductoSinTallas);
router.post('/create/producto/contalla', CrearProductoConTallas);
router.post('/create/material/sintalla', CrearMaterialSinTallas);
router.post('/create/material/contalla', CrearMaterialConGrosor);


router.get('/get/producto/:IdProducto', ObtenerProductoAdmin);




export default router;
