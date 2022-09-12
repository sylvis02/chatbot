//Llama a una funcion y crea una promesa de lo que contine
import * as functions from 'firebase-functions';

const { request } = require('http');
const x_api_key = "ID_gxTDyzcjENWGKrbKvmCbh9BhByKrjvzqke92Ew5wHFp4vGiqckXFwjnGrmbmbV3a5pJuwhThtEeSzVeTStx5Zfjc9FVfbQA8Ha6iCBPyTLZvzuG7c6TLtzgKu755ditPPzGDhXaziVRP326ZAPizNn23jMdigrqZ9G9FJFLCRXjmu8343yxKe8yFCtyUtrhmUdk9jfgXSWBBwXDfKe4bH4etLgHte6Hb4fEZpYUPxDTueT6WcYfjWRnHJyW2BVtcZBvEq2nhpqkDXnpJtdhP4hUdQMTXbd3CTTPvyf9zWjg4";
const timestamp = "1599350224561";
const authorization = "APLI3e7252db19db7296d84cc9950be9ab3216401ed1350d8a27ed6562904e16527b";
const channel = 1;
const userId = 1;

export class ApiServicesExtern {

    static callSimulation(value:number, term:number):Promise<any> {
      
        return new Promise((resolve, reject) => {

            const simulationData = JSON.stringify({
                "product": 3,
                "value": value,
                "term": term
            });
            const simulationHeader = {
                host: '18.116.127.29',
                port: 9080,
                path: '/ProxyCoreTCWS/webresources/simulation/getSimulationPayment',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Content-Length': Buffer.byteLength(simulationData),
                    'x-api-key': x_api_key,
                    'timestamp': timestamp,
                    'Authorization': authorization,
                    'channel': channel,
                    'userId': userId

                }
            };
            const req = request(simulationHeader, (res:any) => {
                functions.logger.info("TATUS: "+ res.statusCode);
                //console.log('STATUS:' + res.statusCode);
                let respuestaCompleta = '';
                let respuestaJSON = ''
                res.setEncoding('utf8');
                res.on('data', (chunk:any) => {
                    respuestaCompleta = chunk;
                });
                res.on('end', () => {
                    try {
                        functions.logger.info('No more data in response')
                        //console.log('No more data in response');
                        respuestaJSON = JSON.parse(respuestaCompleta);
                        resolve(respuestaJSON);
                    } catch (error) {
                        reject(error);
                    }

                });
            });
            req.on('error', (e:any) => {
                functions.logger.info('problem with request:${e.message}' + e)
                //console.error('problem with request:${e.message}' + e)
                reject(e);
            });
            req.write(simulationData);
            req.end();
        });
    }
}