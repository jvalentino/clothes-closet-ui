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

    return JSON.parse(text);
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

        if (inputUtil.isBlank(student.id)) {
            messages.push(strings.formatString(strings.errorStudentId, {number: number}));
        }
    }

    return messages;
}

export { getSettings, makeAppointment, validate};