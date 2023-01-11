import Cookies from 'universal-cookie';
const cookies = new Cookies();

function getSessionId() {
    return cookies.get('clothes-closet-session-id');
}

function setSessionId(sessionId) {
    cookies.set('clothes-closet-session-id', sessionId);
}

export {
    getSessionId,
    setSessionId
}