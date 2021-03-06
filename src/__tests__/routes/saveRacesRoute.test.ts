import { MESSAGES, Race } from "running_app_core";
import { saveRacesRouteFactory } from "../../application/routes/saveRacesRoute";
import { getRequestReponse } from "./registationRoute.test";

const successValidator = (races: unknown): races is ReadonlyArray<Race> => true;

it("should end request if races are not valid", async done => {
  const { request, response, status, end } = getRequestReponse();
  const races = [{ type: "walking", path: [] }];
  request.body.races = races;
  response.locals.user = {};
  const failValidator = jest.fn().mockReturnValue(false);
  // @ts-ignore
  await saveRacesRouteFactory(jest.fn(), failValidator)(
    request,
    response,
    jest.fn()
  );
  expect(failValidator.mock.calls.length).toBe(1);
  expect(failValidator.mock.calls[0][0]).toEqual(races);
  expect(status.mock.calls.length).toBe(1);
  expect(status.mock.calls[0][0]).toBe(403);
  expect(end.mock.calls.length).toBe(1);
  expect(end.mock.calls[0][0]).toBe("races are corrupted");
  done();
});

it("should send 500 error if save was unsuccessful", async done => {
  const { request, response, status, end } = getRequestReponse();
  response.locals.user = { _id: "abaab23" };
  const saveRaces = jest.fn().mockRejectedValue("fail while saving");
  await saveRacesRouteFactory(saveRaces, successValidator)(
    request,
    response,
    jest.fn()
  );
  expect(status.mock.calls.length).toBe(1);
  expect(status.mock.calls[0][0]).toBe(500);
  expect(end.mock.calls.length).toBe(1);
  expect(end.mock.calls[0][0]).toBe(
    "there were some problems saving the races"
  );
  done();
});

it("should call saving  and validating with correct params", async done => {
  const { request, response } = getRequestReponse();
  const races = [{ type: "running", path: [] }];
  request.body.races = races;
  response.locals.user = { _id: "abba126" };
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
  response.locals.user = { _id: "abaab23" };
  const saveRaces = jest.fn().mockResolvedValue("success");
  await saveRacesRouteFactory(saveRaces, successValidator)(
    request,
    response,
    jest.fn()
  );
  expect(status.mock.calls.length).toBe(1);
  expect(status.mock.calls[0][0]).toBe(200);
  expect(end.mock.calls.length).toBe(1);
  expect(end.mock.calls[0][0]).toBe(MESSAGES.raceSavedSuccess);
  done();
});
