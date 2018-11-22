import { MESSAGES } from "../../../application/common_files/config";
import { downloadRacesFactory } from "../../../application/logic/network/downloadRaces";

const successResponse = {
  data: [],
  status: 200
};

const validator = jest.fn().mockReturnValue(true) as any;

it("should call correct api endpoint", async done => {
  const networkRequest = jest.fn().mockResolvedValue(successResponse);
  await downloadRacesFactory(networkRequest, validator)();
  expect(networkRequest.mock.calls.length).toBe(1);
  expect(networkRequest.mock.calls[0][0]).toBe("/fetchRaces");
  expect(networkRequest.mock.calls[0][1]).toBe("post");
  done();
});

it("should throw an error if server responded with an error", async done => {
  const networkRequest = jest.fn().mockResolvedValue({
    status: 500,
    errorMessage: "server is unavailable"
  });
  await expect(
    downloadRacesFactory(networkRequest, validator)()
  ).rejects.toEqual(new Error("server is unavailable"));
  done();
});

it("should throw error if data is invalid", async done => {
  const response = {
    data: [{ path: "bad data" }],
    status: 200
  };
  const networkRequest = jest.fn().mockResolvedValue(response);
  const validateRaces = jest.fn().mockReturnValue(false);
  await expect(
    // @ts-ignore
    downloadRacesFactory(networkRequest, validateRaces)()
  ).rejects.toEqual(new Error(MESSAGES[8]));
  expect(validateRaces.mock.calls.length).toBe(1);
  expect(validateRaces.mock.calls[0][0]).toEqual(response.data);
  done();
});

it("should return all races if validation is successful", async done => {
  const response = {
    data: [{ type: "running", path: [] }],
    status: 200
  };
  const networkRequest = jest.fn().mockResolvedValue(response);
  const races = await downloadRacesFactory(networkRequest, validator)();

  expect(races).toEqual(response.data);
  done();
});
