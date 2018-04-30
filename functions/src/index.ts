// import * as functions from 'firebase-functions';
process.env.DEBUG = 'actions-on-google:*';

const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

const Assistant = require('actions-on-google').DialogflowApp;
const moment = require('moment');

const Actions = require('./assistant-actions');

import { ColorBlender } from './helpers/color-blender'
import { Api } from './api';

const db = admin.firestore();
const api = new Api(db);

exports.assistant = functions.https.onRequest((request, response) => {
  console.log('headers: ' + JSON.stringify(request.headers));
  console.log('body: ' + JSON.stringify(request.body));

  const assistant = new Assistant({ request: request, response: response });

  const actionMap = new Map();
  // actionMap.set(Actions.ACTION_OPTION_SELECT, handleOption);
  actionMap.set(Actions.ACTION_BLEND_COLOR, blendColors);
  assistant.handleRequest(actionMap);
});

// function handleOption(assistant) {
//   const optionData = assistant.getSelectedOption();
//   console.info('handleOption', optionData);
//   assistant.tell(i18n.__('SPEECH_OPTION_RESPONSE'));
// }

async function blendColors(assistant): Promise<any> {
  const param1 = assistant.getArgument('firstColor');
  const param2 = assistant.getArgument('secondColor');
  console.log('Input params:', param1, param2)

  const color1 = await api.getColor(param1);
  const color2 = await api.getColor(param2);

  const calcColor3: any = ColorBlender.blendColors(param1, param2, 0.5);
  console.log('Calculated color: ', calcColor3);

  const color3 = await api.getColor(calcColor3);
  console.log('color3:', color3);

  if(!color3) {
    //fallback
    assistant.ask('Ik heb helaas geen antwoord gevonden');
    return false;
  }

  const responseText = {
    displayText: `Wanneer je deze kleuren mengt krijg je ${color3.name_nl}`,
    speech: `Wanneer je deze kleuren mengt krijg je ${color3.name_nl}`
  }

  let response = assistant.buildRichResponse().addSimpleResponse(responseText);

  assistant.ask(response);
  return true;
}


