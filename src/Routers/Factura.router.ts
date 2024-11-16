import express from 'express';
import { insertarProductoCarrito, actualizarCarrito, eliminarProductoCarrito, obtenerCarrito, 
            obtenerSubtotalImpuestos, obtenerDepartamentos, getCiudades, getDeatlleFactura,
            borrarCarrito, guardarPrecioEnvio,ConteoCarrito } from '../Controllers/Factura.controller'
const router = express.Router();

router.post('/carrito/insertar/actualizar', insertarProductoCarrito);
router.put('/carrito/actualizar', actualizarCarrito);
router.delete('/carrito/producto/eliminar', eliminarProductoCarrito);
router.get('/carrito/:correo', obtenerCarrito);
router.put('/carrito/subtotal', obtenerSubtotalImpuestos);
router.get('/departamentos', obtenerDepartamentos);
router.get('/ciudad/:idDepartamento', getCiudades);
router.get('/detalle/:idfactura', getDeatlleFactura);
router.delete('/eliminar/carrito/:idfactura', borrarCarrito);
router.post('/envio', guardarPrecioEnvio);
router.get('/carrito/conteo/:correo', ConteoCarrito);









export default router;


