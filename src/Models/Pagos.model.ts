import supabase from "../Utils/conexion";

export class Pagos {

    static async executePayment(
        id_orden: string,
        id_factura: number,
        estado_orden: string,
    ){
        const { data, error } = await supabase.rpc('p_facturacion', {
            p_id_orden: id_orden,
            p_id_factura: id_factura,
            p_estado_orden: estado_orden,
        });
        if (error) {
            throw error;
        }
        return data;
    }
}