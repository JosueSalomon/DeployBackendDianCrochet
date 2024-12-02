import { Producto } from '../Models/Producto.model';
import { Request, Response } from 'express';

export const filtrarProductosPorPrecioYCategoria = async (req: Request, res: Response) => {
    const {
        categorias,
        min_precio,
        max_precio
    } = req.body
    const { idTipoProducto } = req.params;

    try {
        const productos = await Producto.filtrarProductosPorPrecioYCategoria(
            idTipoProducto,
            categorias,
            min_precio,
            max_precio
        );

        res.status(201).json({
            productos
        });
    } catch (error) {
        console.log('error con fetch de productos filtrados', error);
        res.status(500).json({ message: 'algo paso mal :(', error });
    }
}

export const obtenerCategorias = async (req: Request, res: Response) => {
    try {
        const categorias = await Producto.getCategorias();

        res.status(201).json({
            categorias
        });
    }
    catch (error) {
        console.log('error con fetch de categotias', error);
        res.status(500).json({ message: 'algo paso mal :(', error });
    }
}

export const ordenarProductosPorPrecioYCategoria = async (req: Request, res: Response) =>{
    const{
        categorias,
        min_precio,
        max_precio,
        columna_ordenamiento,
        direccion_ordenamiento
    } = req.body
    const { idTipoProducto } = req.params;

    try{
        const productos = await Producto.OrdenarProductosPorPrecioYCateogira(
            idTipoProducto,
            categorias,
            min_precio,
            max_precio,
            columna_ordenamiento,
            direccion_ordenamiento
        );

        res.status(201).json({
            productos
        });
    } catch(error){
        console.log('error con fetch de productos ordenados', error);
        res.status(500).json({ message: 'algo paso mal :(', error });
    }
}

export const filtrarOrdenarPorPopularidad = async (req: Request, res: Response) => {
    try{
        const {idTipoProducto} = req.params;
        const populares = await Producto.filtrarOrdenarPorPopularidad(Number(idTipoProducto));

        res.status(201).json({populares});
    } catch(error){
        const errorInfo = error && typeof error === 'object'
            ? JSON.stringify(error, null, 2)
            : error?.toString() || 'Error desconocido';

        console.error('Informacion del error: ', errorInfo);
        res.status(500).json({
            message: 'Informacion del error: ', 
            error: errorInfo
        });
    }
}

export const getProductosSimilares = async (req: Request, res: Response) => {
    try {
        const { idProducto } = req.params;
        
        const productosSimilares = await Producto.SugerirProductos(Number(idProducto));
        
        res.status(201).json({
            productosSimilares
        })
    } catch (error) {
        console.log('error con fetch de productos similares', error);
        res.status(500).json({ message: 'algo paso mal :(', error });
    }
};

export const getDetalleProducto = async (req: Request, res: Response) => {
    try {
        const { idProducto } = req.params;
        const DetalleProducto = await Producto.GetDetalleProducto(Number(idProducto));
        res.status(201).json({
            DetalleProducto
        })
    } catch (error) {
        console.log('error con fetch de detalle de producto', error);
        res.status(500).json({ message: 'algo paso mal :(', error });
    }
};

export const obtenerProductosRandom = async (req: Request, res: Response) => {
    const { tipoproducto } = req.params
    try {
        const productosRandom = await Producto.getProductosRandom(tipoproducto);

        res.status(201).json({
            productosRandom
        });
    }
    catch (error) {
        console.log('error con fetch de categotias', error);
        res.status(500).json({ message: 'algo paso mal :(', error });
    }
}

export const obtenerCategoriasMateriales = async (req: Request, res: Response) => {
    try {
        const categoriasMateriales = await Producto.getCategoriasMateriales();

        res.status(201).json({
            categoriasMateriales
        });
    }
    catch (error) {
        console.log('error con fetch de categotias', error);
        res.status(500).json({ message: 'algo paso mal :(', error });
    }
}

export const ordenarMaterialesPorPrecioYCategoria = async (req: Request, res: Response) =>{
    const{
        categorias,
        min_precio,
        max_precio,
        columna_ordenamiento,
        direccion_ordenamiento
    } = req.body
    const { idTipoProducto } = req.params;

    try{
        const productos = await Producto.OrdenarMaterialesPorPrecioYCateogira(
            idTipoProducto,
            categorias,
            min_precio,
            max_precio,
            columna_ordenamiento,
            direccion_ordenamiento
        );

        res.status(201).json({
            productos
        });
    } catch(error){
        console.log('error con fetch de productos ordenados', error);
        res.status(500).json({ message: 'algo paso mal :(', error });
    }
}

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

export const search = async (req: Request, res: Response) => {
    const {nombre, tallas} = req.body;
    
    try {
        const resultado = await Producto.search(nombre, tallas);
  
        res.status(201).json({
          resultado
        });
    }
    catch (error) {
        console.log('error trayendo el resultado', error);
        res.status(500).json({ message: 'error con el resultado', error });
    }
  }