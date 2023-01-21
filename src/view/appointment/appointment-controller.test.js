import * as subject from "./appointment-controller";
import { expect, test } from "@jest/globals";
import fetch from "jest-fetch-mock";

beforeEach(() => {
  fetch.resetMocks();
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
      fetch.mockResponseOnce(JSON.stringify({ success: true }));

      // when
      const result = await subject.search(date, name, sessionId, url);

      // then
      expect(result.success).toEqual(true);
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith(
        "https://bravo/appointment/search?x-auth-token=alpha",
        { method: "GET" }
      );
    });

    test("when no date but name", async function () {
      // given
      const date = null;
      const name = "charlie";
      const sessionId = "alpha";
      const url = "https://bravo";

      // and
      fetch.mockResponseOnce(JSON.stringify({ success: true }));

      // when
      const result = await subject.search(date, name, sessionId, url);

      // then
      expect(result.success).toEqual(true);
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith(
        "https://bravo/appointment/search?name=charlie&x-auth-token=alpha",
        { method: "GET" }
      );
    });

    test("when date and name", async function () {
      // given
      const date = "01/02/2023";
      const name = "charlie";
      const sessionId = "alpha";
      const url = "https://bravo";

      // and
      fetch.mockResponseOnce(JSON.stringify({ success: true }));

      // when
      const result = await subject.search(date, name, sessionId, url);

      // then
      expect(result.success).toEqual(true);
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith(
        "https://bravo/appointment/search?date=2023-01-02&name=charlie&x-auth-token=alpha",
        { method: "GET" }
      );
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
