
async function search(date, name, sessionId, url) {
    let endpoint = `${url}/appointment/search?`;

    console.log(`session id is ${sessionId}`);

    if (date != null && date != undefined && date != '') {
        const split = date.split('/');
        const isoDate = `${split[2]}-${split[0]}-${split[1]}`;
        endpoint += `date=${isoDate}&`;
    }

    if (name != null && name != '' && name != undefined) {
        endpoint += `name=${name}&`;
    }

    endpoint += `x-auth-token=${sessionId}`;

    const requestOptions = {
        method: 'GET'
    };
    const response = await fetch(endpoint, requestOptions);
    const text = await response.text();
    const result = JSON.parse(text);
    console.log(result);

    return result;
}

async function getDetails(id, sessionId, url) {
    const endpoint = `${url}/appointment/details?id=${id}&x-auth-token=${sessionId}`;

    const requestOptions = {
        method: 'GET'
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
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    };
    const response = await fetch(endpoint,requestOptions);
    const text = await response.text();
    return JSON.parse(text);
}

export {
    search,
    getDetails,
    addPerson
}