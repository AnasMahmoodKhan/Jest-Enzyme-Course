import React from "react";
import { shallow } from "enzyme";

import { findByTestAttr, storeFactory } from "../test/testUtils";
import Input, { UnconnectedInput } from "./Input";

const setup = (initialState = {}) => {
  const store = storeFactory(initialState);
  const wrapper = shallow(<Input store={store} />)
    .dive()
    .dive();
  return wrapper;
};

describe("render", () => {
  describe("word has not been guessed", () => {
    let wrapper;
    beforeEach(() => {
      const initialState = { success: false };
      wrapper = setup(initialState);
    });
    test("should render component without error", () => {
      const component = findByTestAttr(wrapper, "component-input");
      expect(component).toHaveLength(1);
    });
    test("should render input box", () => {
      const inputBox = findByTestAttr(wrapper, "input-box");
      expect(inputBox).toHaveLength(1);
    });
    test("should render submit button", () => {
      const submitButton = findByTestAttr(wrapper, "submit-button");
      expect(submitButton).toHaveLength(1);
    });

    describe("word has been guessed", () => {
      let wrapper;
      beforeEach(() => {
        const initialState = { success: true };
        wrapper = setup(initialState);
      });
      test("should render component without error", () => {
        const component = findByTestAttr(wrapper, "component-input");
        expect(component).toHaveLength(1);
      });
      test("should not render input box", () => {
        const inputBox = findByTestAttr(wrapper, "input-box");
        expect(inputBox).toHaveLength(0);
      });
      test("should not render submit button", () => {
        const submitButton = findByTestAttr(wrapper, "submit-button");
        expect(submitButton).toHaveLength(0);
      });
    });
  });
});

describe("Redux props", () => {
  test("should have success piece of state as prop", () => {
    const success = true;
    const wrapper = setup({ success });
    const successProp = wrapper.instance().props.success;
    expect(successProp).toBe(success);
  });
  test("should have `guessWord` action creater is a function prop", () => {
    const wrapper = setup();
    const guessWordProp = wrapper.instance().props.guessWord;
    expect(guessWordProp).toBeInstanceOf(Function);
  });
});

describe("`guessWord` action creator call", () => {
  let guessWordMock;
  let wrapper;
  const guessedWord = "train";
  beforeEach(() => {
    guessWordMock = jest.fn();
    const props = {
      guessWord: guessWordMock,
    };
    wrapper = shallow(<UnconnectedInput {...props} />);
    wrapper.setState({ currentGuess: guessedWord });
    const submitButton = findByTestAttr(wrapper, "submit-button");
    submitButton.simulate("click", { preventDefault() {} });
  });
  it("should call `guess word` when button is clicked", () => {
    expect(guessWordMock).toHaveBeenCalled();
  });
  test("should call `guessWord with input value as argument`", () => {
    expect(guessWordMock).toHaveBeenCalledWith(guessedWord);
  });
  test("should clear input box on submit", () => {
    expect(wrapper.state("currentGuess")).toBe("");
  });
});
