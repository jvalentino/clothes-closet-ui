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

  test("test formatPhoneNumber", function () {
    //given 
    const input = '+12133734253';

    // when
    const result = subject.formatPhoneNumber(input);

    // then
    expect(result).toBe('(213) 373-4253');
  });
});
