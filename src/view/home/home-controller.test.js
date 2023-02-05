import * as subject from "./home-controller";
import { expect, test } from "@jest/globals";

import fetch from "jest-fetch-mock";

beforeEach(() => {
  fetch.resetMocks();
});

describe("test home-controller", function () {
  describe("test makeAppointment", function () {
    test("when success", async function () {
      // given
      const body = {
        alpha: "bravo"
      };
      const url = "https://charlie";

      // and:
      fetch.mockResponseOnce(JSON.stringify({ success: true }));

      // when
      const result = await subject.makeAppointment(body, url);

      // then
      expect(result.success).toEqual(true);
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith(
        "https://charlie/appointment/schedule",
        {
          body: '{"alpha":"bravo"}',
          headers: { "Content-Type": "application/json" },
          method: "POST"
        }
      );
    });

    test("when student ids not eligible", async function () {
      // given
      const body = {
        alpha: "bravo"
      };
      const url = "https://charlie";

      // and:
      fetch.mockResponseOnce(
        JSON.stringify({
          success: false,
          codes: ["STUDENT_IDS"],
          messages: ["123"]
        })
      );

      // when
      const result = await subject.makeAppointment(body, url);

      // then
      expect(result.success).toEqual(false);
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith(
        "https://charlie/appointment/schedule",
        {
          body: '{"alpha":"bravo"}',
          headers: { "Content-Type": "application/json" },
          method: "POST"
        }
      );

      // and
      expect(result.messages[0]).toEqual(
        "The Student ID of 123 is not eligible"
      );
    });

    test("when already booked", async function () {
      // given
      const body = {
        alpha: "bravo"
      };
      const url = "https://charlie";

      // and:
      fetch.mockResponseOnce(
        JSON.stringify({
          success: false,
          codes: ["BOOKED"]
        })
      );

      // when
      const result = await subject.makeAppointment(body, url);

      // then
      expect(result.success).toEqual(false);
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith(
        "https://charlie/appointment/schedule",
        {
          body: '{"alpha":"bravo"}',
          headers: { "Content-Type": "application/json" },
          method: "POST"
        }
      );

      // and
      expect(result.messages[0]).toEqual(
        "The selected date and time is no longer available, please pick another"
      );
    });

    test("when student has already been this semester", async function () {
      // given
      const body = {
        alpha: "bravo"
      };
      const url = "https://charlie";

      // and:
      fetch.mockResponseOnce(
        JSON.stringify({
          success: false,
          codes: ["ALREADY_BEEN"],
          messages: ["123 2023-01-02T10:00:00.000+0000"]
        })
      );

      // when
      const result = await subject.makeAppointment(body, url);

      // then
      expect(result.success).toEqual(false);
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith(
        "https://charlie/appointment/schedule",
        {
          body: '{"alpha":"bravo"}',
          headers: { "Content-Type": "application/json" },
          method: "POST"
        }
      );

      // and
      // FIXME: This is different on the server due to locale, need to account for it
      //expect(result.messages[0]).toEqual(
      //  "Student 123 is not longer eligible because they have already been this semester on 1/2/2023 4:00:00 AM"
      //);
    });
  });
});
