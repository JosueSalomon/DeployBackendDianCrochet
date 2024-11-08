"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const conexion_1 = __importDefault(require("../Utils/conexion"));
class User {
    static createUser(nombre, apellido, correo, genero, contrasena, telefono, fechaNacimiento, // Formato 'YYYY-MM-DD'
    codigoVeri, descripcion) {
        return __awaiter(this, void 0, void 0, function* () {
            // Llama al procedimiento almacenado
            const { data, error } = yield conexion_1.default.rpc('p_insert_usuario_verificacion', {
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
        });
    }
    static updateVerification(correo, codigoVeri) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data, error } = yield conexion_1.default.rpc('p_verify_code', {
                p_email: correo,
                p_code: codigoVeri
            });
            if (error) {
                throw error;
            }
            return data;
        });
    }
    static nuevoCodigo(correo, codigoVeri) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data, error } = yield conexion_1.default.rpc('p_generar_nuevo_codigo', {
                p_email: correo,
                p_code: codigoVeri
            });
            if (error) {
                throw error;
            }
            return data;
        });
    }
    static login(contrasena, correo) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data, error } = yield conexion_1.default.rpc('p_login', { p_contrasena: contrasena, p_correo: correo });
            if (error)
                throw error;
            return data;
        });
    }
    static restablecerNuevaContrasena(correo, nuevaContrasena) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data, error } = yield conexion_1.default.rpc('p_restablecer_contrasena', { p_correo: correo, p_nueva_contrasena: nuevaContrasena });
            if (error)
                throw error;
            return data;
        });
    }
    static insertarValidacionRestablecerContrasena(correo, codigo) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data, error } = yield conexion_1.default.rpc('p_insertar_verificacion_restablecer_contrasena', { p_correo: correo, p_codigo_veri: codigo });
            if (error)
                throw error;
            return data;
        });
    }
    static contrasenaSegura(contrasena) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data, error } = yield conexion_1.default.rpc('p_contrasena_segura', { v_contrasena: contrasena });
            if (error)
                throw error;
            return data;
        });
    }
    static actualizarFoto(correo, nuevaURL) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data, error } = yield conexion_1.default.rpc('p_actualizar_foto', {
                p_correo: correo,
                p_nueva_url_imagen: nuevaURL
            });
            if (error)
                throw error;
            return data;
        });
    }
    static getDetalleUsuario(correo) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data, error } = yield conexion_1.default.rpc('p_get_usuario', {
                p_correo: correo
            });
            if (error)
                throw error;
            return data;
        });
    }
    static updateUser(correo, nuevo_nombre, nuevo_apellido, nuevo_genero, nuevo_telefono, nueva_fecha_nacimiento) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data, error } = yield conexion_1.default.rpc('p_actualizar_usuario', {
                p_correo: correo,
                p_nuevo_nombre: nuevo_nombre,
                p_nuevo_apellido: nuevo_apellido,
                p_nuevo_genero: nuevo_genero,
                p_nuevo_telefono: nuevo_telefono,
                p_nueva_fecha_nacimiento: nueva_fecha_nacimiento,
            });
            if (error)
                throw error;
            return data;
        });
    }
    static getFacturasUsuario(correo, columna_ordenamiento, direccion_ordenamiento) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data, error } = yield conexion_1.default.rpc('p_get_facturas_usuario', {
                p_correo: correo,
                p_columna_ordenamiento: columna_ordenamiento,
                p_direccion_ordenamiento: direccion_ordenamiento
            });
            if (error)
                throw error;
            return data;
        });
    }
    static getTutorialesDeUsuario(correo, columna_ordenamiento, direccion_ordenamiento) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data, error } = yield conexion_1.default.rpc('p_buscar_videos_por_usuario', {
                p_correo: correo,
                p_columna_ordenamiento: columna_ordenamiento,
                p_direccion_ordenamiento: direccion_ordenamiento
            });
            if (error)
                throw error;
            return data;
        });
    }
    static restablecerContrasenaAnteriorS(correo, contrasenaAnterior, nuevaContrasena) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data, error } = yield conexion_1.default.rpc('p_restablecer_contrasena_anterior', {
                p_correo: correo,
                p_nueva_contrasena: nuevaContrasena,
                p_contrasena_anterior: contrasenaAnterior
            });
            console.log("data1", data);
            if (error)
                throw error;
            return data;
        });
    }
}
exports.User = User;
