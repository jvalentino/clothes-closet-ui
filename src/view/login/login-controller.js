async function login(credentialResponse, url) {
  console.log(credentialResponse);

  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentialResponse)
  };
  const response = await fetch(`${url}/oauth`, requestOptions);

  const text = await response.text();
  const result = JSON.parse(text);
  console.log(result);

  return result;
}

export { login };
