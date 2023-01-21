import { Buffer } from "buffer";

async function upload(text, sessionId, url) {
  const body = {
    payloadBase64: Buffer.from(text).toString("base64")
  };

  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  };

  console.log(body);
  const response = await fetch(
    `${url}/settings/upload/accepted?x-auth-token=${sessionId}`,
    requestOptions
  );
  const json = await response.text();

  const result = JSON.parse(json);

  return result;
}

export { upload };
