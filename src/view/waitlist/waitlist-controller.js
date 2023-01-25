import * as httpUtil from "../../util/http-util";
import * as inputUtil from "../../util/input-util";

async function search(date, name, sessionId, url) {
  const parameters = {
    "x-auth-token": sessionId,
    waiting: true
  };
  const endpoint = `${url}/appointment/search`;

  if (date != null && date != undefined && date != "") {
    const isoDate = inputUtil.monthDayYearToYearMonthDate(date);
    parameters["date"] = isoDate;
  }

  if (name != null && name != "" && name != undefined) {
    parameters["name"] = name;
  }

  const result = await httpUtil.request(endpoint, "GET", parameters, null);

  console.log(result);

  return result;
}

async function deleteAppointment(appointmentId, sessionId, url) {
  const parameters = {
    "x-auth-token": sessionId,
    id: appointmentId
  };
  const result = httpUtil.request(
    `${url}/appointment/cancel`,
    "DELETE",
    parameters,
    null
  );
  console.log(result);
  return result;
}

async function getDetails(appointmentId, sessionId, url) {
  const parameters = {
    "x-auth-token": sessionId,
    id: appointmentId
  };
  const result = await httpUtil.request(
    `${url}/appointment/details`,
    "GET",
    parameters,
    null
  );
  console.log(result);
  return result;
}

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

export { search, deleteAppointment, getDetails, generateTimeStrings };
