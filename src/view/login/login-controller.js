import AppState from "../../AppState";

async function login(credentialResponse) {
    console.log(credentialResponse);

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentialResponse)
    };
    const response = await fetch(`${process.env.REACT_APP_HTTP_API}/oauth`,requestOptions);
    const text = await response.text();
    const result = JSON.parse(text);
    console.log(result);


    if (!result.success) {
        return false;
    }
    

    AppState.setSessionId(result.sessionId);
    
    return true;
}

export { login };
