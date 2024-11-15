"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const upload_1 = __importDefault(require("../Utils/upload"));
const Admin_controller_1 = require("../Controllers/Admin.controller");
const router = (0, express_1.Router)();
router.post('/upload', upload_1.default.single('file'), Admin_controller_1.uploadImage);
router.post('/login', Admin_controller_1.LoginAdmin);
router.get('/detalle/orden/:IdOrden', Admin_controller_1.DetalleOrdenProdcuto);
router.get('/detalle/cliente/orden/:IdOrden', Admin_controller_1.DetalleOrdenCliente);
router.post('/ordenes', Admin_controller_1.ObtenerOrdenes);
router.get('/factura/estados', Admin_controller_1.ObtenerEstdosFactura);
router.put('/update/estado/:IdOrden', Admin_controller_1.ActualizarEstadoOrden);
router.get('/productos', Admin_controller_1.Obtener_productos_admin);
router.get('/prodcutos/categoria/:IdCategoria', Admin_controller_1.Obtener_productos_por_categoria_admin);
exports.default = router;
