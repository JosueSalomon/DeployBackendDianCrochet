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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObtenerOrdenes = exports.DetalleOrdenCliente = exports.DetalleOrdenProdcuto = exports.LoginAdmin = exports.uploadImage = void 0;
const Admin_model_1 = require("../Models/Admin.model");
const imageKitConfig_1 = __importDefault(require("../Utils/imageKitConfig"));
const uploadImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const file = req.file;
        const fileName = file === null || file === void 0 ? void 0 : file.originalname;
        if (!file) {
            res.status(400).json({ error: 'No se proporcionó ninguna imagen' });
            return;
        }
        // Convertir el archivo a base64
        const base64File = file.buffer.toString('base64');
        const folderPath = '/Fotos'; // 
        const response = yield imageKitConfig_1.default.upload({
            file: base64File, // Archivo en base64
            fileName: fileName || 'default_image_name.jpg', // Nombre del archivo
            folder: folderPath, // Carpeta donde se almacenará la imagen
        });
        const imageUrl = response.url; // La URL de la imagen almacenada
        console.log('Imagen subida con éxito. URL:', imageUrl);
        res.status(200).json({ imageUrl: imageUrl });
    }
    catch (error) {
        console.error('Error al subir la imagen:', error);
        res.status(500).json({ error: 'Error al subir la imagen' });
    }
});
exports.uploadImage = uploadImage;
const LoginAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { correo, contrasena } = req.body;
    try {
        const admin = yield Admin_model_1.Admin.login(correo, contrasena);
        res.status(201).json({
            admin
        });
    }
    catch (error) {
        console.log("error con login", error);
        res.status(500).json({ message: 'Error en el servidor', error });
    }
});
exports.LoginAdmin = LoginAdmin;
const DetalleOrdenProdcuto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { IdOrden } = req.params;
    try {
        const DetalleOrden = yield Admin_model_1.Admin.DetalleOrdenProdcuto(Number(IdOrden));
        res.status(201).json({
            DetalleOrden
        });
    }
    catch (error) {
        console.log("error fetch detalle orden ", error);
        res.status(500).json({ message: 'Error en el servidor', error });
    }
});
exports.DetalleOrdenProdcuto = DetalleOrdenProdcuto;
const DetalleOrdenCliente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { IdOrden } = req.params;
    try {
        const DetalleOrdenCliente = yield Admin_model_1.Admin.DetalleOrdenCliente(Number(IdOrden));
        res.status(201).json({
            DetalleOrdenCliente
        });
    }
    catch (error) {
        console.log("error fetch detalle del con su orden ", error);
        res.status(500).json({ message: 'Error en el servidor', error });
    }
});
exports.DetalleOrdenCliente = DetalleOrdenCliente;
const ObtenerOrdenes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idEstado } = req.params;
    const { columna_ordenamiento, direccion_ordenamiento } = req.body;
    try {
        const ordenes = yield Admin_model_1.Admin.ObtenerOrdenes(Number(idEstado), columna_ordenamiento, direccion_ordenamiento);
        res.status(201).json({
            ordenes
        });
    }
    catch (error) {
        console.log("error fetch de ordenes ", error);
        res.status(500).json({ message: 'Error en el servidor', error });
    }
});
exports.ObtenerOrdenes = ObtenerOrdenes;
