import { Request, Response } from 'express';
import { Admin } from '../Models/Admin.model'

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


export const LoginAdmin = async (req: Request, res: Response) => {
  const {correo,contrasena } = req.body;
  try{
      const admin = await Admin.login(correo,contrasena);
      res.status(201).json({ 
        admin
    });
  }catch(error: any){
        console.log("error con login", error);
        res.status(500).json({ message: 'Error en el servidor', error });
    }

}

export const DetalleOrdenProdcuto = async (req: Request, res: Response) => {
  const {IdOrden} = req.params;
  try{
      const DetalleOrden = await Admin.DetalleOrdenProdcuto(Number(IdOrden));
      res.status(201).json({
        DetalleOrden
      })
  }catch(error: any){
    console.log("error fetch detalle orden ", error);
    res.status(500).json({ message: 'Error en el servidor', error });
  }

}

export const DetalleOrdenCliente = async (req: Request, res: Response) => {
  const {IdOrden} = req.params;
  try{
      const DetalleOrdenCliente = await Admin.DetalleOrdenCliente(Number(IdOrden));
      res.status(201).json({
        DetalleOrdenCliente
      })
  }catch(error: any){
    console.log("error fetch detalle del con su orden ", error);
    res.status(500).json({ message: 'Error en el servidor', error });
  }

}

export const ObtenerOrdenes = async (req: Request, res: Response) =>{
  const{idEstado,columna_ordenamiento,
      direccion_ordenamiento} = req.body

    try{
        const ordenes = await Admin.ObtenerOrdenes(idEstado,columna_ordenamiento,direccion_ordenamiento);
        res.status(201).json({
          ordenes
        })
    }catch(error: any){
      console.log("error fetch de ordenes ", error);
      res.status(500).json({ message: 'Error en el servidor', error });
    }
}


export const ObtenerEstdosFactura = async (req: Request, res: Response) => {
  try {
      const Estados = await Admin.ObtenerEstadosFactura();

      res.status(201).json({
        Estados
      });
  }
  catch (error) {
      console.log('error con fetch de Estados de factura', error);
      res.status(500).json({ message: 'algo paso mal :(', error });
  }
}

export const ActualizarEstadoOrden = async (req: Request, res: Response) => {
  const {IdOrden} = req.params;
  const{IdNuevoEstado} = req.body

  try{
      const UpdatedOrden = await Admin.ActualizarEstadoOrden(Number(IdOrden),IdNuevoEstado)
      res.status(201).json({
        UpdatedOrden
      });
  }catch (error) {
      console.log('error con actualizacion de Estados de factura', error);
      res.status(500).json({ message: 'algo paso mal :(', error });
  }
}


export const Obtener_productos_admin = async (req: Request, res: Response) => {
  try {
      const productos = await Admin.Obtener_todos_los_productos_admin();

      res.status(201).json({
        productos
      });
  }
  catch (error) {
      console.log('error con fetch de productos', error);
      res.status(500).json({ message: 'algo paso mal :(', error });
  }
}

export const Obtener_productos_por_categoria_admin = async (req: Request, res: Response) => {
  const {IdCategoria} = req.params;
  
  try {
      const productosConCategoria = await Admin.Obtener_productos_por_categoria_admin(Number(IdCategoria));

      res.status(201).json({
        productosConCategoria
      });
  }
  catch (error) {
      console.log('error con fetch de productos con categorias', error);
      res.status(500).json({ message: 'algo paso mal :(', error });
  }
}