
async function search(date, name, sessionId, url) {
    let endpoint = `${url}/appointment/search?`;

    console.log(`session id is ${sessionId}`);
    console.log(date);

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
    console.log(endpoint);
    const response = await fetch(endpoint, requestOptions);
    const text = await response.text();
    const result = JSON.parse(text);
    console.log(result);

    return result;
}

export {
    search
}