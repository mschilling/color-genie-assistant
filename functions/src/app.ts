import * as i18n from 'i18n';
import { dialogflow } from 'actions-on-google';
import { blendColors } from './prompts/blend-colors';

import nlData from './locales/nl-NL.json'; // include languages
import enData from './locales/en-US.json'; // include languages
import { welcome } from './prompts/welcome';

const moment = require('moment');

i18n.configure({
  locales: ['en-US', 'nl-NL'],
  directory: __dirname + '/locales',
  defaultLocale: 'nl-NL',
});

const app = dialogflow({
  debug: true,
  init: () => ({
    data: {
      fallbackCount: 0,
      noInputCount: 0,
      noInputResponses: [],
      fallbackResponses: [],
      currentItems: [],
      nextItems: [],
      sessionType: null,
      sessionShown: null,
      sessionsTag: null,
      tagId: null,
    },
  }),
});

app.middleware(conv => {
  if (conv.user) {
    i18n.setLocale(conv.user.locale);
    moment.locale(conv.user.locale);
  } else {
    console.log(
      "conv.user is null, so don't init i18n and moment with default locale"
    );
  }
});

app.intent('Default Welcome Intent', welcome);
app.intent('blend_colors', blendColors);

export { app };
