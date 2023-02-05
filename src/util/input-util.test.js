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
    // FIXME: This is different on the server due to locale, need to account for it
    //expect(result).toEqual("1/2/2023 4:30:00 AM");
  });

  test("monthDayYearToYearMonthDate", function () {
    // given
    const date = "1/2/2023";

    // when
    const result = subject.monthDayYearToYearMonthDate(date);

    // then
    expect(result).toEqual("2023-1-2");
  });

  test("amPmTimeToIso", function () {
    // positive offset
    expect(subject.amPmTimeToIso("01:00:00 AM", 1)).toEqual(
      "01:00:00.000+0100"
    );
    expect(subject.amPmTimeToIso("01:30:00 AM", 1)).toEqual(
      "01:30:00.000+0100"
    );
    expect(subject.amPmTimeToIso("02:00:00 AM", 1)).toEqual(
      "02:00:00.000+0100"
    );
    expect(subject.amPmTimeToIso("03:00:00 AM", 1)).toEqual(
      "03:00:00.000+0100"
    );
    expect(subject.amPmTimeToIso("04:00:00 AM", 1)).toEqual(
      "04:00:00.000+0100"
    );
    expect(subject.amPmTimeToIso("05:00:00 AM", 1)).toEqual(
      "05:00:00.000+0100"
    );
    expect(subject.amPmTimeToIso("06:00:00 AM", 1)).toEqual(
      "06:00:00.000+0100"
    );
    expect(subject.amPmTimeToIso("07:00:00 AM", 1)).toEqual(
      "07:00:00.000+0100"
    );
    expect(subject.amPmTimeToIso("08:00:00 AM", 1)).toEqual(
      "08:00:00.000+0100"
    );
    expect(subject.amPmTimeToIso("09:00:00 AM", 1)).toEqual(
      "09:00:00.000+0100"
    );
    expect(subject.amPmTimeToIso("10:00:00 AM", 1)).toEqual(
      "10:00:00.000+0100"
    );
    expect(subject.amPmTimeToIso("11:00:00 AM", 1)).toEqual(
      "11:00:00.000+0100"
    );
    expect(subject.amPmTimeToIso("12:00:00 PM", 1)).toEqual(
      "12:00:00.000+0100"
    );
    expect(subject.amPmTimeToIso("01:00:00 PM", 1)).toEqual(
      "13:00:00.000+0100"
    );
    expect(subject.amPmTimeToIso("02:00:00 PM", 1)).toEqual(
      "14:00:00.000+0100"
    );
    expect(subject.amPmTimeToIso("03:00:00 PM", 1)).toEqual(
      "15:00:00.000+0100"
    );
    expect(subject.amPmTimeToIso("04:00:00 PM", 1)).toEqual(
      "16:00:00.000+0100"
    );
    expect(subject.amPmTimeToIso("05:00:00 PM", 1)).toEqual(
      "17:00:00.000+0100"
    );
    expect(subject.amPmTimeToIso("06:00:00 PM", 1)).toEqual(
      "18:00:00.000+0100"
    );
    expect(subject.amPmTimeToIso("07:00:00 PM", 1)).toEqual(
      "19:00:00.000+0100"
    );
    expect(subject.amPmTimeToIso("08:00:00 PM", 1)).toEqual(
      "20:00:00.000+0100"
    );
    expect(subject.amPmTimeToIso("09:00:00 PM", 1)).toEqual(
      "21:00:00.000+0100"
    );
    expect(subject.amPmTimeToIso("10:00:00 PM", 1)).toEqual(
      "22:00:00.000+0100"
    );
    expect(subject.amPmTimeToIso("11:00:00 PM", 1)).toEqual(
      "23:00:00.000+0100"
    );
    expect(subject.amPmTimeToIso("12:00:00 AM", 1)).toEqual(
      "00:00:00.000+0100"
    );

    // negative offset
    expect(subject.amPmTimeToIso("01:30:00 AM", -1)).toEqual(
      "01:30:00.000-0100"
    );
  });

  test("dateAndTimeToIso", function () {
    expect(subject.dateAndTimeToIso("01/02/2023", "06:00:00 AM", -6)).toBe(
      "2023-01-02T06:00:00.000-0600"
    );
  });
});
