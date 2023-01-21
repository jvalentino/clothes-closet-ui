import * as subject from "./input-util";
import { expect, test } from "@jest/globals";

describe("test input-util", function () {
    test("when isBlank", function () {
        // when
        const reuslt = subject.isBlank(null);

        // then
        expect(true).toEqual(reuslt);
    });
});