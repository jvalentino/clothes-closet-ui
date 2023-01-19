import { isPossiblePhoneNumber } from 'react-phone-number-input'
import * as inputUtil from '../../util/input-util';
import strings from "../../locale";

import validator from 'validator'

async function getSettings() {
    const response = await fetch(`${process.env.REACT_APP_HTTP_API}/appointment/settings`);
    const text = await response.text();
    return JSON.parse(text);
}

async function makeAppointment(body) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    };
    const response = await fetch(`${process.env.REACT_APP_HTTP_API}/appointment/schedule`,requestOptions);
    const text = await response.text();

    const result =  JSON.parse(text);

    // this is what happens when one or more student ids are not eligible
    if (result.success == false && result.codes.length != 0 && result.codes[0] == 'STUDENT_IDS') {
        const newMessages = [];
        result.messages.forEach(element => {
            newMessages.push(strings.formatString(strings.errorStudentNotEligible, {id: element}))
        });
        result.messages = newMessages;
    }

    if (result.success == false && result.codes.length != 0 && result.codes[0] == 'BOOKED') {
        result.messages = [strings.alreadyBooked];
    }

    if (result.success == false && result.codes.length != 0 && result.codes[0] == 'ALREADY_BEEN') {
        const newMessages = [];
        result.messages.forEach(element => {
            const split = element.split(" ");
            const studentId = split[0];
            const iso = split[1];
            const date = inputUtil.prettyDateTimeFromIso(iso);
            newMessages.push(strings.formatString(strings.alreadyBeen, {id: studentId, datetime:date}));
        });
        result.messages = newMessages;
    }

    return result;
}

function validate(body) {
    const messages = [];

    if (inputUtil.isBlank(body.datetime)) {
        messages.push(strings.errorApptTime);
    }

    if (!validator.isEmail(body.guardian.email)) {
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
            messages.push(strings.formatString(strings.errorStudentId, {number: number}));
        }
    }

    return messages;
}

export { getSettings, makeAppointment, validate};