import * as subject from "./print-controller";
import { expect, test } from "@jest/globals";

import fetch from "jest-fetch-mock";

beforeEach(() => {
  fetch.resetMocks();
});

describe("test print-controller", function () {
  test("test getDetails", async function () {
    // given
    const id = "alpha";
    const sessionId = "bravo";
    const url = "https://charlie";

    // and
    fetch.mockResponseOnce(
      JSON.stringify({
        success: true
      })
    );

    // when
    const result = await subject.getDetails(id, sessionId, url);

    // then
    expect(result.success).toEqual(true);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      "https://charlie/appointment/print?x-auth-token=bravo&id=alpha",
      { method: "GET" }
    );
  });
});
