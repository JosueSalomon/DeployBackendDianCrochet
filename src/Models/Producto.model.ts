import  supabase  from '../Utils/conexion';

export class Producto{
    
    static async filtrarProductosPorPrecioYCategoria(
        tipo_prod: string,      
        categorias: string[],
        min_precio: number ,
        max_precio: number   
    ) {
        const { data, error } = await supabase.rpc('p_filtrar_productos_por_categoria_y_precio', {
            p_tipo_prod: tipo_prod,       
            p_categorias: categorias,
            p_min_precio: min_precio,
            p_max_precio: max_precio
        });
    
        if (error) {
            throw error;
        }
    
        return data;
    }
    

    static async getCategorias(){
        const {data, error} = await supabase.rpc('p_obtener_todas_las_categorias');
        if(error){
            throw error;
        }
        return data;
    }
    
    static async OrdenarProductosPorPrecioYCateogira(
        tipo_prod: string,                  
        categorias: string[],
        min_precio: number,           
        max_precio: number,           
        columna_ordenamiento: string,
        direccion_ordenamiento: string
    ) {
        const { data, error } = await supabase.rpc('p_ordenar_productos_por_categoria_y_precio', {
            p_tipo_prod: tipo_prod,           
            p_categorias: categorias,
            p_min_precio: min_precio,
            p_max_precio: max_precio,
            p_columna_ordenamiento: columna_ordenamiento,
            p_direccion_ordenamiento: direccion_ordenamiento
        });
    
        if (error) {
            throw error;
        }
    
        return data;
    }
    

    static async filtrarOrdenarPorPopularidad (idTipoProducto: number){
        const {data, error} = await supabase.rpc('p_filtrar_ordenar_por_popularidad', {
            p_id_tipo_producto: idTipoProducto
        });
        if(error){
            throw error;
        }
        console.log(data);
        return data;
    }

    static async SugerirProductos(
        id_Producto: number
    ){
        const{data, error} = await supabase.rpc('p_get_similar_products',{
            p_id_producto: id_Producto
        });
        if(error){
            throw error;
        }
        return data;
    }

    static async GetDetalleProducto(
        id_Producto: number
    ){
        const{data, error} = await supabase.rpc('get_producto_info',{
            p_id_producto: id_Producto
        });
        if(error){
            throw error;
        }
        return data
    }

    static async getProductosRandom(tipo_prod: string){
        const {data, error} = await supabase.rpc('p_productos_desroden',{
            p_tipo_prod: tipo_prod
        }
        );
        if(error){
            throw error;
        }
        return data;
    }

    static async getCategoriasMateriales(){
        const {data, error} = await supabase.rpc('p_obtener_todas_las_categorias_materiales');
        if(error){
            throw error;
        }
        return data;
    }

    static async OrdenarMaterialesPorPrecioYCateogira(
        tipo_prod: string,                  
        categorias: string[],
        min_precio: number,           
        max_precio: number,           
        columna_ordenamiento: string,
        direccion_ordenamiento: string
    ) {
        const { data, error } = await supabase.rpc('p_ordenar_materiales_por_categoria_y_precio', {
            p_tipo_prod: tipo_prod,           
            p_categorias_mat: categorias,
            p_min_precio: min_precio,
            p_max_precio: max_precio,
            p_columna_ordenamiento: columna_ordenamiento,
            p_direccion_ordenamiento: direccion_ordenamiento
        });
    
        if (error) {
            throw error;
        }
    
        return data;
    }
    // static async GetDetalleMaterial(
    //     id_Producto: number
    // ){
    //     const{data, error} = await supabase.rpc('get_material_info',{
    //         p_id_producto: id_Producto
    //     });
    //     if(error){
    //         throw error;
    //     }
    //     return data
    // }

    static async Search(nombre_prod: string, tallas: string[]){
        const { data, error } = await supabase.rpc('p_searchbar',{
            p_nombre_prod:nombre_prod ,
            p_tallas: tallas
        });
        if (error) {
            throw error;
        }
        return data;
    }
}