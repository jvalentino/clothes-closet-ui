import * as httpUtil from "../../util/http-util";
import * as inputUtil from "../../util/input-util";

function validate(date, time) {
  const messages = [];

  if (inputUtil.isBlank(date)) {
    messages.push("Date cannot be blank");
  }

  if (inputUtil.isBlank(time)) {
    messages.push("Time cannot be blank");
  }

  return messages;
}

async function reschedule(appointmentId, datetime, sessionId, url) {
  console.log(`${appointmentId} ${datetime}`);

  const payload = {
    appointmentId: appointmentId,
    datetime: datetime
  };
  console.log(payload);

  const endpoint = `${url}/appointment/reschedule`;
  const parameters = { "x-auth-token": sessionId };
  const result = await httpUtil.request(endpoint, "POST", parameters, payload);
  console.log(result);
  return result;
}

export { validate, reschedule };
