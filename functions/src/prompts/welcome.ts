import * as i18n from 'i18n';
import { Suggestions, SimpleResponse } from 'actions-on-google';

export function welcome(conv) {
  if (!conv.user.last.seen) {
    conv.ask(
      new SimpleResponse({
        text: i18n.__('welcome_message'),
        speech: i18n.__('welcome_message_ssml'),
      })
    );
  } else {
    conv.ask(
      new SimpleResponse({
        text: i18n.__('welcome_back_message'),
        speech: i18n.__('welcome_back_message_ssml'),
      })
    );
  }
  conv.ask(new Suggestions('Help'));
}
