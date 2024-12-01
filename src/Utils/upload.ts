// utils/upload.ts
import multer from 'multer';

// Configuración del almacenamiento en memoria
const storage = multer.memoryStorage();

// Configuración de multer para aceptar un solo archivo
const upload = multer({
    storage: storage,
  limits: { fileSize: 50 * 1024 * 1024 }  // 50 MB
});

export default upload;
