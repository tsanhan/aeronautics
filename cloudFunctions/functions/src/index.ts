import * as functions from 'firebase-functions';
import { App } from './core';

const cors = require('cors')({ origin: true });

const firebase = App.getInstance();
const firestoreDB = firebase.firestore();

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const addCord: functions.HttpsFunction = functions.https.onRequest(
  (req: functions.https.Request, res: functions.Response<any>) => {
    cors(req, res, async () => {
      if(+req.body.x < 0 || +req.body.x >100 || +req.body.y < 0 || +req.body.y > 100){
        return res.status(422).send("please send data with the right range")
      }
      // Idempotence 😉
      const cord = await firestoreDB.collection('cords')
        .where("x", "==", req.body.x)
        .where("y", "==", req.body.y)
        .where("name", "==", req.body.name)

      const cordData = await cord.get();
 
      if (cordData.empty) {
        await firestoreDB.collection('cords').add(req.body)
        return res.send(`${req.body.name} was added`);
      }

      return res.send(`${req.body.name} allready exist`);
    });
  });
