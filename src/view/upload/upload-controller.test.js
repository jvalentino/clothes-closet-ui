import * as subject from "./upload-controller";
import { expect, test } from "@jest/globals";

import fetch from "jest-fetch-mock";

beforeEach(() => {
  fetch.resetMocks();
});

describe("test upload-controller", function () {
  test("test upload", async function () {
    // given
    const text = "alpha";
    const sessionId = "bravo";
    const url = "https://charlie";

    // and
    fetch.mockResponseOnce(
      JSON.stringify({
        success: true
      })
    );

    // when
    const result = await subject.upload(text, sessionId, url);

    // then
    expect(result.success).toEqual(true);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      "https://charlie/settings/upload/accepted?x-auth-token=bravo",
      {
        body: '{"payloadBase64":"YWxwaGE="}',
        headers: {
          "Content-Type": "application/json"
        },
        method: "POST"
      }
    );
  });
});
