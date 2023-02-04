import * as httpUtil from "../../util/http-util";
import * as inputUtil from "../../util/input-util";

function generateTimeStrings() {
  const results = [];

  for (let i = 6; i < 12; i++) {
    results.push(`${i}:00:00 AM`);
    results.push(`${i}:30:00 AM`);
  }

  results.push(`12:00:00 PM`);
  results.push(`12:30:00 PM`);

  for (let i = 1; i < 12; i++) {
    results.push(`${i}:00:00 PM`);
    results.push(`${i}:30:00 PM`);
  }

  return results;
}

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

async function reschedule(
  appointmentId,
  date,
  time,
  sessionId,
  url,
  timezoneOffsetHours
) {
  console.log(`${appointmentId} ${date} ${time}`);
  const isoPart1 = inputUtil.monthDayYearToYearMonthDate(date);

  const isoPart2 = inputUtil.amPmTimeToIso(time, timezoneOffsetHours);

  const isoDateTime = `${isoPart1}T${isoPart2}`;

  const payload = {
    appointmentId: appointmentId,
    datetime: isoDateTime
  };
  console.log(payload);

  const endpoint = `${url}/appointment/reschedule`;
  const parameters = { "x-auth-token": sessionId };
  const result = await httpUtil.request(endpoint, "POST", parameters, payload);
  console.log(result);
  return result;
}

export { generateTimeStrings, validate, reschedule };
