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
const googleapis_1 = require("googleapis");
const stream_1 = require("stream");
const KEYFILEPATH = 'kitspdf_KEY.json'; // Asegúrate de que la ruta sea correcta
const SCOPES = ['https://www.googleapis.com/auth/drive.file'];
class DriveUploader {
    constructor() {
        const auth = new googleapis_1.google.auth.GoogleAuth({
            keyFile: KEYFILEPATH,
            scopes: SCOPES,
        });
        this.drive = googleapis_1.google.drive({ version: 'v3', auth });
    }
    uploadPDF(file, folderId) {
        return __awaiter(this, void 0, void 0, function* () {
            const fileMetadata = {
                name: file.originalname,
                mimeType: file.mimetype,
                parents: folderId ? [folderId] : [], // ID de la carpeta si es necesario
            };
            const media = {
                mimeType: file.mimetype,
                body: stream_1.Readable.from(file.buffer), // Convierte el archivo en un stream
            };
            try {
                const response = yield this.drive.files.create({
                    resource: fileMetadata,
                    media: media,
                    fields: 'id',
                });
                const fileId = response.data.id;
                // Cambiar permisos para que solo la persona con el enlace pueda ver el archivo
                if (fileId) {
                    yield this.setFilePermissions(fileId);
                }
                return fileId;
            }
            catch (error) {
                throw new Error(`Error al subir el archivo: ${error}`);
            }
        });
    }
    // Cambiar permisos para que solo la persona con el enlace pueda ver el archivo
    setFilePermissions(fileId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.drive.permissions.create({
                    fileId: fileId,
                    requestBody: {
                        role: 'reader', // 'reader' para solo lectura
                        type: 'anyone', // 'anyone' para acceder con el enlace
                    },
                });
                console.log(`Permisos actualizados: solo acceso con enlace al archivo ${fileId}`);
            }
            catch (error) {
                throw new Error(`Error al actualizar los permisos: ${error}`);
            }
        });
    }
    // Función para obtener la URL del archivo
    getFileUrl(fileId) {
        return `https://drive.google.com/file/d/${fileId}/view?usp=sharing`;
    }
}
exports.default = DriveUploader;
