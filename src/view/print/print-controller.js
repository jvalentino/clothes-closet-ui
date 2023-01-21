async function getDetails(id, sessionId, url) {
  let endpoint = `${url}/appointment/print`;
  endpoint += `?x-auth-token=${sessionId}&id=${id}`;

  const requestOptions = {
    method: "GET"
  };
  const response = await fetch(endpoint, requestOptions);
  const text = await response.text();
  const result = JSON.parse(text);

  return result;
}

export { getDetails };
