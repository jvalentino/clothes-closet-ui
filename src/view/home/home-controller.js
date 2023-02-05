import * as inputUtil from "../../util/input-util";
import strings from "../../locale";

async function makeAppointment(body, url) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  };
  const response = await fetch(`${url}/appointment/schedule`, requestOptions);
  const text = await response.text();

  const result = JSON.parse(text);

  // this is what happens when one or more student ids are not eligible
  if (
    result.success == false &&
    result.codes.length != 0 &&
    result.codes[0] == "STUDENT_IDS"
  ) {
    const newMessages = [];
    result.messages.forEach((element) => {
      newMessages.push(
        strings.formatString(strings.errorStudentNotEligible, { id: element })
      );
    });
    result.messages = newMessages;
  }

  if (
    result.success == false &&
    result.codes.length != 0 &&
    result.codes[0] == "BOOKED"
  ) {
    result.messages = [strings.alreadyBooked];
  }

  if (
    result.success == false &&
    result.codes.length != 0 &&
    result.codes[0] == "ALREADY_BEEN"
  ) {
    const newMessages = [];
    result.messages.forEach((element) => {
      const split = element.split(" ");
      const studentId = split[0];
      const iso = split[1];
      const date = inputUtil.prettyDateTimeFromIso(iso);
      newMessages.push(
        strings.formatString(strings.alreadyBeen, {
          id: studentId,
          datetime: date
        })
      );
    });
    result.messages = newMessages;
  }

  return result;
}

function makeNewEvent(startDate, endDate) {
  const newEvent = {
    id: "new-appointment",
    title: "New",
    start: inputUtil.dateToIso8601(startDate),
    end: inputUtil.dateToIso8601(endDate),
    color: "#378006",
    label: inputUtil.prettyDateTimeFromIso(inputUtil.dateToIso8601(startDate)),
    datetimeValue: new Date(inputUtil.dateToIso8601(startDate)).getTime()
  };

  return newEvent;
}

export { makeAppointment, makeNewEvent };
