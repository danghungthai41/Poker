import React from "react";
import Card from "../Card";
import { useSelector } from "react-redux";

const Player = (props) => {
  const { player } = props;
  return (
    <div className={`player-${props.index}`}>
      <p className="lead text-center">{player.username}</p>
      <main className="d-flex">
        {player.cards.map((card) => (
          <Card key ={card.code} cards = {card}/>
        ))}
      </main>
    </div>
  );
};

export default Player;
