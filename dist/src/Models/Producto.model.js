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
exports.Producto = void 0;
const conexion_1 = __importDefault(require("../Utils/conexion"));
class Producto {
    static filtrarProductosPorPrecioYCategoria(tipo_prod, categorias, min_precio, max_precio) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data, error } = yield conexion_1.default.rpc('p_filtrar_productos_por_categoria_y_precio', {
                p_tipo_prod: tipo_prod,
                p_categorias: categorias,
                p_min_precio: min_precio,
                p_max_precio: max_precio
            });
            if (error) {
                throw error;
            }
            return data;
        });
    }
    static getCategorias() {
        return __awaiter(this, void 0, void 0, function* () {
            const { data, error } = yield conexion_1.default.rpc('p_obtener_todas_las_categorias');
            if (error) {
                throw error;
            }
            return data;
        });
    }
    static OrdenarProductosPorPrecioYCateogira(tipo_prod, categorias, min_precio, max_precio, columna_ordenamiento, direccion_ordenamiento) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data, error } = yield conexion_1.default.rpc('p_ordenar_productos_por_categoria_y_precio', {
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
        });
    }
    static filtrarOrdenarPorPopularidad(idTipoProducto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data, error } = yield conexion_1.default.rpc('p_filtrar_ordenar_por_popularidad', {
                p_id_tipo_producto: idTipoProducto
            });
            if (error) {
                throw error;
            }
            console.log(data);
            return data;
        });
    }
    static SugerirProductos(id_Producto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data, error } = yield conexion_1.default.rpc('p_get_similar_products', {
                p_id_producto: id_Producto
            });
            if (error) {
                throw error;
            }
            return data;
        });
    }
    static GetDetalleProducto(id_Producto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data, error } = yield conexion_1.default.rpc('get_producto_info', {
                p_id_producto: id_Producto
            });
            if (error) {
                throw error;
            }
            return data;
        });
    }
    static getProductosRandom(tipo_prod) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data, error } = yield conexion_1.default.rpc('p_productos_desroden', {
                p_tipo_prod: tipo_prod
            });
            if (error) {
                throw error;
            }
            return data;
        });
    }
    static getCategoriasMateriales() {
        return __awaiter(this, void 0, void 0, function* () {
            const { data, error } = yield conexion_1.default.rpc('p_obtener_todas_las_categorias_materiales');
            if (error) {
                throw error;
            }
            return data;
        });
    }
    static OrdenarMaterialesPorPrecioYCateogira(tipo_prod, categorias, min_precio, max_precio, columna_ordenamiento, direccion_ordenamiento) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data, error } = yield conexion_1.default.rpc('p_ordenar_materiales_por_categoria_y_precio', {
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
        });
    }
}
exports.Producto = Producto;
