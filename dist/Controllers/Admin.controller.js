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
exports.uploadFile = exports.UpdateKit = exports.CreateKit = exports.FiltrarFechasRango = exports.DeleteProducto = exports.ActualizarMaterialConGrosor = exports.ActualizarMaterialSinTallas = exports.ActualizarProductoConTallas = exports.ActualizarProductoSinTallas = exports.ObtenerProductoAdmin = exports.CrearMaterialConGrosor = exports.CrearMaterialSinTallas = exports.CrearProductoConTallas = exports.CrearProductoSinTallas = exports.Obtener_productos_por_categoria_admin = exports.Obtener_productos_admin = exports.ActualizarEstadoOrden = exports.ObtenerEstdosFactura = exports.ObtenerOrdenes = exports.DetalleOrdenCliente = exports.DetalleOrdenProdcuto = exports.LoginAdmin = exports.uploadImage = void 0;
const Admin_model_1 = require("../Models/Admin.model");
const imageKitConfig_1 = __importDefault(require("../Utils/imageKitConfig"));
const uploadToDrive_1 = __importDefault(require("../../uploads/uploadToDrive"));
const uploadImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const file = req.file;
        const fileName = file === null || file === void 0 ? void 0 : file.originalname;
        if (!file) {
            res.status(400).json({ error: 'No se proporcionó ninguna imagen' });
            return;
        }
        // Convertir el archivo a base64
        const base64File = file.buffer.toString('base64');
        const folderPath = '/Fotos'; // 
        const response = yield imageKitConfig_1.default.upload({
            file: base64File, // Archivo en base64
            fileName: fileName || 'default_image_name.jpg', // Nombre del archivo
            folder: folderPath, // Carpeta donde se almacenará la imagen
        });
        const imageUrl = response.url; // La URL de la imagen almacenada
        console.log('Imagen subida con éxito. URL:', imageUrl);
        res.status(200).json({ imageUrl: imageUrl });
    }
    catch (error) {
        console.error('Error al subir la imagen:', error);
        res.status(500).json({ error: 'Error al subir la imagen' });
    }
});
exports.uploadImage = uploadImage;
const LoginAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { correo, contrasena } = req.body;
    try {
        const admin = yield Admin_model_1.Admin.login(correo, contrasena);
        res.status(201).json({
            admin
        });
    }
    catch (error) {
        console.log("error con login", error);
        res.status(500).json({ message: 'Error en el servidor', error });
    }
});
exports.LoginAdmin = LoginAdmin;
const DetalleOrdenProdcuto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { IdOrden } = req.params;
    try {
        const DetalleOrden = yield Admin_model_1.Admin.DetalleOrdenProdcuto(Number(IdOrden));
        res.status(201).json({
            DetalleOrden
        });
    }
    catch (error) {
        console.log("error fetch detalle orden ", error);
        res.status(500).json({ message: 'Error en el servidor', error });
    }
});
exports.DetalleOrdenProdcuto = DetalleOrdenProdcuto;
const DetalleOrdenCliente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { IdOrden } = req.params;
    try {
        const DetalleOrdenCliente = yield Admin_model_1.Admin.DetalleOrdenCliente(Number(IdOrden));
        res.status(201).json({
            DetalleOrdenCliente
        });
    }
    catch (error) {
        console.log("error fetch detalle del con su orden ", error);
        res.status(500).json({ message: 'Error en el servidor', error });
    }
});
exports.DetalleOrdenCliente = DetalleOrdenCliente;
const ObtenerOrdenes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idEstado, columna_ordenamiento, direccion_ordenamiento } = req.body;
    try {
        const ordenes = yield Admin_model_1.Admin.ObtenerOrdenes(idEstado, columna_ordenamiento, direccion_ordenamiento);
        res.status(201).json({
            ordenes
        });
    }
    catch (error) {
        console.log("error fetch de ordenes ", error);
        res.status(500).json({ message: 'Error en el servidor', error });
    }
});
exports.ObtenerOrdenes = ObtenerOrdenes;
const ObtenerEstdosFactura = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Estados = yield Admin_model_1.Admin.ObtenerEstadosFactura();
        res.status(201).json({
            Estados
        });
    }
    catch (error) {
        console.log('error con fetch de Estados de factura', error);
        res.status(500).json({ message: 'algo paso mal :(', error });
    }
});
exports.ObtenerEstdosFactura = ObtenerEstdosFactura;
const ActualizarEstadoOrden = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { IdOrden } = req.params;
    const { IdNuevoEstado } = req.body;
    try {
        const UpdatedOrden = yield Admin_model_1.Admin.ActualizarEstadoOrden(Number(IdOrden), IdNuevoEstado);
        res.status(201).json({
            UpdatedOrden
        });
    }
    catch (error) {
        console.log('error con actualizacion de Estados de factura', error);
        res.status(500).json({ message: 'algo paso mal :(', error });
    }
});
exports.ActualizarEstadoOrden = ActualizarEstadoOrden;
const Obtener_productos_admin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productos = yield Admin_model_1.Admin.Obtener_todos_los_productos_admin();
        res.status(201).json({
            productos
        });
    }
    catch (error) {
        console.log('error con fetch de productos', error);
        res.status(500).json({ message: 'algo paso mal :(', error });
    }
});
exports.Obtener_productos_admin = Obtener_productos_admin;
const Obtener_productos_por_categoria_admin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { IdCategoria } = req.params;
    try {
        const productosConCategoria = yield Admin_model_1.Admin.Obtener_productos_por_categoria_admin(Number(IdCategoria));
        res.status(201).json({
            productosConCategoria
        });
    }
    catch (error) {
        console.log('error con fetch de productos con categorias', error);
        res.status(500).json({ message: 'algo paso mal :(', error });
    }
});
exports.Obtener_productos_por_categoria_admin = Obtener_productos_por_categoria_admin;
const CrearProductoSinTallas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productName, price, stock, description, categories, keywords, mainImage, galleryImages } = req.body;
    try {
        const NewProduct = yield Admin_model_1.Admin.CrearProductoSinTallas(productName, price, stock, description, categories, keywords, mainImage, galleryImages);
        res.status(201).json({
            NewProduct
        });
    }
    catch (error) {
        console.log('Error con la creación del producto', error);
        res.status(500).json({ message: 'Error con la creación del producto', error });
    }
});
exports.CrearProductoSinTallas = CrearProductoSinTallas;
const CrearProductoConTallas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productName, description, categories, keywords, mainImage, galleryImages, sizeQuantities, sizePrices, } = req.body;
    try {
        // Llamar al método definido en la clase Admin
        const NewProduct = yield Admin_model_1.Admin.CrearProductoConTallas(productName, description, categories, keywords, mainImage, galleryImages, sizeQuantities, sizePrices);
        // Respuesta exitosa
        res.status(201).json({
            NewProduct,
        });
    }
    catch (error) {
        // Respuesta con error
        res.status(500).json({
            message: 'Error al crear el producto',
            error: error.message,
        });
    }
});
exports.CrearProductoConTallas = CrearProductoConTallas;
const CrearMaterialSinTallas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productName, price, stock, description, categoryId, keywords, marca, mainImage, galleryImages } = req.body;
    try {
        const NewMaterial = yield Admin_model_1.Admin.CrearMaterialSinTallas(productName, price, stock, description, categoryId, keywords, marca, mainImage, galleryImages);
        res.status(201).json({
            NewMaterial
        });
    }
    catch (error) {
        console.log('Error con la creación del material', error);
        res.status(500).json({ message: 'Error con la creación del material', error });
    }
});
exports.CrearMaterialSinTallas = CrearMaterialSinTallas;
const CrearMaterialConGrosor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productName, description, marca, mainImage, galleryImages, keywords, sizeQuantities, sizePrices } = req.body;
    try {
        const NewMaterial = yield Admin_model_1.Admin.CrearMaterialConGrosor(productName, description, marca, mainImage, galleryImages, keywords, sizeQuantities, sizePrices);
        res.status(201).json({
            NewMaterial
        });
    }
    catch (error) {
        console.log('Error con la creación del material', error);
        res.status(500).json({ message: 'Error con la creación del material', error });
    }
});
exports.CrearMaterialConGrosor = CrearMaterialConGrosor;
const ObtenerProductoAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { IdProducto } = req.params;
    try {
        const productoInfo = yield Admin_model_1.Admin.ObtenerProductoInfo(Number(IdProducto));
        res.status(200).json({
            productoInfo,
        });
    }
    catch (error) {
        console.error('Error al obtener información del producto:', error);
        res.status(500).json({ message: 'Ocurrió un error al obtener la información del producto', error });
    }
});
exports.ObtenerProductoAdmin = ObtenerProductoAdmin;
const ActualizarProductoSinTallas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId } = req.params;
    const { productName, price, stock, description, categories, keywords, mainImage, galleryImages } = req.body;
    try {
        const updatedProduct = yield Admin_model_1.Admin.ActualizarProductoSinTalla(parseInt(productId), productName, price, stock, description, categories, keywords, mainImage, galleryImages);
        res.status(200).json({
            updatedProduct
        });
    }
    catch (error) {
        console.log('Error con la actualización del producto sin tallas', error);
        res.status(500).json({ message: 'Error con la actualización del producto sin tallas', error });
    }
});
exports.ActualizarProductoSinTallas = ActualizarProductoSinTallas;
const ActualizarProductoConTallas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId } = req.params;
    const { productName, description, categories, keywords, mainImage, galleryImages, sizeQuantities, sizePrices, } = req.body;
    try {
        const updatedProduct = yield Admin_model_1.Admin.ActualizarProductoConTallas(parseInt(productId), productName, description, categories, keywords, mainImage, galleryImages, sizeQuantities, sizePrices);
        res.status(200).json({
            codigo: updatedProduct.codigo,
            updatedProduct,
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Error al actualizar el producto con tallas ',
            error: error.message,
        });
    }
});
exports.ActualizarProductoConTallas = ActualizarProductoConTallas;
const ActualizarMaterialSinTallas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { materialId } = req.params;
    const { productName, price, stock, description, categoryId, keywords, marca, mainImage, galleryImages } = req.body;
    try {
        const updatedMaterial = yield Admin_model_1.Admin.ActualizarMaterialSinTallas(parseInt(materialId), productName, price, stock, description, categoryId, keywords, marca, mainImage, galleryImages);
        res.status(200).json({
            updatedMaterial
        });
    }
    catch (error) {
        console.log('Error con la actualización del material sin tallas', error);
        res.status(500).json({ message: 'Error con la actualización del material sin tallas', error });
    }
});
exports.ActualizarMaterialSinTallas = ActualizarMaterialSinTallas;
const ActualizarMaterialConGrosor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { materialId } = req.params;
    const { productName, description, marca, mainImage, galleryImages, keywords, sizeQuantities, sizePrices } = req.body;
    try {
        const updatedMaterial = yield Admin_model_1.Admin.ActualizarMaterialConGrosor(parseInt(materialId), productName, description, marca, mainImage, galleryImages, keywords, sizeQuantities, sizePrices);
        res.status(200).json({
            updatedMaterial
        });
    }
    catch (error) {
        console.log('Error con la actualización del material con grosor', error);
        res.status(500).json({ message: 'Error con la actualización del material con grosor', error });
    }
});
exports.ActualizarMaterialConGrosor = ActualizarMaterialConGrosor;
// export const DeleteProducto = async (req: Request, res: Response) => {
//   const {correo,contrasena } = req.body;
//   const{IdProducto} = req.params;
//   try{
//       const deleteProduct = await Admin.DeleteProducto(parseInt(IdProducto),correo,contrasena);
//       res.status(201).json({ 
//         deleteProduct
//     });
//   }catch(error: any){
//         console.log("error al borrar producto", error);
//         res.status(500).json({ message: 'Error en el servidor', error });
//     }
// }
const DeleteProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { correo } = req.body;
    const { IdProducto } = req.params;
    try {
        const deleteProduct = yield Admin_model_1.Admin.DeleteProducto(parseInt(IdProducto), correo);
        res.status(201).json({
            deleteProduct
        });
    }
    catch (error) {
        console.log("error al borrar producto", error);
        res.status(500).json({ message: 'Error en el servidor', error });
    }
});
exports.DeleteProducto = DeleteProducto;
const FiltrarFechasRango = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { p_fecha_min, p_fecha_max } = req.body;
    try {
        const ordenes = yield Admin_model_1.Admin.OrdenesRangoFecha(p_fecha_min, p_fecha_max);
        res.status(201).json({
            ordenes
        });
    }
    catch (error) {
        console.log("error al obtener las ordenes", error);
        res.status(500).json({ message: 'Error en el servidor', error });
    }
});
exports.FiltrarFechasRango = FiltrarFechasRango;
const CreateKit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre_prod, precio, cantidad_total, descripcion, categorias, keywords, url_patron, url_imagen_principal, url_imagen_miniaturas, url_tutorial } = req.body;
    try {
        const kit = yield Admin_model_1.Admin.CrearKit(nombre_prod, precio, cantidad_total, descripcion, categorias, keywords, url_patron, url_imagen_principal, url_imagen_miniaturas, url_tutorial);
        res.status(201).json({
            kit
        });
    }
    catch (error) {
        console.log("error al crear Kit", error);
        res.status(500).json({ message: 'Error en el servidor', error });
    }
});
exports.CreateKit = CreateKit;
const UpdateKit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_producto } = req.params;
    const { nombre_prod, precio, cantidad_total, descripcion, categorias, keywords, url_patron, url_imagen_principal, url_imagen_miniaturas, url_tutorial } = req.body;
    try {
        const UpdatedKit = yield Admin_model_1.Admin.Updatekit(Number(id_producto), nombre_prod, precio, cantidad_total, descripcion, categorias, keywords, url_patron, url_imagen_principal, url_imagen_miniaturas, url_tutorial);
        res.status(201).json({
            UpdatedKit
        });
    }
    catch (error) {
        console.log("error al actualizar Kit", error);
        res.status(500).json({ message: 'Error en el servidor', error });
    }
});
exports.UpdateKit = UpdateKit;
const uploadFile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.file) {
        res.status(400).json({ message: 'No se proporcionó ningún archivo' });
        return; // Asegúrate de terminar la ejecución con `return`
    }
    const { nombre_archivo } = req.body;
    const uploader = new uploadToDrive_1.default();
    try {
        const fileId = yield uploader.uploadPDF(req.file);
        // Obtener la URL del archivo con el permiso para "Cualquiera con el enlace"
        const fileUrl = uploader.getFileUrl(fileId);
        const registroPDF = yield Admin_model_1.Admin.createPDF(nombre_archivo, fileUrl);
        res.status(200).json({
            message: 'Archivo subido exitosamente',
            fileId: fileId,
            fileUrl: fileUrl, // Retorna la URL del archivo con el enlace compartido
            registroPDF
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Error al subir el archivo',
            error: error instanceof Error ? error.message : 'Error desconocido',
        });
    }
});
exports.uploadFile = uploadFile;
