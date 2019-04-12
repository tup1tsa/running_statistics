import * as sgMail from "@sendgrid/mail";

const key =
  "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";

sgMail.setApiKey(key);
const message = {
  to: "alexandr.grin@clockwise.software",
  from: "natorvano@gmail.com",
  subject: "email verification",
  html:
    'In order to verificate your account click <a href="google.com">here</a>'
};
// tslint:disable-next-line no-console
sgMail.send(message).then(console.log, err => console.log(err.response.body));
