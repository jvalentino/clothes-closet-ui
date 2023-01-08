
async function getSettings() {
    const response = await fetch(`${process.env.REACT_APP_HTTP_API}/appointment/settings`);
    const text = await response.text();
    return JSON.parse(text);
}

export { getSettings };