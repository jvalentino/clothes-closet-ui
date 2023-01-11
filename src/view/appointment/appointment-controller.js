
async function search(date, name, sessionId, url) {
    let endpoint = `${url}/appointment/search?`;

    console.log(`session id is ${sessionId}`);

    if (date != null) {

    }

    if (name != null) {
        endpoint += `name=${name}&`;
    }

    endpoint += `x-auth-token=${sessionId}`;

    const requestOptions = {
        method: 'GET'
    };
    console.log(endpoint); // https://httpbin.org/get'
    const response = await fetch(endpoint, requestOptions);
    const text = await response.text();
    const result = JSON.parse(text);
    console.log(result);

}

export {
    search
}