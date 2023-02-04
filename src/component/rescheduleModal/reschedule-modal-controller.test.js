import * as subject from "./reschedule-modal-controller";
import { expect, test } from "@jest/globals";
import * as httpUtil from "../../util/http-util";

beforeEach(() => {
  httpUtil.request = jest.fn();
});

describe("test reschedule-modal-controller", function () {
  test("test generateTimeStrings", function () {
    // when
    const results = subject.generateTimeStrings();

    // then
    expect(results).toEqual([
      "6:00:00 AM",
      "6:30:00 AM",
      "7:00:00 AM",
      "7:30:00 AM",
      "8:00:00 AM",
      "8:30:00 AM",
      "9:00:00 AM",
      "9:30:00 AM",
      "10:00:00 AM",
      "10:30:00 AM",
      "11:00:00 AM",
      "11:30:00 AM",
      "12:00:00 PM",
      "12:30:00 PM",
      "1:00:00 PM",
      "1:30:00 PM",
      "2:00:00 PM",
      "2:30:00 PM",
      "3:00:00 PM",
      "3:30:00 PM",
      "4:00:00 PM",
      "4:30:00 PM",
      "5:00:00 PM",
      "5:30:00 PM",
      "6:00:00 PM",
      "6:30:00 PM",
      "7:00:00 PM",
      "7:30:00 PM",
      "8:00:00 PM",
      "8:30:00 PM",
      "9:00:00 PM",
      "9:30:00 PM",
      "10:00:00 PM",
      "10:30:00 PM",
      "11:00:00 PM",
      "11:30:00 PM"
    ]);
  });

  test("test reschedule", async function () {
    // given
    const appointmentId = 1;
    const date = "10/31/2022";
    const time = "1:00:00 PM";
    const sessionId = "alpha";
    const url = "https://bravo";
    const timezoneOffsetHours = -6;

    // and
    httpUtil.request.mockReturnValueOnce({ success: true });

    // when
    const result = await subject.reschedule(
      appointmentId,
      date,
      time,
      sessionId,
      url,
      timezoneOffsetHours
    );

    // then
    expect(result.success).toEqual(true);
    expect(httpUtil.request.mock.calls[0][0]).toBe(
      "https://bravo/appointment/reschedule"
    );
    expect(httpUtil.request.mock.calls[0][1]).toBe("POST");
    expect(httpUtil.request.mock.calls[0][2]).toStrictEqual({
      "x-auth-token": "alpha"
    });
    expect(httpUtil.request.mock.calls[0][3]).toStrictEqual({
      appointmentId: 1,
      datetime: "2022-10-31T13:00:00.000-0600"
    });
  });
});
