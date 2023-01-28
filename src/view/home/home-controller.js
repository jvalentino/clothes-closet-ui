import { isPossiblePhoneNumber } from "react-phone-number-input";
import * as inputUtil from "../../util/input-util";
import strings from "../../locale";

import validator from "validator";

async function getSettings(url) {
  const response = await fetch(`${url}/appointment/settings`);
  const text = await response.text();
  return JSON.parse(text);
}

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

function validate(body) {
  const messages = [];

  if (
    inputUtil.isBlank(body.guardian.email) ||
    !validator.isEmail(body.guardian.email)
  ) {
    messages.push(strings.errorEmail);
  }

  if (inputUtil.isBlank(body.guardian.firstName)) {
    messages.push(strings.errorFirstName);
  }

  if (inputUtil.isBlank(body.guardian.lastName)) {
    messages.push(strings.errorLastName);
  }

  if (!isPossiblePhoneNumber(`${body.guardian.phoneNumber}`)) {
    messages.push(strings.errorPhoneNumber);
  }

  for (let i = 0; i < body.students.length; i++) {
    const student = body.students[i];
    const number = i + 1;

    if (inputUtil.isBlank(student.studentId)) {
      messages.push(
        strings.formatString(strings.errorStudentId, { number: number })
      );
    }
  }

  return messages;
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

function assemblePayload(datetime, language, phoneNumber, students, elements) {
  const body = {
    datetime: datetime,
    locale: language,
    waitlist: false,
    guardian: {
      email: elements.email.value,
      firstName: elements.firstName.value,
      lastName: elements.lastName.value,
      phoneNumber: phoneNumber,
      phoneTypeLabel: elements.phoneTypeLabel.value
    },
    students: []
  };

  if (inputUtil.isBlank(body.datetime)) {
    body.waitlist = true;
  }

  for (let i = 1; i <= students.length; i++) {
    const student = {
      studentId: elements[`student-id-${i}`].value,
      school: elements[`student-school-${i}`].value,
      gender: elements[`student-gender-${i}`].value,
      grade: elements[`student-grade-${i}`].value
    };
    body.students.push(student);
  }

  return body;
}

export {
  getSettings,
  makeAppointment,
  validate,
  makeNewEvent,
  assemblePayload
};
