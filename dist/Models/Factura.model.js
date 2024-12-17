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
exports.Factura = void 0;
const conexion_1 = __importDefault(require("../Utils/conexion"));
class Factura {
    //CARRITO
    static insertarProductoCarrito(correo, idProducto, cantidadCompra, talla, grosor) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data, error } = yield conexion_1.default.rpc('p_insertar_producto_a_carrito', {
                p_correo_usuario: correo,
                p_id_producto: idProducto,
                p_cantidad_compra: cantidadCompra,
                p_talla: talla,
                p_grosor: grosor,
            });
            if (error) {
                throw error;
            }
            return data;
        });
    }
    static actualizarCarrito(correo, nuevaCantidad, idProducto, talla, grosor) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data, error } = yield conexion_1.default.rpc('p_actualizar_carrito', {
                p_correo_usuario: correo,
                p_nueva_cantidad: nuevaCantidad,
                p_id_producto: idProducto,
                p_talla: talla,
                p_grosor: grosor
            });
            if (error) {
                throw error;
            }
            return data;
        });
    }
    static eliminarProductoCarrito(correo, idProducto, talla, grosor) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data, error } = yield conexion_1.default.rpc('p_eliminar_producto_carrito', {
                p_correo_usuario: correo,
                p_id_producto: idProducto,
                p_talla: talla,
                p_grosor: grosor
            });
            if (error) {
                throw error;
            }
            return data;
        });
    }
    static obtenerCarrito(correo) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data, error } = yield conexion_1.default.rpc('p_obtener_carrito', {
                p_correo_usuario: correo
            });
            if (error) {
                throw error;
            }
            return data;
        });
    }
    static obtenerSubtotalImpuestos(correo) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data, error } = yield conexion_1.default.rpc('p_obtener_subtotal_impuestos_carrito', {
                p_correo_usuario: correo
            });
            if (error) {
                throw error;
            }
            return data;
        });
    }
    static obtenerDepartamentos() {
        return __awaiter(this, void 0, void 0, function* () {
            const { data, error } = yield conexion_1.default.rpc('p_obtener_departamentos');
            if (error) {
                throw error;
            }
            return data;
        });
    }
    static obtenerCiudades(id_departamento) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data, error } = yield conexion_1.default.rpc('p_obtener_ciudades', {
                p_id_departamento: id_departamento
            });
            if (error) {
                throw error;
            }
            return data;
        });
    }
    static detalleFactura(id_factura) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data, error } = yield conexion_1.default.rpc('p_get_detalle_factura', {
                p_id_factura: id_factura
            });
            if (error) {
                throw error;
            }
            return data;
        });
    }
    static borrarCarrito(id_factura) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data, error } = yield conexion_1.default.rpc('p_eliminar_carrito', {
                p_id_factura: id_factura
            });
            if (error) {
                throw error;
            }
            return data;
        });
    }
    static guardarPrecioEnvio(id_factura, direccion, id_ciudad, numero) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data, error } = yield conexion_1.default.rpc('p_obtener_envio', {
                p_id_factura: id_factura,
                p_direccion: direccion,
                p_id_ciudad: id_ciudad,
                p_numero: numero
            });
            if (error) {
                throw error;
            }
            return data;
        });
    }
    static ConteoCarrito(correo) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data, error } = yield conexion_1.default.rpc('p_conteo_carrito', {
                p_correo: correo
            });
            if (error) {
                throw error;
            }
            return data;
        });
    }
}
exports.Factura = Factura;
