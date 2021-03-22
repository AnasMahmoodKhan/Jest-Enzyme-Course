import React from "react";
import { shallow } from "enzyme";
import { checkProps, findByTestAttr } from "../test/testUtils";
import Input from "./Input";

const setup = (secretWord = "party") => {
  return shallow(<Input secretWord={secretWord} />);
};

test("Input component renders without error", () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, "component-input");
  expect(component).toHaveLength(1);
});

test("should not throw warning with expected props", () => {
  checkProps(Input, { secretWord: "party" });
});
