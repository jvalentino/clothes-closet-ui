import * as subject from "./login-controller";
import { expect, test } from "@jest/globals";

import fetch from "jest-fetch-mock";

beforeEach(() => {
  fetch.resetMocks();
});

describe("test login-controller", function () {
  describe("test login", function () {
    test("when success", async function () {
      // given
      const credentialResponse = {
        alpha: "bravo"
      };
      const url = "https://foxtrot";

      // and
      fetch.mockResponseOnce(
        JSON.stringify({
          success: true,
          sessionId: "charlie",
          name: "delta",
          pictureUrl: "echo"
        })
      );

      // when
      const result = await subject.login(credentialResponse, url);

      // then
      expect(result.success).toEqual(true);
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith("https://foxtrot/oauth", {
        body: '{"alpha":"bravo"}',
        headers: { "Content-Type": "application/json" },
        method: "POST"
      });
    });
  });
});
