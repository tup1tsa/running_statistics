import { sendRacesFactory } from "../../../application/logic/network/sendRaces";

describe("sending races to server logic", () => {
  const successResponse = {
    status: 200,
    data: { saved: true }
  };
  const failResponse = {
    status: 200,
    data: { saved: false }
  };
  const unexpectedResponse = {
    response: {
      status: 404
    }
  };
  const races = [
    {
      type: "walking",
      path: []
    }
  ];

  it("should not call axios if array of races is empty", async done => {
    const axios = {
      get: jest.fn(),
      post: jest.fn()
    };
    await sendRacesFactory(axios)([]);
    expect(axios.post.mock.calls.length).toBe(0);
    done();
  });

  it("should call correct uri endpoint and put correct data", async done => {
    const axios = {
      get: jest.fn(),
      post: jest.fn().mockResolvedValueOnce(successResponse)
    };
    await sendRacesFactory(axios)(races);
    expect(axios.post.mock.calls.length).toBe(1);
    const [url, data] = axios.post.mock.calls[0];
    expect(url).toBe("/saveRaces");
    expect(data).toBe(races);
    done();
  });

  it("should return true if save was successful and false otherwise", async done => {
    const axios = {
      get: jest.fn(),
      post: jest
        .fn()
        .mockResolvedValueOnce(successResponse)
        .mockResolvedValueOnce(failResponse)
        .mockResolvedValueOnce(unexpectedResponse)
    };
    const success = await sendRacesFactory(axios)(races);
    const expectedFail = await sendRacesFactory(axios)(races);
    const unexpectedFail = await sendRacesFactory(axios)(races);
    expect(success).toBe(true);
    expect(expectedFail).toBe(false);
    expect(unexpectedFail).toBe(false);
    done();
  });
});
