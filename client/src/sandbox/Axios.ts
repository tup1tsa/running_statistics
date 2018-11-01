import axios from "axios";

const fakeUrl = "232";

export const sendRequest = async () => {
  let response;

  try {
    response = await axios.get(fakeUrl);
  } catch (e) {
    // tslint:disable-next-line no-console
    console.log(e);
  }
  return response;
};
