import * as subject from "./http-util";
import { expect, test } from "@jest/globals";

import fetch from "jest-fetch-mock";

beforeEach(() => {
  fetch.resetMocks();
});

describe("test http-util", function () {
  describe("test generateEndpoint", function () {
    test("when no parameters", function () {
      // given
      const url = "https://alpha/bravo";
      const parameters = {};

      // when
      const result = subject.generateEndpoint(url, parameters);

      // then
      expect(result).toEqual("https://alpha/bravo");
    });

    test("when one parameter", function () {
      // given
      const url = "https://alpha/bravo";
      const parameters = {
        charlie: "delta"
      };

      // when
      const result = subject.generateEndpoint(url, parameters);

      // then
      expect(result).toEqual("https://alpha/bravo?charlie=delta");
    });

    test("when twp parameters", function () {
      // given
      const url = "https://alpha/bravo";
      const parameters = {
        charlie: "delta",
        echo: "foxtrot"
      };

      // when
      const result = subject.generateEndpoint(url, parameters);

      // then
      expect(result).toEqual("https://alpha/bravo?charlie=delta&echo=foxtrot");
    });
  });

  describe("test request", function () {
    test("when get", async function () {
      // given
      const url = "https://alpha";
      const type = "GET";
      const parameters = { charlie: "delta" };
      const body = null;

      // and:
      fetch.mockResponseOnce(JSON.stringify({ success: true }));

      // when
      const result = await subject.request(url, type, parameters, body);

      // then
      expect(result.success).toEqual(true);
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith("https://alpha?charlie=delta", {
        method: "GET"
      });
    });

    test("when post", async function () {
      // given
      const url = "https://alpha";
      const type = "POST";
      const parameters = { charlie: "delta" };
      const body = {
        echo: "foxtrot"
      };

      // and:
      fetch.mockResponseOnce(JSON.stringify({ success: true }));

      // when
      const result = await subject.request(url, type, parameters, body);

      // then
      expect(result.success).toEqual(true);
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith("https://alpha?charlie=delta", {
        body: '{"echo":"foxtrot"}',
        headers: {
          "Content-Type": "application/json"
        },
        method: "POST"
      });
    });
  });
});
