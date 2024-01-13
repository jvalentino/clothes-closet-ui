import * as inputUtil from "../../util/input-util";

async function report(startDate, endDate, sessionId, url) {
  const start = inputUtil.monthDayYearToYearMonthDate(startDate);
  const end = inputUtil.monthDayYearToYearMonthDate(endDate);

  let endpoint = `${url}/appointment/report?`;
  endpoint += `start=${start}&end=${end}`;
  endpoint += `&x-auth-token=${sessionId}`;

  const requestOptions = {
    method: "GET"
  };
  const response = await fetch(endpoint, requestOptions);
  const text = await response.text();
  const results = JSON.parse(text);
  return results;
}

async function reportShoes(startDate, endDate, sessionId, url) {
  return reportNVP(startDate, endDate, sessionId, url, "report-shoes");
}

async function reportUnderwear(startDate, endDate, sessionId, url) {
  return reportNVP(startDate, endDate, sessionId, url, "report-underwear");
}

async function reportNVP(startDate, endDate, sessionId, url, ext) {
  const start = inputUtil.monthDayYearToYearMonthDate(startDate);
  const end = inputUtil.monthDayYearToYearMonthDate(endDate);

  let endpoint = `${url}/appointment/${ext}?`;
  endpoint += `start=${start}&end=${end}`;
  endpoint += `&x-auth-token=${sessionId}`;

  const requestOptions = {
    method: "GET"
  };
  const response = await fetch(endpoint, requestOptions);
  const text = await response.text();
  const results = JSON.parse(text);
  return results;
}

export { report, reportShoes, reportUnderwear };
