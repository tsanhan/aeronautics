import * as functions from 'firebase-functions';
import * as admin from "firebase-admin";

export class App {
  static instance: admin.app.App;

  static getInstance() {
    if(!App.instance) {
      App.instance = admin.initializeApp(functions.config().firebase);
    }
    return App.instance;
  }
}
