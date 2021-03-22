import React from "react";
import Enzyme, { shallow } from "enzyme";
import EnzymeAdapter from "@wojtekmaj/enzyme-adapter-react-17";

import App from "./App";

Enzyme.configure({ adapter: new EnzymeAdapter() });

test("Jest Enzyme Basic Tests", () => {
  const wrapper = shallow(<App />);
  expect(wrapper).toHaveLength(1);
});
