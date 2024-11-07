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
exports.guardarPrecioEnvio = exports.borrarCarrito = exports.getDeatlleFactura = exports.getCiudades = exports.obtenerDepartamentos = exports.obtenerSubtotalImpuestos = exports.obtenerCarrito = exports.eliminarProductoCarrito = exports.actualizarCarrito = exports.insertarProductoCarrito = void 0;
const Factura_model_1 = require("../Models/Factura.model");
const insertarProductoCarrito = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { correo, idProducto, cantidadCompra, talla, grosor } = req.body;
        const carrito = yield Factura_model_1.Factura.insertarProductoCarrito(correo, idProducto, cantidadCompra, talla, grosor);
        res.status(201).json({ carrito });
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
exports.insertarProductoCarrito = insertarProductoCarrito;
const actualizarCarrito = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { correo, nuevaCantidad, idProducto } = req.body;
        const actualizar = yield Factura_model_1.Factura.actualizarCarrito(correo, nuevaCantidad, idProducto);
        res.status(201).json({ actualizar });
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
exports.actualizarCarrito = actualizarCarrito;
const eliminarProductoCarrito = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { correo, idProducto } = req.body;
        const eliminar = yield Factura_model_1.Factura.eliminarProductoCarrito(correo, idProducto);
        res.status(201).json({ eliminar });
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
exports.eliminarProductoCarrito = eliminarProductoCarrito;
const obtenerCarrito = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { correo } = req.params;
        const carrito = yield Factura_model_1.Factura.obtenerCarrito(correo);
        res.status(201).json({ carrito });
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
exports.obtenerCarrito = obtenerCarrito;
const obtenerSubtotalImpuestos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { correo } = req.body;
        const subtotal = yield Factura_model_1.Factura.obtenerSubtotalImpuestos(correo);
        console.log('Subtotal :', subtotal);
        res.status(201).json(subtotal);
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
exports.obtenerSubtotalImpuestos = obtenerSubtotalImpuestos;
const obtenerDepartamentos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Departamentos = yield Factura_model_1.Factura.obtenerDepartamentos();
        res.status(201).json({
            Departamentos
        });
    }
    catch (error) {
        console.log('error con fetch de Departamentos', error);
        res.status(500).json({ message: 'algo paso mal :(', error });
    }
});
exports.obtenerDepartamentos = obtenerDepartamentos;
const getCiudades = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { idDepartamento } = req.params;
        const Ciudades = yield Factura_model_1.Factura.obtenerCiudades(Number(idDepartamento));
        res.status(201).json({
            Ciudades
        });
    }
    catch (error) {
        console.log('error con fetch de Ciudades', error);
        res.status(500).json({ message: 'algo paso mal :(', error });
    }
});
exports.getCiudades = getCiudades;
const getDeatlleFactura = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idfactura } = req.params;
    try {
        const DetalleProducto = yield Factura_model_1.Factura.detalleFactura(Number(idfactura));
        res.status(201).json({
            DetalleProducto
        });
    }
    catch (error) {
        console.log('error con fetch de detalle producto', error);
        res.status(500).json({ message: 'algo paso mal :(', error });
    }
});
exports.getDeatlleFactura = getDeatlleFactura;
const borrarCarrito = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idfactura } = req.params;
    try {
        const DetalleProducto = yield Factura_model_1.Factura.borrarCarrito(Number(idfactura));
        res.status(201).json({
            DetalleProducto
        });
    }
    catch (error) {
        console.log('error con borrar la factura', error);
        res.status(500).json({ message: 'algo paso mal :(', error });
    }
});
exports.borrarCarrito = borrarCarrito;
const guardarPrecioEnvio = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_factura, direccion, id_ciudad } = req.body;
    try {
        const envio = yield Factura_model_1.Factura.guardarPrecioEnvio(Number(id_factura), direccion, Number(id_ciudad));
        res.status(201).json({
            envio
        });
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
exports.guardarPrecioEnvio = guardarPrecioEnvio;
