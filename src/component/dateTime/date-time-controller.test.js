import * as subject from "./date-time-controller";

describe("test date-time-controller", function () {
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
});
