import Cookies from "universal-cookie";

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
    return this.cookies.get("clothes-closet-session-id");
  }

  setSessionId(sessionId) {
    this.cookies.set("clothes-closet-session-id", sessionId);
  }

  getUrl() {
    return process.env.REACT_APP_HTTP_API;
  }

  getInstance() {
    return this;
  }

  setCurrentAppointmentId(id) {
    this.cookies.set("clothes-closet-appointment-id", id);
  }

  getCurrentAppointmentId() {
    return this.cookies.get("clothes-closet-appointment-id");
  }

  setLanguage(language) {
    this.cookies.set("clothes-closet-language", language);
  }

  getLanguage() {
    return this.cookies.get("clothes-closet-language");
  }

  setAppointment(appointment) {
    this.cookies.set("clothes-closet-appointment", appointment);
  }

  getAppointment() {
    return this.cookies.get("clothes-closet-appointment");
  }

  setTextAlign(textAlign) {
    this.cookies.set("clothes-closet-text-align", textAlign);
  }

  getTextAlign() {
    return this.cookies.get("clothes-closet-text-align");
  }

  setLoggedInName(name) {
    this.cookies.set("clothes-closet-logged-in-name", name);
  }

  getLoggedInName() {
    return this.cookies.get("clothes-closet-logged-in-name");
  }

  setLoggedInPicture(url) {
    this.cookies.set("clothes-closet-logged-in-picture", url);
  }

  getLoggedInPicture() {
    return this.cookies.get("clothes-closet-logged-in-picture");
  }

  markLoggedIn(sessionId, name, pictureUrl) {
    if (sessionId != null) {
      this.setSessionId(sessionId);
      this.setLoggedInName(name);
      this.setLoggedInPicture(pictureUrl);
    } else {
      this.cookies.remove("clothes-closet-logged-in-name");
      this.cookies.remove("clothes-closet-logged-in-picture");
      this.cookies.remove("clothes-closet-logged-session-id");
    }
  }

  getTimeZone() {
    const { timeZone } = Intl.DateTimeFormat().resolvedOptions();
    return timeZone;
  }

  isMobile() {
    if (window.innerWidth <= 768) {
      return true;
    }
    return false;
  }
}

const singletonCounter = Object.freeze(new AppState());
export default singletonCounter;
