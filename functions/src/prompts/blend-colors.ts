import * as admin from 'firebase-admin';
import { Api } from '../api';

import { ColorBlender } from '../helpers/color-blender'
import { SimpleResponse } from 'actions-on-google';

const api = new Api(admin.firestore());

export async function blendColors(conv, params) {
  const param1 = params['firstColor'];
  const param2 = params['secondColor'];
  console.log('Input params:', param1, param2)

  const color1 = await api.getColor(param1);
  const color2 = await api.getColor(param2);

  const calcColor3: any = ColorBlender.blendColors(param1, param2, 0.5);
  console.log('Calculated color: ', calcColor3);

  const color3 = await api.getColor(calcColor3);
  console.log('color3:', color3);

  if(!color3) {
    //fallback
    conv.ask('Ik heb helaas niks gevonden');
    return;
  }

  const responseText = {
    text: `Wanneer je deze kleuren mengt, krijg je ${color3.name_nl}`,
    speech: `Wanneer je deze kleuren mengt krijg je ${color3.name_nl}`
  }

  conv.ask(new SimpleResponse(responseText));
}
