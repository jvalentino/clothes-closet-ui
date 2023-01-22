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

export {
  isBlank,
  prettyDateTimeFromIso,
  monthDayYearToYearMonthDate,
  dateToIso8601
};
