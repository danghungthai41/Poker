import React from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
const Control = () => {
  const playerList = useSelector((state) => state.player.playerList);
  const deckCards  = useSelector(state => state.card.deckCard);
  const dispatch = useDispatch();
  
  const drawCards = async () => {
    const result = await axios({
      url: `https://deckofcardsapi.com/api/deck/${deckCards.deck_id}/draw/?count=12`,
      method: "GET",
    })
    dispatch({type: "DRAW_CARD", payload: result.data.cards});
  }
  const revealCards = () => {
    dispatch({type: "REVEAL_CARDS"});
  }
  const reShuffleCards = async () => {
    const res = await axios({
      url: `https://deckofcardsapi.com/api/deck/${deckCards.deck_id}/shuffle/`,
      // url: "https://deckofcardsapi.com/api/deck/<<deck_id>>/shuffle/",
      method: "GET",

    })
    dispatch({type: "RESHUFFLE_CARDS", payload: res.data.cards });
  }
  return (
    <div className="d-flex  justify-content-end container">
      <div className="border d-flex justify-content-center align-items-center px-2">
        <button onClick = {reShuffleCards} className="btn btn-success mr-2">Shuffle</button>
        <button onClick = {drawCards} className="btn btn-info mr-2">Draw</button>
        <button onClick = {revealCards} className="btn btn-primary mr-2">Reveal</button>
      </div>
      <div className="d-flex">
        {playerList.map((player) => (
          <div className="border px-3 text-center">
            <p>{player.username}</p>
            <p>{player.totalPoint.toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Control;
