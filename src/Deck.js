import { render } from "@testing-library/react";
import React, { Component } from "react";
import axios from "axios";
const API_URL = `https://deckofcardsapi.com/api/deck/new/shuffle `;
class Deck extends Component {
  constructor(props) {
    super(props);
    this.state = { deck: null };
  }

  async componentDidMount() {
    // API request with axios
    let deck = await axios.get(API_URL);
    this.setState({ deck: deck.data });
  }

  render() {
    console.log("Deck:", this.state.deck);
    return (
      <div>
        <h1>Deck</h1>
      </div>
    );
  }
}

export default Deck;
