import { sendMailFactory } from "../../application/mail/sendMail";

it("should use proper proper auth options for transporter", async done => {
  const auth = {
    user: "sasha",
    pass: "secret"
  };
  const getMailAuthMock = jest.fn().mockReturnValue(auth);
  const sendMailMock = jest.fn().mockResolvedValue(true);
  const createTransportMock = jest
    .fn()
    .mockReturnValue({ sendMail: sendMailMock });
  await sendMailFactory(getMailAuthMock, createTransportMock)("", "", "");
  expect(createTransportMock.mock.calls.length).toBe(1);
  expect(createTransportMock.mock.calls[0][0]).toEqual({
    service: "gmail",
    auth
  });
  done();
});

it("should forward title, text and email to nodemailer and return result", async done => {
  const sendingResult = {
    success: true
  };
  const title = "nice mail";
  const text = "even better text";
  const destinationEmail = "some@gmail.com";
  const fromEmail = "my@gmail.com";
  const getMailAuthMock = jest
    .fn()
    .mockReturnValue({ user: fromEmail, pass: "" });
  const sendMailMock = jest.fn().mockResolvedValue(sendingResult);
  const createTransportMock = jest
    .fn()
    .mockReturnValue({ sendMail: sendMailMock });
  const mailResult = await sendMailFactory(
    getMailAuthMock,
    createTransportMock
  )(title, text, destinationEmail);
  expect(mailResult).toBe(sendingResult);
  expect(sendMailMock.mock.calls.length).toBe(1);
  expect(sendMailMock.mock.calls[0][0]).toEqual({
    from: fromEmail,
    to: destinationEmail,
    subject: title,
    html: text
  });
  done();
});
