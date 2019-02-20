import { MESSAGES, Race } from "running_app_core";
import { saveRacesRouteFactory } from "../../application/routes/saveRacesRoute";
import { getRequestReponse } from "./regularRegistation.test";

const failValidator = (races: unknown): races is ReadonlyArray<Race> => false;
const successValidator = (races: unknown): races is ReadonlyArray<Race> => true;

it("should end request if races are not valid", async done => {
  const { request, response, status, end } = getRequestReponse();
  response.locals.userId = "abaab23";
  await saveRacesRouteFactory(jest.fn(), failValidator)(
    request,
    response,
    jest.fn()
  );
  expect(status.mock.calls.length).toBe(1);
  expect(status.mock.calls[0][0]).toBe(403);
  expect(end.mock.calls.length).toBe(1);
  expect(end.mock.calls[0][0]).toBe(MESSAGES[8]);
  done();
});

it("should send 500 error if save was unsuccessful", async done => {
  const { request, response, status, end } = getRequestReponse();
  response.locals.userId = "abaab23";
  const saveRaces = jest.fn().mockRejectedValue("fail while saving");
  await saveRacesRouteFactory(saveRaces, successValidator)(
    request,
    response,
    jest.fn()
  );
  expect(status.mock.calls.length).toBe(1);
  expect(status.mock.calls[0][0]).toBe(500);
  expect(end.mock.calls.length).toBe(1);
  expect(end.mock.calls[0][0]).toBe(MESSAGES[0]);
  done();
});

it("should call saving  and validating with correct params", async done => {
  const { request, response } = getRequestReponse();
  const races = [{ type: "running", path: [] }];
  request.body = races;
  response.locals.userId = "abba126";
  const validator = jest.fn().mockReturnValue(true);
  const saveRaces = jest.fn().mockResolvedValue("success");
  await saveRacesRouteFactory(
    saveRaces,
    // @ts-ignore
    validator
  )(request, response);
  expect(validator.mock.calls.length).toBe(1);
  expect(validator.mock.calls[0][0]).toEqual(races);
  expect(saveRaces.mock.calls.length).toBe(1);
  expect(saveRaces.mock.calls[0][0]).toEqual(races);
  expect(saveRaces.mock.calls[0][1]).toBe("abba126");
  done();
});

it("should send success message on success saving", async done => {
  const { request, response, status, end } = getRequestReponse();
  response.locals.userId = "abaab23";
  const saveRaces = jest.fn().mockResolvedValue("success");
  await saveRacesRouteFactory(saveRaces, successValidator)(
    request,
    response,
    jest.fn()
  );
  expect(status.mock.calls.length).toBe(1);
  expect(status.mock.calls[0][0]).toBe(200);
  expect(end.mock.calls.length).toBe(1);
  expect(end.mock.calls[0][0]).toBe(MESSAGES[1]);
  done();
});
