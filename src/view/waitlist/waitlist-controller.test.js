import * as subject from "./waitlist-controller";
import { expect, test } from "@jest/globals";
import * as httpUtil from "../../util/http-util";

beforeEach(() => {
  httpUtil.request = jest.fn();
});

describe("test waitlist-controller", function () {
  describe("test search", function () {
    test("when no date and no name", async function () {
      // given
      const date = null;
      const name = null;
      const sessionId = "alpha";
      const url = "https://bravo";

      // and
      httpUtil.request.mockReturnValueOnce({ success: true });

      // when
      const result = await subject.search(date, name, sessionId, url);

      // then
      expect(result.success).toEqual(true);
      expect(httpUtil.request.mock.calls[0][0]).toBe(
        "https://bravo/appointment/search"
      );
      expect(httpUtil.request.mock.calls[0][1]).toBe("GET");
      expect(httpUtil.request.mock.calls[0][2]).toStrictEqual({
        "x-auth-token": "alpha",
        waiting: true
      });
      expect(httpUtil.request.mock.calls[0][3]).toBe(null);
    });

    test("when no date but name", async function () {
      // given
      const date = null;
      const name = "charlie";
      const sessionId = "alpha";
      const url = "https://bravo";

      // and
      httpUtil.request.mockReturnValueOnce({ success: true });

      // when
      const result = await subject.search(date, name, sessionId, url);

      // then
      expect(result.success).toEqual(true);
      expect(httpUtil.request.mock.calls[0][0]).toBe(
        "https://bravo/appointment/search"
      );
      expect(httpUtil.request.mock.calls[0][1]).toBe("GET");
      expect(httpUtil.request.mock.calls[0][2]).toStrictEqual({
        name: "charlie",
        "x-auth-token": "alpha",
        waiting: true
      });
      expect(httpUtil.request.mock.calls[0][3]).toBe(null);
    });

    test("when date and name", async function () {
      // given
      const date = "01/02/2023";
      const name = "charlie";
      const sessionId = "alpha";
      const url = "https://bravo";

      // and
      httpUtil.request.mockReturnValueOnce({ success: true });

      // when
      const result = await subject.search(date, name, sessionId, url);

      // then
      expect(result.success).toEqual(true);
      expect(httpUtil.request.mock.calls[0][0]).toBe(
        "https://bravo/appointment/search"
      );
      expect(httpUtil.request.mock.calls[0][1]).toBe("GET");
      expect(httpUtil.request.mock.calls[0][2]).toStrictEqual({
        date: "2023-01-02",
        name: "charlie",
        "x-auth-token": "alpha",
        waiting: true
      });
      expect(httpUtil.request.mock.calls[0][3]).toBe(null);
    });
  });

  test("test deleteAppointment", async function () {
    // given
    const appointmentId = 1;
    const sessionId = "alpha";
    const url = "https://bravo";

    // and
    httpUtil.request.mockReturnValueOnce({ success: true });

    // when
    const result = await subject.deleteAppointment(
      appointmentId,
      sessionId,
      url
    );

    // then
    expect(result.success).toEqual(true);
    expect(httpUtil.request.mock.calls[0][0]).toBe(
      "https://bravo/appointment/cancel"
    );
    expect(httpUtil.request.mock.calls[0][1]).toBe("DELETE");
    expect(httpUtil.request.mock.calls[0][2]).toStrictEqual({
      id: 1,
      "x-auth-token": "alpha"
    });
    expect(httpUtil.request.mock.calls[0][3]).toBe(null);
  });

  test("test getDetails", async function () {
    // given
    const appointmentId = 1;
    const sessionId = "alpha";
    const url = "https://bravo";

    // and
    httpUtil.request.mockReturnValueOnce({ success: true });

    // when
    const result = await subject.getDetails(appointmentId, sessionId, url);

    // then
    expect(result.success).toEqual(true);
    expect(httpUtil.request.mock.calls[0][0]).toBe(
      "https://bravo/appointment/details"
    );
    expect(httpUtil.request.mock.calls[0][1]).toBe("GET");
    expect(httpUtil.request.mock.calls[0][2]).toStrictEqual({
      id: 1,
      "x-auth-token": "alpha"
    });
    expect(httpUtil.request.mock.calls[0][3]).toBe(null);
  });

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

  test("test moveFromWaitList", async function () {
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
    const result = await subject.moveFromWaitList(
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
      "https://bravo/appointment/waitlist/move"
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
