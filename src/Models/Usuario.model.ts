import  supabase  from '../Utils/conexion';

export class User {
    
    static async createUser(
        nombre: string,
        apellido: string,
        correo: string,
        genero: string,
        contrasena: string,
        telefono: string,
        fechaNacimiento: string, // Formato 'YYYY-MM-DD'
        codigoVeri: string,
        descripcion: string
    ) {
        // Llama al procedimiento almacenado
        const { data, error } = await supabase.rpc('p_insert_usuario_verificacion', {
            p_nombre: nombre,
            p_apellido: apellido,
            p_correo: correo,
            p_genero: genero,
            p_contrasena: contrasena,
            p_telefono: telefono,
            p_fecha_nacimiento: fechaNacimiento,
            p_codigo_veri: codigoVeri,
            p_descripcion: descripcion
        });
        if (error) {
            throw error;
        }
        return data;
    }
    
    static async updateVerification(
        correo: string,
        codigoVeri: string
    ){
        const {data, error} = await supabase.rpc('p_verify_code',{
            p_email: correo,
            p_code: codigoVeri
        });
        if(error){
            throw error;
        }
        return data;
    }

    static async nuevoCodigo(
        correo: string,
        codigoVeri: string
    ){
        const {data,error} = await supabase.rpc('p_generar_nuevo_codigo',{
            p_email: correo,
            p_code: codigoVeri
        });
        if(error){
            throw error;
        }
        return data;
    }


    static async login(contrasena: string, correo: string){
        const { data, error } = await supabase.rpc('p_login', {p_contrasena: contrasena, p_correo: correo });
        if (error) throw error;
        return data;
    }

    static async restablecerNuevaContrasena(correo: string, nuevaContrasena: string){
        const { data, error } = await supabase.rpc('p_restablecer_contrasena',  {p_correo: correo, p_nueva_contrasena: nuevaContrasena });
        if (error) throw error;
        return data;
    }

    static async insertarValidacionRestablecerContrasena(correo: string, codigo: string){
        const { data, error } = await supabase.rpc('p_insertar_verificacion_restablecer_contrasena',  {p_correo: correo, p_codigo_veri: codigo });
        if (error) throw error;
        return data;
    }

    static async contrasenaSegura(contrasena: string){
        const { data, error } = await supabase.rpc('p_contrasena_segura',  {v_contrasena : contrasena});
        if (error) throw error;
        return data;
    }

    static async actualizarFoto(correo: string, nuevaURL: string){
        const { data, error } = await supabase.rpc('p_actualizar_foto',{
            p_correo: correo,
            p_nueva_url_imagen: nuevaURL
        });
        if (error) throw error;
        return data;
    }

    static async getDetalleUsuario(correo: string){
        const { data, error } = await supabase.rpc('p_get_usuario',{
            p_correo: correo
        });
        if (error) throw error;
        return data;
    }

    static async updateUser(
        correo: string,
        nuevo_nombre : string,
        nuevo_apellido : string,
        nuevo_genero : string,
        nuevo_telefono : string,
        nueva_fecha_nacimiento :string, // Formato 'YYYY-MM-DD'
    ){
        const { data, error } = await supabase.rpc('p_actualizar_usuario',{
            p_correo:correo,
            p_nuevo_nombre:nuevo_nombre,
            p_nuevo_apellido:nuevo_apellido,
            p_nuevo_genero:nuevo_genero,
            p_nuevo_telefono:nuevo_telefono,
            p_nueva_fecha_nacimiento:nueva_fecha_nacimiento,
        });
        if (error) throw error;
        return data;
    }

    static async getFacturasUsuario(correo: string,columna_ordenamiento: string,direccion_ordenamiento: string){
        const { data, error } = await supabase.rpc('p_get_facturas_usuario',{
            p_correo: correo,
            p_columna_ordenamiento:columna_ordenamiento,
            p_direccion_ordenamiento:direccion_ordenamiento 
        });
        if (error) throw error;
        return data;
    }

    static async getTutorialesDeUsuario(correo: string,columna_ordenamiento: string,direccion_ordenamiento: string){
        const { data, error } = await supabase.rpc('p_buscar_videos_por_usuario',{
            p_correo: correo,
            p_columna_ordenamiento:columna_ordenamiento,
            p_direccion_ordenamiento:direccion_ordenamiento 
        });
        if (error) throw error;
        return data;
    }

    static async restablecerContrasenaAnteriorS(
        correo: string,
        contrasenaAnterior: string,
        nuevaContrasena: string
    ){
        const { data, error } = await supabase.rpc('p_restablecer_contrasena_anterior',{
            p_correo: correo,
            p_nueva_contrasena: nuevaContrasena,
            p_contrasena_anterior: contrasenaAnterior
        });
        console.log("data1", data);
        if (error) throw error;
        return data;
    }

    static async getKitsDeUsario(correo: string,columna_ordenamiento: string,direccion_ordenamiento: string){
        const { data, error } = await supabase.rpc('p_buscar_kits_por_usuario',{
            p_correo: correo,
            p_columna_ordenamiento:columna_ordenamiento,
            p_direccion_ordenamiento:direccion_ordenamiento 
        });
        if (error) throw error;
        return data;
    }

    // static async getUsers(){
    //     const { data, error } = await supabase.rpc('read_users') 
    //     if (error) throw error;
    //     return data;
    // }

    // static async updateUser(id:number, nombre: string, contrasena: string, correo: string){
    //     const { data, error } = await supabase.rpc('update_user',  {p_id: id, p_nombre: nombre, p_contrasena: contrasena, p_correo: correo });
    //     if (error) throw error;
    //     return data;
    // }

    
    // static async deleteUser(id:number){
    //     const { data, error } = await supabase.rpc('delete_user', {p_id: id});
    //     if (error) throw error;
    //     return data;
    // }

    // static async loginUser(contrasena: string, correo: string){
    //     const { data, error } = await supabase.rpc('login_user', {p_contrasena: contrasena, p_correo: correo });
    //     if (error) throw error;
    //     return data;
    // }
}