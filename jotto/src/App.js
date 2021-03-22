import React, { Component } from "react";
import { connect } from "react-redux";
import "./App.css";
import GuessedWords from "./GuessedWords";
import Congrats from "./Congrats";
import { getSecretWord } from "./actions";
import Input from "./Input";

export class UnconnectedApp extends Component {
  componentDidMount() {
    this.props.getSecretWord();
  }
  render() {
    const { secretWord, success, guessedWords } = this.props;
    return (
      <div className="container text-center">
        <h1>Jotto</h1>
        <div>The Secret Word is {secretWord}</div>
        <Congrats success={success} />
        <Input />
        <GuessedWords guessedWords={guessedWords} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { success, guessedWords, secretWord } = state;
  return { success, guessedWords, secretWord };
};

export default connect(mapStateToProps, { getSecretWord })(UnconnectedApp);
