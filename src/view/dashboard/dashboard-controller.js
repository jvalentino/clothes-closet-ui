import * as httpUtil from "../../util/http-util";

async function load(sessionId, url, timeZone) {
  const endpoint = `${url}/dashboard`;
  const parameters = {
    "x-auth-token": sessionId,
    timeZone: timeZone
  };

  const result = await httpUtil.request(endpoint, "GET", parameters, null);
  console.log(result);
  return result;
}

export { load };
