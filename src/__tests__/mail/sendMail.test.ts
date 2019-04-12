import { sendMailFactory } from "../../application/mail/sendMail";

const mailServiceMock = {
  setApiKey: jest.fn(),
  send: jest.fn()
};
const processEnvMock = {
  SEND_GRID_API_KEY: "some key"
};

it("should set proper api key", async done => {
  const processEnv = {
    SEND_GRID_API_KEY: "KEY"
  };
  const setApiKey = jest.fn();
  const mailService = { ...mailServiceMock, setApiKey };
  await sendMailFactory(processEnv, mailService)("", "", "");
  expect(setApiKey.mock.calls.length).toBe(1);
  expect(setApiKey.mock.calls[0][0]).toEqual("KEY");
  done();
});

it("should throw if api key is not defined", async done => {
  try {
    await sendMailFactory({}, mailServiceMock)("", "", "");
  } catch (err) {
    expect(err.message).toBe("send grid api key is not defined");
    done();
  }
});

it("should forward title, text and email to mail service and return result", async done => {
  const sendingResult = {
    success: true
  };
  const title = "nice mail";
  const text = "even better text";
  const destinationEmail = "some@gmail.com";
  const sendMail = jest.fn().mockResolvedValue(sendingResult);
  const mailService = { ...mailServiceMock, send: sendMail };
  const mailResult = await sendMailFactory(processEnvMock, mailService)(
    title,
    text,
    destinationEmail
  );
  expect(mailResult).toBe(sendingResult);
  expect(sendMail.mock.calls.length).toBe(1);
  expect(sendMail.mock.calls[0][0]).toEqual({
    from: "natorvano@gmail.com",
    to: destinationEmail,
    subject: title,
    html: text
  });
  done();
});
