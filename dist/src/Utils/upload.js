"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// utils/upload.ts
const multer_1 = __importDefault(require("multer"));
// Configuración del almacenamiento en memoria
const storage = multer_1.default.memoryStorage();
// Configuración de multer para aceptar un solo archivo
const upload = (0, multer_1.default)({
    storage: storage,
    limits: { fileSize: 50 * 1024 * 1024 } // 50 MB
});
exports.default = upload;
