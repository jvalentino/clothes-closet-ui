import * as inputUtil from '../../util/input-util';

async function loadSettings(sessionId, url) {
    let endpoint = `${url}/settings`
    endpoint += `?x-auth-token=${sessionId}`;

    const requestOptions = {
        method: 'GET'
    };
    const response = await fetch(endpoint, requestOptions);
    const text = await response.text();
    const results = JSON.parse(text);
    return results;
}

function validateAdd(payload) {
    const messages = [];

    if (inputUtil.isBlank(payload.label)) {
        messages.push("Label cannot be blank");
    }

    return messages;
}

async function submitAdd(payload, sessionId, url) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    };
    console.log(payload);
    const response = await fetch(`${url}/settings?x-auth-token=${sessionId}`,requestOptions);
    const text = await response.text();

    const result =  JSON.parse(text);

    return result;

}

async function deleteSettings(settingsId, sessionId, url) {
    const requestOptions = {
        method: 'POST',
    };
    const response = await fetch(`${url}/settings/delete?x-auth-token=${sessionId}&id=${settingsId}`,requestOptions);
    const text = await response.text();

    const result =  JSON.parse(text);

    return result;
}

export {
    loadSettings,
    validateAdd,
    submitAdd,
    deleteSettings,
}