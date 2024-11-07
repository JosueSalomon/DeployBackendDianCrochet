import { Request, Response } from 'express';
import imagekit from '../Utils/imageKitConfig'; 

interface MulterRequest extends Request {
  file?: Express.Multer.File; // Aquí hacemos 'file' opcional
}

export const uploadImage = async (req: MulterRequest, res: Response): Promise<void> => {
  try {
    const file = req.file; 
    const fileName = file?.originalname; 

    if (!file) {
      res.status(400).json({ error: 'No se proporcionó ninguna imagen' });
      return;  
    }

    // Convertir el archivo a base64
    const base64File = file.buffer.toString('base64');

    const folderPath = '/Fotos'; // 

    const response = await imagekit.upload({
      file: base64File, // Archivo en base64
      fileName: fileName || 'default_image_name.jpg', // Nombre del archivo
      folder: folderPath, // Carpeta donde se almacenará la imagen
    });

    const imageUrl = response.url; // La URL de la imagen almacenada

    console.log('Imagen subida con éxito. URL:', imageUrl); 

    res.status(200).json({ imageUrl: imageUrl });

  } catch (error) {
    console.error('Error al subir la imagen:', error);
    res.status(500).json({ error: 'Error al subir la imagen' });
  }
};
