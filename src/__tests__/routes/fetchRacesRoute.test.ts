import { MESSAGES } from "running_app_core";
import { fetchRacesRouteFactory } from "../../application/routes/fetchRacesRoute";
import { getRequestReponse } from "./regularRegistation.test";

it("should send 500 status if db throws", async done => {
  const { request, response, status, end } = getRequestReponse();
  response.locals.userId = "abaab23";
  const fetchRaces = jest.fn().mockRejectedValue("error");
  await fetchRacesRouteFactory(fetchRaces)(request, response, jest.fn());
  expect(status.mock.calls.length).toBe(1);
  expect(status.mock.calls[0][0]).toBe(500);
  expect(end.mock.calls.length).toBe(1);
  expect(end.mock.calls[0][0]).toEqual(MESSAGES[0]);
  done();
});

it("should send correct races", async done => {
  const { request, response, status, end } = getRequestReponse();
  response.locals.userId = "abaab23";
  const race = {
    type: "running",
    path: [{ latitude: 13, longitude: 32, time: 2526 }]
  };
  const fetchRaces = jest.fn().mockReturnValue([race]);
  await fetchRacesRouteFactory(fetchRaces)(request, response, jest.fn());
  expect(fetchRaces.mock.calls.length).toBe(1);
  expect(fetchRaces.mock.calls[0][0]).toBe("abaab23");
  expect(status.mock.calls.length).toBe(1);
  expect(status.mock.calls[0][0]).toBe(200);
  expect(end.mock.calls.length).toBe(1);
  expect(end.mock.calls[0][0]).toEqual([race]);
  done();
});
