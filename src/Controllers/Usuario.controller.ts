import { User } from '../Models/Usuario.model';
import  { Request, Response } from 'express';
import {transporter} from '../Utils/mailer';

function generarCodigoAleatorio() {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let codigo = '';
    for (let i = 0; i < 6; i++) {
        const indiceAleatorio = Math.floor(Math.random() * caracteres.length);
        codigo += caracteres[indiceAleatorio];
    }
    return codigo;
}

const EnviarCorreo = async (
    email: string, 
    verificationCode: string | number, 
    asunto: string,
    descripcionCorreo: string
) => {
    try {
        const DatosCorreo = {
            from: '"DianCrochet" <josueisacsalomonlanda@gmail.com>',
            to: email,
            subject: asunto,
            html: `
                <!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Título del Correo</title>
    <style>
        body { 
            font-family: Arial, sans-serif; 
            background-color: #f4f4f4; 
            margin: 0; 
        }
        .container { 
            max-width: 600px; 
            margin: 0 auto; 
            background-color: #fff; 
            border-radius: 8px; 
            box-shadow: 0 4px 8px rgba(0,0,0,0.1); 
            position: relative;
        }
        .header { 
            display: flex; 
            align-items: center; 
            justify-content: center; 
            position: relative; 
        }
        h1 { 
            color: #3498db; 
            font-size: 24px; 
            margin: 0; 
            text-align: center;
        }
        h2 { 
            color: #333; 
            text-align: center; 
            font-size: 18px; 
            margin-bottom: 20px; 
        }
        .code { 
            font-size: 36px; 
            font-weight: bold; 
            color: #e67e22; 
            text-align: center; 
            margin: 30px 0; 
            letter-spacing: 2px; 
        }
        p { 
            color: #666; 
            text-align: center; 
            font-size: 16px; 
            line-height: 1.5; 
        }
        .footer { 
            color: #999; 
            text-align: center; 
            font-size: 12px; 
            margin-top: 20px; 
        }
        @keyframes swing {
            0% { transform: rotate(5deg); }
            50% { transform: rotate(-5deg); }
            100% { transform: rotate(5deg); }
        }
        .rana {
            width: 80px;
            height: 80px;
            background: url('https://ik.imagekit.io/diancrochet/Fotos/rana%20final%20liviana.png?updatedAt=1729230005393') no-repeat center center;
            background-size: contain;
            animation: swing 2s infinite ease-in-out;
            transform-origin: top center;
            align-self: flex-start;
        }
        .girasol {
            background: url('https://ik.imagekit.io/diancrochet/Fotos/GirasonGIF.gif') no-repeat center center;
            background-size: contain;
            position: absolute;
            z-index: 10;
        }
        .girasol1 {
            width: 40px;
            height: 100px;
            left: 10%;
            top: 77%;
            position: absolute;
            z-index: 10;
        }
        .girasol2 {
            width: 40px;
            height: 100px;
            left: 86%;
            top: 77%;
        }
        .girasol3 {
            width: 40px;
            height: 100px;
            left: 86%;
            top: 10%;
        }
        .girasol4 {
            width: 40px;
            height: 100px;
            left: 27%;
            top: 32%;
        }
        .girasol5 {
            width: 40px;
            height: 100px;
            left: 73%;
            top: 43%;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="rana"></div>
            <div>
                <h1>Bienvenido a DianCrochet</h1>
                <p style="font-size: 18px; color: #333; text-align: center;">${descripcionCorreo}</p>
                <div style="text-align: center; margin: 30px 0;">
                    <p style="font-size: 16px; color: #666;">Tu código de verificación es:</p>
                    <p style="font-size: 32px; font-weight: bold; color: #e67e22; letter-spacing: 2px; text-shadow: 2px 2px 5px rgba(0,0,0,0.1);">${verificationCode}</p>
                    <p style="font-size: 16px; color: #666; text-align: center;">Recuerda no compartir este código con nadie.</p>
                    <p style="font-size: 16px; color: #666; text-align: center;">Si no solicitaste este código, por favor ignora este mensaje.</p>
                    <hr style="border: none; border-top: 1px solid #ddd;">
                    <p style="text-align: center; color: #999; font-size: 12px;">&copy; 2024 DianCrochet. Todos los derechos reservados.</p>
                </div>
            </div>
        </div>
    </div>
</body>
</html>

            `
        };

        // Envía el correo
        await transporter.sendMail(DatosCorreo);

        // Retorna un mensaje de éxito
        return { message: 'Correo enviado con éxito', code: verificationCode };
    } catch (error) {
        console.error('Error al enviar el correo:', error);
        throw new Error('Error al enviar el correo');
    }
};



export const crearUsuarioYEnviarCorreo = async (req: Request, res: Response) => {
    const { 
        nombre, 
        apellido, 
        correo, 
        genero, 
        contrasena, 
        telefono, 
        fechaNacimiento 
    } = req.body;

    try {
        // Generar código de verificación
        const verificationCode = generarCodigoAleatorio();
        const descripcion =  "Verificacion de creacion de cuenta";
        const status = true;;


        // Crear usuario
        const user = await User.createUser(
            nombre,
            apellido,
            correo,
            genero,
            contrasena,
            telefono,
            fechaNacimiento,
            verificationCode, 
            descripcion
        );

        // Respuesta exitosa
        res.status(201).json({  
            user
                });
        if(user.codigo ===1){
        await EnviarCorreo(correo, verificationCode, "Código de verificación", descripcion);
        }
        console.log(user.codigo)
    } catch (error) {
        // Manejo de errores
        console.log('error con creacion de usuario', error);
        res.status(500).json({ message: 'correo no valido', error });
    }
};

export const ValidarCorreo = async (req: Request, res: Response) => {
    const { correo, codigoVeri } = req.body;
    try {
        const user = await User.updateVerification(correo, codigoVeri);

        res.status(201).json({  
            user
            });

    } catch (error: any) {
        console.log('Error al verificar cuenta:', error);
        res.status(500).json({ message: 'Error en el servidor', error });
    }
};


export const nuevoCodigo = async(req: Request, res: Response) =>{
    const { correo } = req.body;
    try{
        const verificationCode = generarCodigoAleatorio();
        const descripcion = "Verificacion de creacion de cuenta";
        const user = await User.nuevoCodigo(correo, verificationCode);
        res.status(201).json({ 
            user
        });
        if(user.codigo===1){
            await EnviarCorreo(correo, verificationCode, "Código de verificación", descripcion);
        }
    } catch(error: any){
        console.log("error al generar nuevo codigo", error);
        res.status(500).json({ message: 'Error en el servidor', error });
    }
}

//login
//Realiza las validaciones desde la base de datos
export const login = async (req: Request, res: Response) => {
    try {
        const {contrasena, correo } = req.body;
        const user = await User.login(contrasena, correo);
        res.status(201).json(user); 
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

export const correoRestablecerContrasena = async (req: Request, res: Response) => {
    try {
        const {correo} = req.body;

        const codigo = await generarCodigoAleatorio();
        const descripcion = "Verificacion para restablecer de contraseña";
        
        const correo_result = await EnviarCorreo(
                correo,
                codigo,
                "Restablecer contraseña",
                descripcion
            )
        
        const verificacion = await User.insertarValidacionRestablecerContrasena(correo,  codigo);
        
            

        res.status(200).json(verificacion);
    } catch (error: any) {
        const errorInfo = error && typeof error === 'object' 
            ? JSON.stringify(error, null, 2)
            : error?.toString() || 'Error desconocido';
        
        console.error('Informacion del error: ', errorInfo);
        return errorInfo;
    }
};

export const restablecerNuevaContrasena = async (req: Request, res: Response) => {
    try {

        const {correo, nuevaContrasena} = req.body;
        const restablecer = await User.restablecerNuevaContrasena(correo, nuevaContrasena)
        res.status(201).json(restablecer); 
    
    } catch (error: any) {
        const errorInfo = error && typeof error === 'object' 
            ? JSON.stringify(error, null, 2)
            : error?.toString() || 'Error desconocido';
        
        console.error('Informacion del error: ', errorInfo);
        return errorInfo;
    }
}

export const establecerContrasenaSegura = async (req: Request, res: Response) => {
    try {

        const {contrasena} = req.body;
        const verificacion = await User.contrasenaSegura(contrasena)
        res.status(201).json(verificacion); 
    
    } catch (error: any) {
        const errorInfo = error && typeof error === 'object' 
            ? JSON.stringify(error, null, 2)
            : error?.toString() || 'Error desconocido';
        
        console.error('Informacion del error: ', errorInfo);
        return errorInfo;
    }
}

export const UpdateFoto = async (req: Request, res: Response) =>{
    const { correo } = req.params;
    const {
        nueva_url_imagen
    } = req.body

    try{
        const user = await User.actualizarFoto(
            correo,
            nueva_url_imagen
        )
        res.status(201).json({  
            user
        });
    }catch (error) {
        // Manejo de errores
        console.log('error con actualizacion de foto', error);
        res.status(500).json({ message: 'error con actualizacion de foto', error });
    }
}

export const getUsuario = async (req: Request, res: Response) =>{
    const { correo } = req.params;

    try{
        const Usuario = await User.getDetalleUsuario(correo)
        
        res.status(201).json({
            Usuario
        })

    }catch (error) {
        console.log('error con fetch de usuario', error);
        res.status(500).json({ message: 'error con fetch de usuario', error });
    }
}

export const updateUser = async (req: Request, res: Response) =>{
    const { correo } = req.params;
    const { 
        Nuevo_nombre, 
        Nuevo_apellido, 
        Nuevo_genero, 
        Nuevo_telefono, 
        Nuevo_fechaNacimiento 
    } = req.body;

    try{
        const UpadatedUser = await User.updateUser(correo,Nuevo_nombre,Nuevo_apellido,Nuevo_genero,Nuevo_telefono,Nuevo_fechaNacimiento);
        res.status(201).json({
            UpadatedUser
        })
    }catch (error) {
        console.log('error con la actualizacion del usuario', error);
        res.status(500).json({ message: 'error con la actualizacion del usuario', error });
    }
}

export const getFacturasUsuario = async (req: Request, res: Response) =>{
    const { correo } = req.params;
    const{
        columna_ordenamiento,
        direccion_ordenamiento
    } = req.body
    try{
        const FacturasUsuario = await User.getFacturasUsuario(correo,columna_ordenamiento,direccion_ordenamiento);
        res.status(201).json({  
            FacturasUsuario
        });
    }catch (error) {
        // Manejo de errores
        console.log('error de fetch facturas de usuario', error);
        res.status(500).json({ message: 'error con  fetch facturas de usuario', error });
    }
}

export const getTutorialesDeUsuario = async (req: Request, res: Response) =>{
    const { correo } = req.params;
    const{
        columna_ordenamiento,
        direccion_ordenamiento
    } = req.body

    try{
        const tutorialesDelUsuario = await User.getTutorialesDeUsuario(correo,columna_ordenamiento,direccion_ordenamiento);
        res.status(201).json({
            tutorialesDelUsuario
        });
    }catch(error){
        console.log('error con fetch tutoriales del usuario ', error);
        res.status(500).json({ message: 'algo paso mal :(', error });
    }
}

export const restablecerContrasenaAnterior = async (req: Request, res: Response) =>{

    const{correo, contrasenaAnterior, nuevaContrasena} = req.body

    try{
        const validacion = await User.restablecerContrasenaAnteriorS(correo, contrasenaAnterior, nuevaContrasena);
        console.log("data2", validacion);
        res.status(201).json({
            validacion
        });
    }catch(error){        
        const errorInfo = error && typeof error === 'object' 
            ? JSON.stringify(error, null, 2)
            : error?.toString() || 'Error desconocido';
        
        console.error('Informacion del error: ', errorInfo);
        res.status(500).json({
            message: 'Información del error: ', 
            error: errorInfo
        });
    }
}


// export const getUsers = async (req: Request, res: Response) => {
//     try {
//         const users = await User.getUsers();
//         res.status(200).json(users);
//     } catch (error: any) {
//         console.log('error buscando Usuarios', error);
//         res.status(500).send({ message: 'Hubo un error al buscar Usuario', error });
//     }
// };


// export const updateUser = async (req: Request, res: Response) => {
//     try {
//         const {nombre, contrasena, correo } = req.body;
//         const { id } = req.params; 
//         const userId = parseInt(id, 10); 
//         const user = await User.updateUser(userId, nombre, contrasena, correo);
//         res.status(201).json(user); 
//     } catch (error: any) {
//         console.log('error actualizando Usuario', error);
//         res.status(500).json({ message: 'Hubo un error al actualizar Usuario', error });
//     }
// }

// export const deleteUser = async (req: Request, res: Response) => {
//     try {
//         const { id } = req.params; 
//         const userId = parseInt(id, 10); 
//         const user = await User.deleteUser(userId);
//         res.status(201).json(user); 
//     } catch (error: any) {
//         console.log('error eliminando Usuario', error);
//         res.status(500).json({ message: 'Hubo un error al eliminar Usuario', error });
//     }
// }