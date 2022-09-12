import { ApiServicesExtern } from '../services/api-external.services';
import * as functions from 'firebase-functions';

export class DialogLib {
   static  resSimulation(rate: number, quota: number) {
   
        const quotaFormat = quota.toLocaleString('es', { style: 'currency', currency: 'COP' });
        let response = JSON.stringify({
            "allRequiredParamsPresent": true,
            "fulfillmentMessages": [
                {
                    "text": {
                        "text": [
                            "Para el monto solicitado la tasa de interes es de : ".concat(rate.toString()).concat(" con una cuota de: " + quotaFormat)
                        ]
                    },
                    "platform": "TELEGRAM"
                },
                {
                    "text": {
                        "text": [
                            "Para el monto solicitado la tasa de interes es de : ".concat(rate.toString()).concat(" con una cuota de: " + quotaFormat)
                        ]
                    }
                }
            ]
        });
        return response;
    }

   static callsimulatioBusiness(value: number, term: number):Promise<any> {
   
        return new Promise((resolve, reject) => {
            ApiServicesExtern.callSimulation(value, term).then((respuesta:any) => {

                let resulado = this.resSimulation(respuesta.rate, respuesta.quota);
                resolve(resulado);
                          //return resulado;
            }).catch((error: any) => {
                functions.logger.info(error);
                reject(error)
            });

        });
    }
}


