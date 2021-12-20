const callStep = require("./callStep.js");

describe("not.stringContaining", () => {
  const expected = "";
  const output = callStep.createStepFunction();
  it("matches if the received value does not contain the expected substring", () => {
    expect().toEqual(output.not.stringContaining(expected));
  });
});
