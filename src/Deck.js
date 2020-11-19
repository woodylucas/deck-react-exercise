import { render } from "@testing-library/react";
import React, { Component } from "react";
import axios from "axios";
import Card from "./Card";
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
      let cardUrl = `${API_BASE_URL}/${id}/draw/`;
      let cardRes = await axios.get(cardUrl);
      if (!cardRes.data.success) {
        throw new Error("No card remaining!");
      }
      let card = cardRes.data.cards[0];
      console.log(cardRes.data);
      this.setState((st) => ({
        drawn: [
          ...st.drawn,
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
  }

  render() {
    // conditional rendering
    let cards;
    // if the array exist ?
    if (this.state.drawn) {
      cards = this.state.drawn.map((c) => (
        <Card key={c.id} name={c.name} image={c.image} />
      ));
    }

    return (
      <div>
        <h1>Deck</h1>
        <button onClick={this.getCard}>Get Card!</button>
        {cards}
      </div>
    );
  }
}

export default Deck;
