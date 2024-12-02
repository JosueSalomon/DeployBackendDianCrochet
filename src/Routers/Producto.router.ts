import  express from 'express';
import {
    filtrarProductosPorPrecioYCategoria, 
    getDetalleProducto, getProductosSimilares, 
    obtenerCategorias, ordenarProductosPorPrecioYCategoria, 
    filtrarOrdenarPorPopularidad, 
    obtenerProductosRandom, 
    obtenerCategoriasMateriales,
    ordenarMaterialesPorPrecioYCategoria,
    Search
    } from '../Controllers/Producto.controller'
    //getDetalleMaterial
const router = express.Router();

router.post('/filtrados/:idTipoProducto', filtrarProductosPorPrecioYCategoria);
router.get('/categorias', obtenerCategorias);
router.post('/ordenados/:idTipoProducto',ordenarProductosPorPrecioYCategoria)
router.get('/filtro/popularidad/:idTipoProducto', filtrarOrdenarPorPopularidad);
router.get('/similares/:idProducto', getProductosSimilares);
router.get('/detalle/:idProducto', getDetalleProducto);
router.get('/:tipoproducto', obtenerProductosRandom);
router.get('/categorias/materiales', obtenerCategoriasMateriales);
router.post('/materiales/ordenados/:idTipoProducto',ordenarMaterialesPorPrecioYCategoria)
// router.get('/detalle/material/:idProducto', getDetalleMaterial);
router.post('/search', Search);

export default router;