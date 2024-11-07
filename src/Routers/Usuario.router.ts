import  express from 'express';
import {crearUsuarioYEnviarCorreo, ValidarCorreo, nuevoCodigo, login, correoRestablecerContrasena, 
        restablecerNuevaContrasena, establecerContrasenaSegura, UpdateFoto, getUsuario, updateUser,
        getFacturasUsuario, getTutorialesDeUsuario, restablecerContrasenaAnterior} from '../Controllers/Usuario.controller';
const router = express.Router();

router.post('/crear', crearUsuarioYEnviarCorreo);
router.put('/validar/registro', ValidarCorreo);
router.put('/nuevo/codigo', nuevoCodigo);
router.post('/login', login);
router.put('/correo/restablecer/contrasena', correoRestablecerContrasena);
router.put('/validar/correo', ValidarCorreo);
router.put('/restablecer/contrasena', restablecerNuevaContrasena);
router.post('/contrasena/segura', establecerContrasenaSegura);
router.put('/actualizar/foto/:correo', UpdateFoto);
router.get('/detalle/:correo', getUsuario);
router.put('/actualizar/:correo', updateUser);
router.post('/facturas/:correo', getFacturasUsuario);
router.post('/tutoriales/:correo', getTutorialesDeUsuario);
router.put('/restablecer/contrasena/anterior', restablecerContrasenaAnterior);




// router.delete('/delete/:id', deleteUser);
// router.get('/login', loginUser);
// router.post('/sendEmail', EnviarCorreo);
// router.get('/', getUsers);
//router.put('/ValidarCorreo', ValidarCorreo);
// router.delete('/delete/:id', deleteUser);


export default router;