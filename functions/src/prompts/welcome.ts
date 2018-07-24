import { Suggestions, SimpleResponse } from 'actions-on-google';

export function welcome(conv) {
  if (!conv.user.last.seen) {
    conv.ask(
      new SimpleResponse({
        text: "Hi, I'm here to help",
        speech: "Hi, I'm here to help",
      })
    );
  } else {
    conv.ask(
      new SimpleResponse({
        text: "Hi, welcome back. How can I help?",
        speech: "Hi, welcome back. How can I help?",
      })
    );
  }
  conv.ask(
    new Suggestions('Help')
  );
}
