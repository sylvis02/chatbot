import express from "express";
import { dialogRoute } from "./route/dialog.route"
import * as functions from 'firebase-functions';


const bodyParser = require('body-parser');
const local = false;
const app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.use(dialogRoute);
//export const helloWorld = functions.https.onRequest((request, response) => {
//functions.logger.info("Hello logs!", { structuredData: true });
//response.send("Hello from Firebase!");
//});
if (local) {
  app.listen(process.env.PORT || 8000, () => {
   // console.log('Servidor funcionando');
   functions.logger.info("server arriba");
   // console.log("  Press CTRL-C to stop\n");
  });
}else{
  exports.app = functions.https.onRequest(app);
}


export default app;                     