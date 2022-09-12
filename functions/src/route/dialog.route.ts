import express from 'express';
import { DialogLib } from "../controller/dialog-lib.controller";
import * as functions from 'firebase-functions';

const dialogRoute = express.Router();


dialogRoute.get('/', async (req, res) => {
    return res.send("Hola soy un boot de pruebas")
});

dialogRoute.post("/boot", async (req, res) => {
    let resultado: string = "";
    let contexto = '';
    let amount = 0.0;
    let term = 0;
    try {
        contexto = req.body.queryResult.action;
        amount = req.body.queryResult.parameters.amount;
        term = req.body.queryResult.parameters.quota;

        switch (contexto) {
            case "solicitarcredito":
                functions.logger.info("server arriba");
                await DialogLib.callsimulatioBusiness(amount, term).then((respuesta: any) => {
                    resultado = JSON.parse(respuesta);
                   // 
                });
                break;
        }
    } catch (error) {
        return res.status(500).send({
            code: 500,
            error: "Error en la peticon:" + error
        });

    }
    return res.send(resultado);
});

export { dialogRoute };
