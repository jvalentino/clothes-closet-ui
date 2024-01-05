import * as subject from "./common-service";
import { expect, test } from "@jest/globals";

describe("test common-service", function () {
  describe("test assembleAppointmentPayload", function () {
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
        },
        "student-size-1": {
          value: "Adult"
        },
        "student-shoe-size-1": {
          value: "10"
        },
        "student-underwear-size-1": {
          value: "L"
        }
      };

      // when
      const result = subject.assembleAppointmentPayload(
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
            studentId: "echo",
            shoeSize: "10",
            sizeType: "Adult",
            underwearSize: "L"
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
        },
        "student-size-1": {
          value: "Adult"
        },
        "student-shoe-size-1": {
          value: "10"
        },
        "student-underwear-size-1": {
          value: "L"
        }
      };

      // when
      const result = subject.assembleAppointmentPayload(
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
            studentId: "echo",
            shoeSize: "10",
            sizeType: "Adult",
            underwearSize: "L"
          }
        ],
        waitlist: true
      });
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
      const results = subject.validateAppointmentPayload(body);

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
      const results = subject.validateAppointmentPayload(body);

      // then
      expect(results.length).toEqual(0);
    });
  });
});
