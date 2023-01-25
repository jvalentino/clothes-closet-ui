import * as inputUtil from "../../util/input-util";
import * as httpUtil from "../../util/http-util";

async function search(date, name, sessionId, url) {
  const parameters = {
    "x-auth-token": sessionId
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

async function getDetails(id, sessionId, url) {
  const endpoint = `${url}/appointment/details?id=${id}&x-auth-token=${sessionId}`;

  const requestOptions = {
    method: "GET"
  };
  const response = await fetch(endpoint, requestOptions);
  const text = await response.text();
  const result = JSON.parse(text);
  return result;
}

async function addPerson(appointmentId, relation, sessionId, url) {
  const endpoint = `${url}/appointment/person?x-auth-token=${sessionId}`;
  const body = {
    appointmentId: appointmentId,
    person: {
      relation: relation
    }
  };
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  };
  const response = await fetch(endpoint, requestOptions);
  const text = await response.text();
  return JSON.parse(text);
}

async function updateAppointment(appointmentId, visits, sessionId, url) {
  const endpoint = `${url}/appointment/update?x-auth-token=${sessionId}`;
  const body = {
    appointmentId: appointmentId,
    visits: visits
  };
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  };
  const response = await fetch(endpoint, requestOptions);
  const text = await response.text();
  return JSON.parse(text);
}

async function cancel(appointmentId, sessionId, url) {
  const endpoint = `${url}/appointment/cancel?id=${appointmentId}&x-auth-token=${sessionId}`;

  const requestOptions = {
    method: "DELETE"
  };
  const response = await fetch(endpoint, requestOptions);
  const text = await response.text();
  const result = JSON.parse(text);
  return result;
}

async function printPdf(appointments, sessionId, url) {
  const ids = [];
  appointments.forEach((appointment) => {
    if (appointment.selected === true) {
      ids.push(appointment.appointmentId);
    }
  });

  const body = {
    ids: ids
  };

  const endpoint = `${url}/appointment/pdf?x-auth-token=${sessionId}`;

  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  };
  const response = await fetch(endpoint, requestOptions);
  const blob = await response.blob();
  return blob;
}

export { search, getDetails, addPerson, updateAppointment, cancel, printPdf };
