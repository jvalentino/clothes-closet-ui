function getTimeZoneOffsetInHours(date) {
  return (date.getTimezoneOffset() / 60) * -1;
}

export { getTimeZoneOffsetInHours };
