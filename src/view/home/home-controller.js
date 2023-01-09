
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

export { getSettings, makeAppointment };