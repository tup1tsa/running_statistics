import { MESSAGES } from "../../../application/common_files/config";
import { sendRacesFactory } from "../../../application/logic/network/sendRaces";

const successResponse = {
  status: 200
};
const failResponse = {
  status: 403,
  errorMessage: "something happened"
};
const races = [
  {
    type: "walking",
    path: []
  }
];

it("should not call axios if array of races is empty", async done => {
  const networkRequest = jest.fn();
  const result = await sendRacesFactory(networkRequest)([]);
  expect(networkRequest.mock.calls.length).toBe(0);
  expect(result).toEqual({ success: false, errorMessage: MESSAGES[4] });
  done();
});

it("should call correct uri endpoint and put correct data", async done => {
  const networkRequest = jest.fn().mockResolvedValue(successResponse);
  await sendRacesFactory(networkRequest)(races);
  expect(networkRequest.mock.calls.length).toBe(1);
  const [url, type, data] = networkRequest.mock.calls[0];
  expect(url).toBe("/saveRaces");
  expect(type).toBe("post");
  expect(data).toBe(races);
  done();
});

it("should return true if save was successful", async done => {
  const networkRequest = jest.fn().mockResolvedValue(successResponse);
  const success = await sendRacesFactory(networkRequest)(races);
  expect(success).toEqual({ success: true });
  done();
});

it("should return false if save was unsuccessful and return an error", async done => {
  const networkRequest = jest.fn().mockResolvedValue(failResponse);
  const result = await sendRacesFactory(networkRequest)(races);
  expect(result).toEqual({
    success: false,
    errorMessage: failResponse.errorMessage
  });
  done();
});
