"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Producto_controller_1 = require("../Controllers/Producto.controller");
//getDetalleMaterial
const router = express_1.default.Router();
router.post('/filtrados/:idTipoProducto', Producto_controller_1.filtrarProductosPorPrecioYCategoria);
router.get('/categorias', Producto_controller_1.obtenerCategorias);
router.post('/ordenados/:idTipoProducto', Producto_controller_1.ordenarProductosPorPrecioYCategoria);
router.get('/filtro/popularidad/:idTipoProducto', Producto_controller_1.filtrarOrdenarPorPopularidad);
router.get('/similares/:idProducto', Producto_controller_1.getProductosSimilares);
router.get('/detalle/:idProducto', Producto_controller_1.getDetalleProducto);
router.get('/:tipoproducto', Producto_controller_1.obtenerProductosRandom);
router.get('/categorias/materiales', Producto_controller_1.obtenerCategoriasMateriales);
router.post('/materiales/ordenados/:idTipoProducto', Producto_controller_1.ordenarMaterialesPorPrecioYCategoria);
// router.get('/detalle/material/:idProducto', getDetalleMaterial);
exports.default = router;
