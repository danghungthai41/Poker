import React, { useMemo } from "react";
import "./card.css";
import { useSelector } from "react-redux";
const Card = (props) => {
  const isReveal = useSelector((state) => state.status.isReveal);
  const imgSrc = useMemo(() => {

    return isReveal
      ? props.cards.image
      : "https://i.pinimg.com/originals/10/80/a4/1080a4bd1a33cec92019fab5efb3995d.png";
  });
  return (
    <div>
      <img alt="card" className="card" src={imgSrc} />
    </div>
  );
};

export default Card;


