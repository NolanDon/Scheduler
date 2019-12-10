// import reducer, {
//   SET_DAY,
//   SET_APPLICATION_DATA,
//   SET_INTERVIEW,
//   SET_SPOTSREMAINING,
//   SET_APPOINTMENTS
// } from "reducers/application"

import reducer from "reducers/application";

describe("Application Reducer", () => {
  it("thows an error with an unsupported type", () => {
    expect(() => reducer({}, { type: null })).toThrowError(
      /tried to reduce with unsupported action type/i
    );
  });
});