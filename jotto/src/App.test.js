import React from "react";
import { shallow } from "enzyme";
import { storeFactory } from "../test/testUtils";
import App, { UnconnectedApp } from "./App";

const setup = (initialState = {}) => {
  const store = storeFactory(initialState);
  const wrapper = shallow(<App store={store} />)
    .dive()
    .dive();
  return wrapper;
};

describe("App component", () => {
  test("should render component without error", () => {
    const wrapper = setup();
    expect(wrapper.find("h1").text()).toBe("Jotto");
  });
});

describe("redux properties", () => {
  test("should have access to `success` state", () => {
    const success = true;
    const wrapper = setup({ success });
    const successProp = wrapper.instance().props.success;
    expect(successProp).toBe(success);
  });

  test("should have access to `secretWord` state", () => {
    const secretWord = "party";
    const wrapper = setup({ secretWord });
    const secretWordProp = wrapper.instance().props.secretWord;
    expect(secretWordProp).toBe(secretWord);
  });

  test("should have access to `guessedWord` state", () => {
    const guessedWords = [{ guessedWord: "train", letterMatchCount: 3 }];
    const wrapper = setup({ guessedWords });
    const guessedWordProp = wrapper.instance().props.guessedWords;
    expect(guessedWordProp).toEqual(guessedWords);
  });

  test("should have `getSecretWord` action creater is a function prop", () => {
    const wrapper = setup();
    const getSecretWordProp = wrapper.instance().props.getSecretWord;
    expect(getSecretWordProp).toBeInstanceOf(Function);
  });
});

test("should `getSecretWord` runs on App mount", () => {
  const getSecretWordMock = jest.fn();

  const props = {
    getSecretWord: getSecretWordMock,
    success: false,
    guessedWords: [],
  };

  const wrapper = shallow(<UnconnectedApp {...props} />);

  wrapper.instance().componentDidMount();

  const getSecretWordCallCount = getSecretWordMock.mock.calls.length;

  expect(getSecretWordCallCount).toBe(1);
});
