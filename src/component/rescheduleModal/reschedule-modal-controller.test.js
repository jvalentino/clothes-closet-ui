import * as subject from "./reschedule-modal-controller";
import { expect, test } from "@jest/globals";
import * as httpUtil from "../../util/http-util";

beforeEach(() => {
  httpUtil.request = jest.fn();
});

describe("test reschedule-modal-controller", function () {
  test("test reschedule", async function () {
    // given
    const appointmentId = 1;
    const datetime = "2022-10-31T13:00:00.000-0600";
    const sessionId = "alpha";
    const url = "https://bravo";

    // and
    httpUtil.request.mockReturnValueOnce({ success: true });

    // when
    const result = await subject.reschedule(
      appointmentId,
      datetime,
      sessionId,
      url
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
