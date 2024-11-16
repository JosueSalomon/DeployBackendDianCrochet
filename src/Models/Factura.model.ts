import supabase from '../Utils/conexion'

export class Factura {

    //CARRITO
    static async insertarProductoCarrito(
        correo: string,
        idProducto: number,
        cantidadCompra: number,
        talla: string,
        grosor: string
    ){
        const {data, error} = await supabase.rpc('p_insertar_producto_a_carrito', {
            p_correo_usuario: correo,
            p_id_producto: idProducto,
            p_cantidad_compra: cantidadCompra,
            p_talla: talla,
            p_grosor: grosor,
        });
        if(error){
            throw error;
        }
        return data;
    }

    static async actualizarCarrito(
        correo: string,
        nuevaCantidad: number,
        idProducto: number
    ){
        const {data, error} = await supabase.rpc('p_actualizar_carrito', {
            p_correo_usuario: correo,
            p_nueva_cantidad: nuevaCantidad,
            p_id_producto: idProducto
        });
        if (error) {
            throw error;
        }
        return data;
    }

    static async eliminarProductoCarrito(
        correo: string,
        idProducto: number
    ){
        const {data, error} = await supabase.rpc('p_eliminar_producto_carrito', {
            p_correo_usuario: correo,
            p_id_producto: idProducto
        });
        if(error){
            throw error;
        }
        return data;
    }

    static async obtenerCarrito(correo: string){
        const {data, error} = await supabase.rpc('p_obtener_carrito', {
            p_correo_usuario: correo
        });
        if(error){
            throw error;
        }
        return data;
    }

    static async obtenerSubtotalImpuestos(correo: string){
        const {data, error} = await supabase.rpc('p_obtener_subtotal_impuestos_carrito', {
            p_correo_usuario: correo
        });
        if(error){
            throw error;
        }
        return data;        
    }

    static async obtenerDepartamentos(){
        const{data, error} = await supabase.rpc('p_obtener_departamentos');
        if(error){
            throw error;
        }
        return data;
    }

    static async obtenerCiudades(id_departamento: number){
        const {data, error} = await supabase.rpc('p_obtener_ciudades',{
            p_id_departamento: id_departamento
        });
        if(error){
            throw error;
        }
        return data;
    }

    static async detalleFactura(id_factura: number){
        const {data, error} = await supabase.rpc('p_get_detalle_factura',{
            p_id_factura: id_factura
        });
        if(error){
            throw error;
        }
        return data;
    }

    static async borrarCarrito(id_factura: number){
        const {data, error} = await supabase.rpc('p_eliminar_carrito',{
            p_id_factura: id_factura
        });
        if(error){
            throw error;
        }
        return data;
    }

    static async guardarPrecioEnvio(
        id_factura: number,
        direccion: string,
        id_ciudad: number,
        numero: string
    ){
        const { data, error } = await supabase.rpc('p_obtener_envio', {
            p_id_factura: id_factura,
            p_direccion: direccion,
            p_id_ciudad: id_ciudad,
            p_numero: numero
        });
        if(error){
            throw error;
        }
        return data;
    }

    static async ConteoCarrito(correo: string){
        const{data, error} = await supabase.rpc('p_conteo_carrito',{
            p_correo: correo
        });
        if(error){
            throw error;
        }
        return data;
    }
}