import { Response } from "../../application/common_files/interfaces";
import { downloadRaces } from "../../application/network/downloadRaces";

describe("download races logic", () => {
  const successResponse: Response = {
    data: [],
    status: 200
  };

  it("should call correct api endpoint", async done => {
    const axios = {
      get: jest.fn(),
      post: jest.fn().mockResolvedValue(successResponse)
    };
    await downloadRaces(axios, jest.fn());
    expect(axios.post.mock.calls.length).toBe(1);
    expect(axios.post.mock.calls[0][0]).toBe("/fetchRaces");
    done();
  });

  it("should throw an error if server responded with an error", async done => {
    const badStatus: Response = {
      status: 404
    };
    const wrongData: Response = {
      status: 200,
      data: "invalid data"
    };
    const axios = {
      get: jest.fn(),
      post: jest
        .fn()
        .mockResolvedValueOnce(badStatus)
        .mockResolvedValueOnce(wrongData)
    };
    await expect(downloadRaces(axios, jest.fn())).rejects.toEqual(
      new Error("server is not available")
    );
    await expect(downloadRaces(axios, jest.fn())).rejects.toEqual(
      new Error("data is invalid")
    );
    done();
  });

  it("should return only valid races", async done => {
    const response: Response = {
      data: [{ path: "correct" }, { path: "incorrect" }],
      status: 200
    };
    const axios = {
      get: jest.fn(),
      post: jest.fn().mockResolvedValueOnce(response)
    };
    const validatePath = jest
      .fn()
      .mockReturnValueOnce(true)
      .mockReturnValue(false);
    const races = await downloadRaces(axios, validatePath);
    expect(races).toEqual([{ path: "correct" }]);
    done();
  });
});
