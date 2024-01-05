import * as httpUtil from "./http-util";
import * as inputUtil from "./input-util";
import { isPossiblePhoneNumber } from "react-phone-number-input";
import validator from "validator";
import strings from "../locale";

async function getSettings(url) {
  return httpUtil.request(`${url}/appointment/settings`, "GET", {}, null);
}

function assembleAppointmentPayload(
  datetime,
  language,
  phoneNumber,
  students,
  elements
) {
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
      grade: elements[`student-grade-${i}`].value,
      sizeType: elements[`student-size-${i}`].value,
      shoeSize: elements[`student-shoe-size-${i}`].value,
      underwearSize: elements[`student-underwear-size-${i}`].value
    };
    body.students.push(student);
  }

  return body;
}

function validateAppointmentPayload(body) {
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

export { getSettings, assembleAppointmentPayload, validateAppointmentPayload };
