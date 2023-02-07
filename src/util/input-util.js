import * as timeZoneUtil from "./time-zone-util";

function isBlank(value) {
  if (value == undefined) {
    return true;
  }

  if (value == null) {
    return true;
  }

  if (value.trim().length == 0) {
    return true;
  }

  return false;
}

function prettyDateTimeFromIso(iso) {
  const date = new Date(iso);
  const dayMonthYear = date.toLocaleDateString();
  const time = date.toLocaleTimeString();

  return `${dayMonthYear} ${time}`;
}

function monthDayYearToYearMonthDate(date) {
  const split = date.split("/");
  const isoDate = `${split[2]}-${split[0]}-${split[1]}`;
  return isoDate;
}

function dateToIso8601(date) {
  return date.toISOString()?.replace("Z", "+0000");
}

function amPmTimeToIso(time, timezoneOffsetHours) {
  const split = time.split(" ");
  const timeString = split[0];
  const amPm = split[1];

  const timeStringSplit = timeString.split(":");
  const hour = +`${timeStringSplit[0]}`;
  let newHour = hour;

  if (amPm == "PM" && hour != 12) {
    newHour = hour + 12;
  } else if (amPm == "AM" && hour == 12) {
    newHour = 0;
  }

  let hourString = `${newHour}`;
  if (hourString.length == 1) {
    hourString = `0${hourString}`;
  }

  let symbol = "+";
  if (timezoneOffsetHours < 0) {
    symbol = "-";
  }
  timezoneOffsetHours = Math.abs(timezoneOffsetHours);
  let timezoneOffsetString = `${timezoneOffsetHours}00`;

  if (timezoneOffsetString.length == 3) {
    timezoneOffsetString = "0" + timezoneOffsetString;
  }

  return `${hourString}:${timeStringSplit[1]}:${timeStringSplit[2]}.000${symbol}${timezoneOffsetString}`;
}

function dateAndTimeToIso(date, time) {
  if (this.isBlank(date)) {
    return null;
  }

  const timezoneOffsetHours = timeZoneUtil.getTimeZoneOffsetInHours(
    new Date(date)
  );

  const isoPart1 = this.monthDayYearToYearMonthDate(date);

  const isoPart2 = this.amPmTimeToIso(time, timezoneOffsetHours);

  const isoDateTime = `${isoPart1}T${isoPart2}`;
  return isoDateTime;
}

export {
  isBlank,
  prettyDateTimeFromIso,
  monthDayYearToYearMonthDate,
  dateToIso8601,
  amPmTimeToIso,
  dateAndTimeToIso
};
