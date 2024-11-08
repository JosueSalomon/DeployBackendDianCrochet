import { Request, Response } from 'express';
import axios from 'axios';
import { Pagos } from '../Models/Pagos.model'

const auth = {
    username: process.env.CLIENT_ID || '',
    password: process.env.SECRET_KEY || ''
};

//Conversión de lempiras a dolares
const obtenerConversion = async (from: string, to:string): Promise<number> => {
    try{
        const response = await axios.get(
            `https://api.exchangerate-api.com/v4/latest/${from}`
        );
        const rate = response.data.rates[to];

        if(!rate){
            throw new Error('No se encontró una tasa de cambio');
        }

        return rate;
    } catch (error) {
        console.error("Error obteniendo la tasa de cambio:", error);
        throw new Error("No se pudo obtener la tasa de cambio");
    }
};

const convertirADolar = async (montoHN: number): Promise<number> => {
    const conversionRate = await obtenerConversion('HNL', 'USD');
    return montoHN * conversionRate;
}

// Crear una orden de pago
export const createPayment = async (req: Request, res: Response) => {
    const { total_pago, id_factura } = req.body;
    console.log(id_factura);
    
    if (!total_pago || isNaN(total_pago)) {
        return res.status(400).json({ error: 'Monto inválido o no proporcionado' });
    }

    try {
        const montoEnUSD = await convertirADolar(total_pago);

    const body = {
        intent: 'CAPTURE',
        purchase_units: [
            {
                amount: {
                    currency_code: 'USD',
                    value: montoEnUSD.toFixed(2)
                }
            }
        ],
        application_context: {
            brand_name: 'DianCrochet',
            landing_page: 'NO_PREFERENCE',
            user_action: 'PAY_NOW',
            return_url: `https://deploybackenddiancrochet.onrender.com/pago/obtener/${id_factura}`,
            cancel_url: 'http://localhost:3000/checkout/shop-cart'
        }
    };

        const response = await axios.post(
            `${process.env.PAYPAL_API}/v2/checkout/orders`,
            body,
            {
                auth,
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
        res.json({ data: response.data });
    } catch (error) {
        const errorInfo = error && typeof error === 'object'
            ? JSON.stringify(error, null, 2)
            : error?.toString() || 'Error desconocido';

        console.error('Información del error: ', errorInfo);
        res.status(500).json({
            message: 'Información del error: ', 
            error: errorInfo
        });
    }
};

// Capturar el dinero del pago
export const executePayment = async (req: Request, res: Response) => {
    const id_facturap = Number(req.params.idFactura);
    const token = req.query.token;
    
    if (!token) {
        return res.status(400).json({ error: 'Token de orden no proporcionado' });
    }
    console.log(`${process.env.PAYPAL_API}/v2/checkout/orders/${token}/capture`);
    
    try {
        const response = await axios.post(
            `${process.env.PAYPAL_API}/v2/checkout/orders/${token}/capture`,
            {},
            {
                auth,
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
        const paymentData = response.data;

        const id_orden= paymentData.id;
        const estado_orden= paymentData.status;

        console.log(
            "Datos de la orden:",
            "id_orden:", id_orden,
            "estado_orden:", estado_orden,
            "id_factura:", id_facturap
        );

        const info = await Pagos.executePayment(
            id_orden,
            id_facturap,
            estado_orden
        );


        if (!info) {
            throw new Error('No se pudo guardar la información del pago en la base de datos');
        }
//hola
        res.redirect('http://localhost:3000/products');
    } catch (error) {
        const errorInfo = error && typeof error === 'object'
            ? JSON.stringify(error, null, 2)
            : error?.toString() || 'Error desconocido';

        console.error('Información del error: ', errorInfo);
        res.status(500).json({
            message: 'Información del error: ', 
            error: errorInfo
        });
    }
};
