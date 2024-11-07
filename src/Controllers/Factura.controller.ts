import { Factura } from '../Models/Factura.model'
import { Request, Response } from 'express'

export const insertarProductoCarrito = async (req: Request, res: Response) => {
    try {
        const {correo, idProducto, cantidadCompra, talla, grosor} = req.body;
        const carrito = await Factura.insertarProductoCarrito(correo, idProducto, cantidadCompra, talla, grosor);
    
        res.status(201).json({carrito});
    } catch (error: any) {
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

export const actualizarCarrito = async (req: Request, res: Response) => {
    try {
        const {correo, nuevaCantidad, idProducto} = req.body;
        const actualizar = await Factura.actualizarCarrito(correo, nuevaCantidad, idProducto);

        res.status(201).json({actualizar});

    } catch (error) {
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

export const eliminarProductoCarrito = async (req: Request, res: Response) => {
    try {
    const {correo, idProducto} = req.body;
        const eliminar = await Factura.eliminarProductoCarrito(correo, idProducto);

        res.status(201).json({eliminar});
    } catch (error) {
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

export const obtenerCarrito = async (req: Request, res: Response) => {
    try {
    const { correo } = req.params;
        const carrito = await Factura.obtenerCarrito(correo);
        res.status(201).json({carrito});
    } catch (error) {
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

export const obtenerSubtotalImpuestos = async (req: Request, res: Response) => {
    try {
        const { correo } = req.body;
        const subtotal = await Factura.obtenerSubtotalImpuestos(correo);
        console.log('Subtotal :', subtotal);
        
        res.status(201).json(subtotal);
    } catch (error) {
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

export const obtenerDepartamentos = async (req: Request, res: Response) => {
    try {
        const Departamentos = await Factura.obtenerDepartamentos();

        res.status(201).json({
            Departamentos
        });
    }
    catch (error) {
        console.log('error con fetch de Departamentos', error);
        res.status(500).json({ message: 'algo paso mal :(', error });
    }
}

export const getCiudades = async (req: Request, res: Response) => {
    try {
        const { idDepartamento } = req.params;
        
        const Ciudades = await Factura.obtenerCiudades(Number(idDepartamento));
        
        res.status(201).json({
            Ciudades
        })
    } catch (error) {
        console.log('error con fetch de Ciudades', error);
        res.status(500).json({ message: 'algo paso mal :(', error });
    }
};

export const getDeatlleFactura = async (req: Request, res: Response) =>{
    const { idfactura } = req.params;

    try{
        const DetalleProducto = await Factura.detalleFactura(Number(idfactura))
        res.status(201).json({
            DetalleProducto
        })
    }catch (error) {
        console.log('error con fetch de detalle producto', error);
        res.status(500).json({ message: 'algo paso mal :(', error });
}
}

export const borrarCarrito = async (req: Request, res: Response) =>{
    const { idfactura } = req.params;
    try{
        const DetalleProducto = await Factura.borrarCarrito(Number(idfactura))
        res.status(201).json({
            DetalleProducto
        })
    }catch (error) {
        console.log('error con borrar la factura', error);
        res.status(500).json({ message: 'algo paso mal :(', error });
}
}

export const guardarPrecioEnvio = async (req: Request, res: Response) => {
    const { id_factura, direccion, id_ciudad, numero} = req.body;
    try{
        const envio = await Factura.guardarPrecioEnvio(Number(id_factura), direccion, Number(id_ciudad), numero)
        res.status(201).json({
            envio
        })
    }catch (error) {
        const errorInfo = error && typeof error === 'object'
            ? JSON.stringify(error, null, 2)
            : error?.toString() || 'Error desconocido';

        console.error('Informacion del error: ', errorInfo);
        res.status(500).json({
            message: 'Informacion del error: ', 
            error: errorInfo
        });
    }
};