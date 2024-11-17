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
exports.Admin = void 0;
const conexion_1 = __importDefault(require("../Utils/conexion"));
class Admin {
    static login(correo, contrasena) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data, error } = yield conexion_1.default.rpc('p_login_admin', { p_correo: correo, p_contrasena: contrasena });
            if (error)
                throw error;
            return data;
        });
    }
    static DetalleOrdenProdcuto(idFactura) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data, error } = yield conexion_1.default.rpc('p_get_detalle_orden_productos', {
                p_id_factura: idFactura
            });
            if (error)
                throw error;
            return data;
        });
    }
    static DetalleOrdenCliente(idFactura) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data, error } = yield conexion_1.default.rpc('p_get_detalle_orden_cliente', {
                p_id_factura: idFactura
            });
            if (error)
                throw error;
            return data;
        });
    }
    static ObtenerOrdenes(idEstado, columna_ordenamiento, direccion_ordenamiento) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data, error } = yield conexion_1.default.rpc('p_get_todas_las_ordenes', {
                p_id_estado_fact: idEstado,
                p_orden_columna: columna_ordenamiento,
                p_orden_direccion: direccion_ordenamiento
            });
            if (error)
                throw error;
            return data;
        });
    }
    static ObtenerEstadosFactura() {
        return __awaiter(this, void 0, void 0, function* () {
            const { data, error } = yield conexion_1.default.rpc('p_obtener_estados_fact');
            if (error) {
                throw error;
            }
            return data;
        });
    }
    static ActualizarEstadoOrden(idOrden, idNuevoEstado) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data, error } = yield conexion_1.default.rpc('p_cambiar_estado_orden', {
                p_id_factura: idOrden,
                p_id_estado_fact: idNuevoEstado
            });
            if (error) {
                throw error;
            }
            return data;
        });
    }
    static Obtener_todos_los_productos_admin() {
        return __awaiter(this, void 0, void 0, function* () {
            const { data, error } = yield conexion_1.default.rpc('p_obtener_todos_los_productos_admin');
            if (error) {
                throw error;
            }
            return data;
        });
    }
    static Obtener_productos_por_categoria_admin(IdCategoria) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data, error } = yield conexion_1.default.rpc('p_obtener_productos_por_categoria_admin', {
                p_id_categoria: IdCategoria
            });
            if (error) {
                throw error;
            }
            return data;
        });
    }
    static CrearProductoSinTallas(nombre_prod, precio, cantidad, descripcion, categorias, imagen_principal, imagen_miniaturas) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data, error } = yield conexion_1.default.rpc('p_create_producto', {
                p_nombre_prod: nombre_prod,
                p_precio: precio,
                p_cantidad_total: cantidad,
                p_descripcion: descripcion,
                p_categorias: categorias,
                p_url_imagen_principal: imagen_principal,
                p_url_imagen_miniaturas: imagen_miniaturas
            });
            if (error) {
                throw new Error(`Error al crear el producto: ${error.message}`);
            }
            return data;
        });
    }
    static CrearProductoConTallas(nombre_prod, descripcion, categorias, imagen_principal, imagen_miniaturas, size_quantities, size_prices) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { data, error } = yield conexion_1.default.rpc('p_create_producto_talla', {
                    p_nombre_prod: nombre_prod, // Convertir ID de tipo a número
                    p_descripcion: descripcion,
                    p_categorias: categorias,
                    p_url_imagen_principal: imagen_principal, // Default a un array vacío si es null
                    p_size_quantities: size_quantities, // Objeto JSON con cantidades por talla
                    p_size_prices: size_prices,
                    p_url_imagen_miniaturas: imagen_miniaturas, // Objeto JSON con precios por talla
                });
                // Manejo de errores
                if (error) {
                    throw new Error(`Error al crear el producto: ${error.message}`);
                }
                // Validar si el procedimiento almacenado devolvió un mensaje de éxito o error
                if (data.codigo !== 1) {
                    throw new Error(`Procedimiento falló: ${data.mensaje}`);
                }
                return {
                    data
                };
            }
            catch (error) {
                console.error(error.message);
                throw new Error(`Error inesperado: ${error.message}`);
            }
        });
    }
    static CrearMaterialSinTallas(nombre_material, precio, cantidad, descripcion, categoria, marca, imagen_principal, imagen_miniaturas) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data, error } = yield conexion_1.default.rpc('p_create_material_sintallas', {
                p_nombre_material: nombre_material,
                p_precio: precio,
                p_cantidad_total: cantidad,
                p_descripcion: descripcion,
                p_categoria: categoria,
                p_marca: marca,
                p_url_imagen_principal: imagen_principal,
                p_url_imagen_miniaturas: imagen_miniaturas, // Enviamos null si no hay miniaturas
            });
            if (error) {
                throw new Error(`Error al crear el material: ${error.message}`);
            }
            return data;
        });
    }
    static CrearMaterialConGrosor(nombre_material, descripcion, marca, imagen_principal, imagen_miniaturas, // Opcional, por defecto vacío
    size_quantities, // JSON de cantidades por grosor
    size_prices // JSON de precios por grosor
    ) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { data, error } = yield conexion_1.default.rpc('p_create_material_grosor', {
                    p_nombre_material: nombre_material,
                    p_descripcion: descripcion,
                    p_marca: marca,
                    p_url_imagen_principal: imagen_principal,
                    p_size_quantities: size_quantities, // Cantidades por grosor
                    p_size_prices: size_prices, // Precios por grosor
                    p_url_imagen_miniaturas: imagen_miniaturas, // Miniaturas (opcional)
                });
                if (error) {
                    throw new Error(`Error al crear el material: ${error.message}`);
                }
                // Verificar el resultado del procedimiento
                if (data.codigo !== 1) {
                    throw new Error(`Procedimiento falló: ${data.mensaje}`);
                }
                return {
                    data
                };
            }
            catch (error) {
                console.error(error.message);
                throw new Error(`Error inesperado: ${error.message}`);
            }
        });
    }
    static ObtenerProductoInfo(IdProducto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data, error } = yield conexion_1.default.rpc('get_producto_admin', {
                p_id_producto: IdProducto,
            });
            if (error) {
                throw error;
            }
            return data;
        });
    }
}
exports.Admin = Admin;
