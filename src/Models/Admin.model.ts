import  supabase  from '../Utils/conexion';


export class Admin{
    static async login(correo: string,contrasena: string){
        const { data, error } = await supabase.rpc('p_login_admin', {p_correo: correo, p_contrasena: contrasena });
        if (error) throw error;
        return data;
    }
}