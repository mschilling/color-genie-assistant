require('dotenv/config');

import * as admin from 'firebase-admin';
import { Api } from '../services/api';

const serviceAccount = require('../../creds.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.DATABASE_URL
});

const db = admin.firestore();
const api = new Api(db);

run()
  .then(() => console.log('this will succeed'))
  .catch(err => (err))


async function run(): Promise<boolean> {

  const color = await api.getColor('#ff0000');
  console.log(color);

  const color2 = await api.getColorByName('magenta');
  console.log(color2);

  return true;
}
