import { Router } from 'express';
import upload from '../Utils/upload'; 
import { uploadImage,LoginAdmin,DetalleOrdenProdcuto,DetalleOrdenCliente,ObtenerOrdenes,
    ObtenerEstdosFactura,ActualizarEstadoOrden,Obtener_productos_admin,
    Obtener_productos_por_categoria_admin,
    CrearProductoSinTallas,
    CrearProductoConTallas,
    CrearMaterialSinTallas,
    CrearMaterialConGrosor,
    ObtenerProductoAdmin,
    ActualizarMaterialConGrosor,
    ActualizarMaterialSinTallas,
    ActualizarProductoConTallas,
    ActualizarProductoSinTallas,
    DeleteProducto,
    FiltrarFechasRango,
    CreateKit,
    UpdateKit
} from '../Controllers/Admin.controller'; 

const router = Router();


router.post('/upload', upload.single('file'), uploadImage);
router.post('/login', LoginAdmin);
router.get('/detalle/orden/:IdOrden', DetalleOrdenProdcuto);
router.get('/detalle/cliente/orden/:IdOrden', DetalleOrdenCliente);
router.post('/ordenes', ObtenerOrdenes);
router.post('/ordenes/fechas', FiltrarFechasRango);
router.get('/factura/estados', ObtenerEstdosFactura);
router.put('/update/estado/:IdOrden', ActualizarEstadoOrden);
router.get('/productos', Obtener_productos_admin);
router.get('/prodcutos/categoria/:IdCategoria', Obtener_productos_por_categoria_admin);




router.post('/create/producto/sintalla', CrearProductoSinTallas);
router.post('/create/producto/contalla', CrearProductoConTallas);
router.post('/create/material/sintalla', CrearMaterialSinTallas);
router.post('/create/material/contalla', CrearMaterialConGrosor);
router.post('/create/kit', CreateKit);


router.get('/get/producto/:IdProducto', ObtenerProductoAdmin);

router.put('/update/producto/sintalla/:productId', ActualizarProductoSinTallas);
router.put('/update/producto/contalla/:productId', ActualizarProductoConTallas);
router.put('/update/material/sintalla/:materialId', ActualizarMaterialSinTallas);
router.put('/update/material/contalla/:materialId', ActualizarMaterialConGrosor);
router.put('/update/kit/:id_producto', UpdateKit);

router.delete('/delete/producto/:IdProducto', DeleteProducto);



export default router;
