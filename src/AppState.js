import Cookies from 'universal-cookie';

let instance = null;

class AppState {

    cookies = new Cookies();

    constructor() {
        if (instance) {
          throw new Error("You can only create one instance!");
        }
        instance = this;
      }

    getSessionId() {
        return this.cookies.get('clothes-closet-session-id');
    }
    
    setSessionId(sessionId) {
        this.cookies.set('clothes-closet-session-id', sessionId);
    }
    
    getUrl() {
        return process.env.REACT_APP_HTTP_API
    }

    getInstance() {
        return this;
    }

    setCurrentAppointmentId(id) {
        this.cookies.set('clothes-closet-appointment-id', id);
    }

    getCurrentAppointmentId() {
        return this.cookies.get('clothes-closet-appointment-id');
    }

    setLanguage(language) {
        this.cookies.set('clothes-closet-language', language);
    }

    getLanguage() {
        return this.cookies.get('clothes-closet-language');
    }

    setAppointment(appointment) {
        this.cookies.set('clothes-closet-appointment', appointment);
    }

    getAppointment() {
        return this.cookies.get('clothes-closet-appointment');
    }

    setTextAlign(textAlign) {
        this.cookies.set('clothes-closet-text-align', textAlign);
    }

    getTextAlign() {
        return this.cookies.get('clothes-closet-text-align');
    }
}


const singletonCounter = Object.freeze(new AppState());
export default singletonCounter;
