import * as subject from "./locale-controller";
import { expect, test } from "@jest/globals";

import fetch from "jest-fetch-mock";

beforeEach(() => {
  fetch.resetMocks();
});

describe("test locale-controller", function () {
  test("test generateLanguages", function () {
    // when
    const results = subject.generateLanguages();

    // then
    results.length == 4;

    // and
    expect(results[0].name).toEqual("en");
    expect(results[1].name).toEqual("es");
    expect(results[2].name).toEqual("ar");
    expect(results[3].name).toEqual("fr");

    // and
    expect(results[0].values[0].name).toEqual("bannerFollowUs");
    expect(results[0].values[0].text).toEqual("Follow Us On Facebook");
  });
});
