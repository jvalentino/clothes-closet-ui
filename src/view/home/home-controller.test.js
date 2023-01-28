import * as subject from "./home-controller";
import { expect, test } from "@jest/globals";

import fetch from "jest-fetch-mock";

beforeEach(() => {
  fetch.resetMocks();
});

describe("test home-controller", function () {
  test("test getSettings", async function () {
    // given
    const url = "https://alpha";

    // and
    fetch.mockResponseOnce(JSON.stringify({ success: true }));

    // when
    const result = await subject.getSettings(url);

    // then
    expect(result.success).toEqual(true);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith("https://alpha/appointment/settings");
  });

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

  describe("test validate", function () {
    test("when everything has an error", function () {
      // given
      const body = {
        datetime: null,
        locale: null,
        guardian: {
          email: null,
          firstName: null,
          lastName: null,
          phoneNumber: null,
          phoneTypeLabel: null
        },
        students: [
          {
            studentId: null,
            school: null,
            gender: null,
            grade: null
          }
        ]
      };

      // when
      const results = subject.validate(body);

      // then
      expect(results.length).toEqual(5);
      let i = 0;
      expect(results[i++]).toEqual("You must enter a valid email address");
      expect(results[i++]).toEqual("You must enter a valid first name");
      expect(results[i++]).toEqual("You must enter a valid last name");
      expect(results[i++]).toEqual("You must enter a valid phone number");
      expect(results[i++]).toEqual("Student 1 must have an ID number provided");
    });

    test("when everything is valid", function () {
      // given
      const body = {
        datetime: "2023-01-02T10:00:00.000+0000",
        locale: "en",
        guardian: {
          email: "alpha@bravo.com",
          firstName: "charlie",
          lastName: "delta",
          phoneNumber: "+15555555555",
          phoneTypeLabel: "mobile"
        },
        students: [
          {
            studentId: "echo",
            school: "foxtrot",
            gender: "Male",
            grade: "1"
          }
        ]
      };

      // when
      const results = subject.validate(body);

      // then
      expect(results.length).toEqual(0);
    });
  });

  describe("test assemblePayload", function () {
    test("when not on wait list", function () {
      // given
      const datetime = "2023-01-02T10:00:00.000+0000";
      const language = "en";
      const phoneNumber = "+1222333444";
      const students = [{}];
      const elements = {
        email: {
          value: "alpha@bravo.com"
        },
        firstName: {
          value: "Charlie"
        },
        lastName: {
          value: "Delta"
        },
        phoneTypeLabel: {
          value: "mobile"
        },
        "student-id-1": {
          value: "echo"
        },
        "student-school-1": {
          value: "foxtrot"
        },
        "student-gender-1": {
          value: "Male"
        },
        "student-grade-1": {
          value: "1"
        }
      };

      // when
      const result = subject.assemblePayload(
        datetime,
        language,
        phoneNumber,
        students,
        elements
      );

      // then
      expect(result).toStrictEqual({
        datetime: "2023-01-02T10:00:00.000+0000",
        guardian: {
          email: "alpha@bravo.com",
          firstName: "Charlie",
          lastName: "Delta",
          phoneNumber: "+1222333444",
          phoneTypeLabel: "mobile"
        },
        locale: "en",
        students: [
          {
            gender: "Male",
            grade: "1",
            school: "foxtrot",
            studentId: "echo"
          }
        ],
        waitlist: false
      });
    });

    test("when on wait list", function () {
      // given
      const datetime = null;
      const language = "en";
      const phoneNumber = "+1222333444";
      const students = [{}];
      const elements = {
        email: {
          value: "alpha@bravo.com"
        },
        firstName: {
          value: "Charlie"
        },
        lastName: {
          value: "Delta"
        },
        phoneTypeLabel: {
          value: "mobile"
        },
        "student-id-1": {
          value: "echo"
        },
        "student-school-1": {
          value: "foxtrot"
        },
        "student-gender-1": {
          value: "Male"
        },
        "student-grade-1": {
          value: "1"
        }
      };

      // when
      const result = subject.assemblePayload(
        datetime,
        language,
        phoneNumber,
        students,
        elements
      );

      // then
      expect(result).toStrictEqual({
        datetime: null,
        guardian: {
          email: "alpha@bravo.com",
          firstName: "Charlie",
          lastName: "Delta",
          phoneNumber: "+1222333444",
          phoneTypeLabel: "mobile"
        },
        locale: "en",
        students: [
          {
            gender: "Male",
            grade: "1",
            school: "foxtrot",
            studentId: "echo"
          }
        ],
        waitlist: true
      });
    });
  });
});
