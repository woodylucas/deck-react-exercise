import { render } from "@testing-library/react";
import React, { Component } from "react";
import axios from "axios";
const API_BASE_URL = `https://deckofcardsapi.com/api/deck/`;
class Deck extends Component {
  constructor(props) {
    super(props);
    this.state = { deck: null };
    this.getCard = this.getCard.bind(this);
  }

  async componentDidMount() {
    // API request with axios
    let deck = await axios.get(`${API_BASE_URL}/new/shuffle `);
    this.setState({ deck: deck.data, drawn: [] });
  }

  // onClick attribute is initialzie to a method: getCard
  async getCard() {
    let id = this.state.deck.deck_id;

    try {
      // make a request using deck id
      let cardUrl = `${API_BASE_URL}/${id}/draw/`;
      let cardResp = await axios.get(cardUrl);
      if (!cardResp.data.success) {
        throw new Error("No card remaining!");
      }
      const card = cardResp.data.cards[0];
      this.setState((currState) => ({
        drawn: [
          ...currState.drawn,
          {
            id: card.code,
            image: card.image,
            name: `${card.value} of ${card.suit}`,
          },
        ],
      }));
    } catch (err) {
      alert(err);
    }
    // set state using new card info from api
  }

  render() {
    return (
      <div>
        <h1>Deck</h1>
        <button onClick={this.getCard}>Get Card!</button>
      </div>
    );
  }
}

export default Deck;
