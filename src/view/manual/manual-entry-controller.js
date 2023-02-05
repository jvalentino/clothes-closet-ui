import * as httpUtil from "../../util/http-util";

async function makeAppointment(body, url, sessionId) {
  const parameters = {
    "x-auth-token": sessionId
  };
  const result = await httpUtil.request(
    `${url}/appointment/admin/schedule`,
    "POST",
    parameters,
    body
  );
  return result;
}

export { makeAppointment };
