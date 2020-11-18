import { render } from "@testing-library/react";
import React, { Component } from "react";
const API_URL = `https://deckofcardsapi.com/api/deck/new/shuffle `;
class Deck extends Component {
  constructor(props) {
    super(props);
    this.state = { deck: null };
  }

  componentDidMount() {}

  render() {
    return (
      <div>
        <h1>Deck</h1>
      </div>
    );
  }
}

export default Deck;
