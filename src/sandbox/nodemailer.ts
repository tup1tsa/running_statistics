import { createTransport } from "nodemailer";

const transporter = createTransport({
  service: "gmail",
  auth: {
    user: "natorvano.work@gmail.com",
    pass: ""
  }
});

const mailOptions = {
  from: "natorvano.work@gmail.com",
  to: "alexandr.grin@clockwise.software",
  subject: "statistics for 2019-th year",
  html: "You have run for a long time in that year 13.10"
};

// tslint:disable-next-line
const log = (...values: any[]) => console.log(values);

transporter
  .sendMail(mailOptions)
  .then(result => log("all is fine", result))
  .catch(err => log("something went wrong", err));

// const resultExample = {
//   accepted: ["alexandr.grin@clockwise.software"],
//   rejected: [],
//   envelopeTime: 310,
//   messageTime: 743,
//   messageSize: 340,
//   response: "250 2.0.0 OK  1550834673 d25sm459570lji.9 - gsmtp",
//   envelope: { from: "natorvano.work@gmail.com", to: [Array] },
//   messageId: "<251d4905-9cdd-05ef-b7d2-c04acbf9152a@gmail.com>"
// };
