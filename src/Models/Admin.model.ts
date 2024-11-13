import  supabase  from '../Utils/conexion';


export class Admin{
    static async login(correo: string,contrasena: string){
        const { data, error } = await supabase.rpc('p_login_admin', {p_correo: correo, p_contrasena: contrasena });
        if (error) throw error;
        return data;
    }

    static async DetalleOrdenProdcuto(idFactura: number){
            const {data, error} = await supabase.rpc('p_get_detalle_orden_productos',{
                p_id_factura: idFactura
            });
            if (error) throw error;
            return data;
    }

    static async DetalleOrdenCliente(idFactura: number){
        const {data, error} = await supabase.rpc('p_get_detalle_orden_cliente',{
            p_id_factura: idFactura
        });
        if (error) throw error;
        return data;
    }

    static async ObtenerOrdenes(
        idEstado: number, columna_ordenamiento: string,
        direccion_ordenamiento: string ){
        const {data, error} = await supabase.rpc('p_get_todas_las_ordenes',{
            p_id_estado_fact: idEstado,
            p_orden_columna: columna_ordenamiento,
            p_orden_direccion: direccion_ordenamiento
        });
        if (error) throw error;
        return data;
    }

    static async ObtenerEstadosFactura(){
        const{data, error} = await supabase.rpc('p_obtener_estados_fact');
        if(error){
            throw error;
        }
        return data;
    }


    static async ActualizarEstadoOrden(idOrden: number, idNuevoEstado: number){
        const{data, error} = await supabase.rpc('p_cambiar_estado_orden',{
            p_id_factura: idOrden,
            p_id_estado_fact: idNuevoEstado
        });
        if(error){
            throw error;
        }
        return data;
    }
}