"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
//rutass
const Usuario_router_1 = __importDefault(require("./Routers/Usuario.router"));
const Admin_router_1 = __importDefault(require("./Routers/Admin.router"));
const Producto_router_1 = __importDefault(require("./Routers/Producto.router"));
const Factura_router_1 = __importDefault(require("./Routers/Factura.router"));
const Pagos_router_1 = __importDefault(require("./Routers/Pagos.router"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
//Rutas
app.use('/user', Usuario_router_1.default);
app.use('/admin', Admin_router_1.default);
app.use('/producto', Producto_router_1.default);
app.use('/factura', Factura_router_1.default);
app.use('/pago', Pagos_router_1.default);
//Servidor Raiz.
app.get('/', (req, res) => {
    res.send('Root server is on');
});
//Mensaje de consola que dice que funciona.
app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto: ${port}`);
});
