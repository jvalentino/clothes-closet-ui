import * as subject from "./settings-controller";
import { expect, test } from "@jest/globals";

import fetch from "jest-fetch-mock";

beforeEach(() => {
  fetch.resetMocks();
});

describe("test settings-controller", function () {
  test("test loadSettings", async function () {
    // given
    const sessionId = "alpha";
    const url = "https://bravo";

    // and
    fetch.mockResponseOnce(
      JSON.stringify({
        success: true
      })
    );

    // when
    const result = await subject.loadSettings(sessionId, url);

    // then
    expect(result.success).toEqual(true);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      "https://bravo/settings?x-auth-token=alpha",
      { method: "GET" }
    );
  });

  describe("test validateAdd", function () {
    test("when bad", function () {
      // given
      const payload = {
        label: null
      };

      // when
      const results = subject.validateAdd(payload);

      // then
      expect(results.length).toEqual(1);
      expect(results[0]).toEqual("Label cannot be blank");
    });

    test("when good", function () {
      // given
      const payload = {
        label: "alpha"
      };

      // when
      const results = subject.validateAdd(payload);

      // then
      expect(results.length).toEqual(0);
    });
  });

  test("test submitAdd", async function () {
    // given
    const payload = {
      charlie: "delta"
    };
    const sessionId = "alpha";
    const url = "https://bravo";

    // and
    fetch.mockResponseOnce(
      JSON.stringify({
        success: true
      })
    );

    // when
    const result = await subject.submitAdd(payload, sessionId, url);

    // then
    expect(result.success).toEqual(true);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      "https://bravo/settings?x-auth-token=alpha",
      {
        body: '{"charlie":"delta"}',
        headers: {
          "Content-Type": "application/json"
        },
        method: "POST"
      }
    );
  });

  test("test deleteSettings", async function () {
    // given
    const settingsId = "charlie";
    const sessionId = "alpha";
    const url = "https://bravo";

    // and
    fetch.mockResponseOnce(
      JSON.stringify({
        success: true
      })
    );

    // when
    const result = await subject.deleteSettings(settingsId, sessionId, url);

    // then
    expect(result.success).toEqual(true);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      "https://bravo/settings/delete?x-auth-token=alpha&id=charlie",
      {
        method: "POST"
      }
    );
  });
});
