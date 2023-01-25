import * as subject from "./appointment-controller";
import { expect, test } from "@jest/globals";
import fetch from "jest-fetch-mock";
import * as httpUtil from "../../util/http-util";

beforeEach(() => {
  fetch.resetMocks();
  httpUtil.request = jest.fn();
});

describe("test appointment-controller", function () {
  describe("test search ", function () {
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
        "x-auth-token": "alpha"
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
        "x-auth-token": "alpha"
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
        "x-auth-token": "alpha"
      });
      expect(httpUtil.request.mock.calls[0][3]).toBe(null);
    });
  });

  test("test getDetails", async function () {
    // given
    const id = "alpha";
    const sessionId = "bravo";
    const url = "https://charlie";

    // and
    fetch.mockResponseOnce(JSON.stringify({ success: true }));

    // when
    const result = await subject.getDetails(id, sessionId, url);

    // then
    expect(result.success).toEqual(true);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      "https://charlie/appointment/details?id=alpha&x-auth-token=bravo",
      { method: "GET" }
    );
  });

  test("test addPerson", async function () {
    // given
    const appointmentId = "alpha";
    const relation = "bravo";
    const sessionId = "charlie";
    const url = "https://delta";

    // and
    fetch.mockResponseOnce(JSON.stringify({ success: true }));

    // when
    const result = await subject.addPerson(
      appointmentId,
      relation,
      sessionId,
      url
    );

    // then
    expect(result.success).toEqual(true);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      "https://delta/appointment/person?x-auth-token=charlie",
      {
        body: '{"appointmentId":"alpha","person":{"relation":"bravo"}}',
        headers: {
          "Content-Type": "application/json"
        },
        method: "POST"
      }
    );
  });

  test("test updateAppointment", async function () {
    // given
    const appointmentId = "alpha";
    const visits = ["a", "b"];
    const sessionId = "charlie";
    const url = "https://delta";

    // and
    fetch.mockResponseOnce(JSON.stringify({ success: true }));

    // when
    const result = await subject.updateAppointment(
      appointmentId,
      visits,
      sessionId,
      url
    );

    // then
    expect(result.success).toEqual(true);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      "https://delta/appointment/update?x-auth-token=charlie",
      {
        body: '{"appointmentId":"alpha","visits":["a","b"]}',
        headers: {
          "Content-Type": "application/json"
        },
        method: "POST"
      }
    );
  });

  test("test cancelAppointment", async function () {
    // given
    const id = "alpha";
    const sessionId = "bravo";
    const url = "https://charlie";

    // and
    fetch.mockResponseOnce(JSON.stringify({ success: true }));

    // when
    const result = await subject.cancel(id, sessionId, url);

    // then
    expect(result.success).toEqual(true);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      "https://charlie/appointment/cancel?id=alpha&x-auth-token=bravo",
      { method: "DELETE" }
    );
  });
});
