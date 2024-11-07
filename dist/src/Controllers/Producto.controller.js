"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ordenarMaterialesPorPrecioYCategoria = exports.obtenerCategoriasMateriales = exports.obtenerProductosRandom = exports.getDetalleProducto = exports.getProductosSimilares = exports.filtrarOrdenarPorPopularidad = exports.ordenarProductosPorPrecioYCategoria = exports.obtenerCategorias = exports.filtrarProductosPorPrecioYCategoria = void 0;
const Producto_model_1 = require("../Models/Producto.model");
const filtrarProductosPorPrecioYCategoria = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { categorias, min_precio, max_precio } = req.body;
    const { idTipoProducto } = req.params;
    try {
        const productos = yield Producto_model_1.Producto.filtrarProductosPorPrecioYCategoria(idTipoProducto, categorias, min_precio, max_precio);
        res.status(201).json({
            productos
        });
    }
    catch (error) {
        console.log('error con fetch de productos filtrados', error);
        res.status(500).json({ message: 'algo paso mal :(', error });
    }
});
exports.filtrarProductosPorPrecioYCategoria = filtrarProductosPorPrecioYCategoria;
const obtenerCategorias = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categorias = yield Producto_model_1.Producto.getCategorias();
        res.status(201).json({
            categorias
        });
    }
    catch (error) {
        console.log('error con fetch de categotias', error);
        res.status(500).json({ message: 'algo paso mal :(', error });
    }
});
exports.obtenerCategorias = obtenerCategorias;
const ordenarProductosPorPrecioYCategoria = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { categorias, min_precio, max_precio, columna_ordenamiento, direccion_ordenamiento } = req.body;
    const { idTipoProducto } = req.params;
    try {
        const productos = yield Producto_model_1.Producto.OrdenarProductosPorPrecioYCateogira(idTipoProducto, categorias, min_precio, max_precio, columna_ordenamiento, direccion_ordenamiento);
        res.status(201).json({
            productos
        });
    }
    catch (error) {
        console.log('error con fetch de productos ordenados', error);
        res.status(500).json({ message: 'algo paso mal :(', error });
    }
});
exports.ordenarProductosPorPrecioYCategoria = ordenarProductosPorPrecioYCategoria;
const filtrarOrdenarPorPopularidad = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { idTipoProducto } = req.params;
        const populares = yield Producto_model_1.Producto.filtrarOrdenarPorPopularidad(Number(idTipoProducto));
        res.status(201).json({ populares });
    }
    catch (error) {
        const errorInfo = error && typeof error === 'object'
            ? JSON.stringify(error, null, 2)
            : (error === null || error === void 0 ? void 0 : error.toString()) || 'Error desconocido';
        console.error('Informacion del error: ', errorInfo);
        res.status(500).json({
            message: 'Informacion del error: ',
            error: errorInfo
        });
    }
});
exports.filtrarOrdenarPorPopularidad = filtrarOrdenarPorPopularidad;
const getProductosSimilares = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { idProducto } = req.params;
        const productosSimilares = yield Producto_model_1.Producto.SugerirProductos(Number(idProducto));
        res.status(201).json({
            productosSimilares
        });
    }
    catch (error) {
        console.log('error con fetch de productos similares', error);
        res.status(500).json({ message: 'algo paso mal :(', error });
    }
});
exports.getProductosSimilares = getProductosSimilares;
const getDetalleProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { idProducto } = req.params;
        const DetalleProducto = yield Producto_model_1.Producto.GetDetalleProducto(Number(idProducto));
        res.status(201).json({
            DetalleProducto
        });
    }
    catch (error) {
        console.log('error con fetch de detalle de producto', error);
        res.status(500).json({ message: 'algo paso mal :(', error });
    }
});
exports.getDetalleProducto = getDetalleProducto;
const obtenerProductosRandom = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { tipoproducto } = req.params;
    try {
        const productosRandom = yield Producto_model_1.Producto.getProductosRandom(tipoproducto);
        res.status(201).json({
            productosRandom
        });
    }
    catch (error) {
        console.log('error con fetch de categotias', error);
        res.status(500).json({ message: 'algo paso mal :(', error });
    }
});
exports.obtenerProductosRandom = obtenerProductosRandom;
const obtenerCategoriasMateriales = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categoriasMateriales = yield Producto_model_1.Producto.getCategoriasMateriales();
        res.status(201).json({
            categoriasMateriales
        });
    }
    catch (error) {
        console.log('error con fetch de categotias', error);
        res.status(500).json({ message: 'algo paso mal :(', error });
    }
});
exports.obtenerCategoriasMateriales = obtenerCategoriasMateriales;
const ordenarMaterialesPorPrecioYCategoria = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { categorias, min_precio, max_precio, columna_ordenamiento, direccion_ordenamiento } = req.body;
    const { idTipoProducto } = req.params;
    try {
        const productos = yield Producto_model_1.Producto.OrdenarMaterialesPorPrecioYCateogira(idTipoProducto, categorias, min_precio, max_precio, columna_ordenamiento, direccion_ordenamiento);
        res.status(201).json({
            productos
        });
    }
    catch (error) {
        console.log('error con fetch de productos ordenados', error);
        res.status(500).json({ message: 'algo paso mal :(', error });
    }
});
exports.ordenarMaterialesPorPrecioYCategoria = ordenarMaterialesPorPrecioYCategoria;
// export const getDetalleMaterial = async (req: Request, res: Response) => {
//     try {
//         const { idProducto } = req.params;
//         const DetalleProducto = await Producto.GetDetalleMaterial(Number(idProducto));
//         res.status(201).json({
//             DetalleProducto
//         })
//     } catch (error) {
//         console.log('error con fetch de detalle de producto', error);
//         res.status(500).json({ message: 'algo paso mal :(', error });
//     }
// };
