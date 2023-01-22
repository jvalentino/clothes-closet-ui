import * as subject from "./reporting-controller";
import { expect, test } from "@jest/globals";

import fetch from "jest-fetch-mock";

beforeEach(() => {
  fetch.resetMocks();
});

describe("test reporting-controller", function () {
  test("test report", async function () {
    // given
    const startDate = "01/02/2023";
    const endDate = "02/03/2023";
    const sessionId = "alpha";
    const url = "https://bravo";

    // and
    fetch.mockResponseOnce(
      JSON.stringify({
        success: true
      })
    );

    // when
    const result = await subject.report(startDate, endDate, sessionId, url);

    // then
    expect(result.success).toEqual(true);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      "https://bravo/appointment/report?start=2023-01-02&end=2023-02-03&x-auth-token=alpha",
      { method: "GET" }
    );
  });
});
