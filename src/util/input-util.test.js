import * as subject from "./input-util";
import { expect, test } from "@jest/globals";

describe("test input-util", function () {
  test("when isBlank", function () {
    expect(true).toEqual(subject.isBlank(null));
    expect(true).toEqual(subject.isBlank(""));
    expect(true).toEqual(subject.isBlank(" "));
    expect(false).toEqual(subject.isBlank("alpha"));
  });

  test("prettyDateTimeFromIso", function () {
    // given
    const iso = "2023-01-02T10:30:00.000+0000";

    // when
    const result = subject.prettyDateTimeFromIso(iso);

    // then
    expect(result).toEqual("1/2/2023 4:30:00 AM");
  });

  test("monthDayYearToYearMonthDate", function () {
    // given
    const date = "1/2/2023";

    // when
    const result = subject.monthDayYearToYearMonthDate(date);

    // then
    expect(result).toEqual("2023-1-2");
  });
});
