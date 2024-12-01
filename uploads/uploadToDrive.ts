import { google } from 'googleapis';
import { Readable } from 'stream';

const SCOPES = ['https://www.googleapis.com/auth/drive.file'];

class DriveUploader {
  private drive: any;

  constructor() {
    const auth = new google.auth.JWT({
        email: process.env.CLIENT_EMAIL,
        key: (process.env.PRIVATE_KEY || '').replace(/\\n/g, '\n'), // Reemplaza \n con saltos de línea reales
        scopes: SCOPES,
      });
    this.drive = google.drive({ version: 'v3', auth });
  }

  async uploadPDF(file: Express.Multer.File, folderId?: string) {
    const fileMetadata = {
      name: file.originalname,
      mimeType: file.mimetype,
      parents: folderId ? [folderId] : [], // ID de la carpeta si es necesario
    };

    const media = {
      mimeType: file.mimetype,
      body: Readable.from(file.buffer), // Convierte el archivo en un stream
    };

    try {
      const response = await this.drive.files.create({
        resource: fileMetadata,
        media: media,
        fields: 'id',
      });

      const fileId = response.data.id;

      // Cambiar permisos para que solo la persona con el enlace pueda ver el archivo
      if (fileId) {
        await this.setFilePermissions(fileId);
      }

      return fileId;
    } catch (error) {
      throw new Error(`Error al subir el archivo: ${error}`);
    }
  }

  // Cambiar permisos para que solo la persona con el enlace pueda ver el archivo
  private async setFilePermissions(fileId: string) {
    try {
      await this.drive.permissions.create({
        fileId: fileId,
        requestBody: {
          role: 'reader', // 'reader' para solo lectura
          type: 'anyone', // 'anyone' para acceder con el enlace
        },
      });

      console.log(`Permisos actualizados: solo acceso con enlace al archivo ${fileId}`);
    } catch (error) {
      throw new Error(`Error al actualizar los permisos: ${error}`);
    }
  }

  // Función para obtener la URL del archivo
  getFileUrl(fileId: string): string {
    return `https://drive.google.com/file/d/${fileId}/view?usp=sharing`;
  }
}
console.log("PRIVATE_KEY:", process.env.PRIVATE_KEY);

export default DriveUploader;
