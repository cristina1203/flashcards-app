import React, { useEffect, useState } from 'react';
import { HiArrowLeft, HiArrowRight } from "react-icons/hi";
import { FiRotateCcw } from "react-icons/fi";

function Flashcard({set}) {
  const [cardText, setCardText] = useState(set.cards.at(0)?.front);
  const [cardFront, setCardFront] = useState(true);
  const [cardNumber, setCardNumber] = useState(0);

  useEffect(() => {
    if (cardFront) {
      setCardText(set.cards.at(cardNumber)?.front);
    } else {
      setCardText(set.cards.at(cardNumber)?.back);
    }
  });

  // go to prev card, called when button clicked or left arrow clicked
  const prevCard = () => {
    if (cardNumber !== 0) {
      setCardNumber(cardNumber - 1);
      setCardFront(true);
    } else {
      setCardNumber(cardNumber);
    }
  };

  // go to next card, called when button clicked or right arrow clicked
  const nextCard = () => {
    if (cardNumber !== set.length - 1) {
      setCardNumber(cardNumber + 1);
      setCardFront(true);
    } else {
      setCardNumber(cardNumber);
    }
  };

  // lets user click keyboard keys to control cards
  useEffect(() => {
    const keyDown = (e) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        prevCard();
      }
      if (e.key === " ") {
        e.preventDefault();
        setCardFront(!cardFront);
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        nextCard();
      }
    };
    document.addEventListener("keydown", keyDown);
    return () => {
      document.removeEventListener("keydown", keyDown);
    };
  });

  if (set.length === 0) {
    return <div className="error-empty-set">No terms in set</div>;
  } else {
    return (
      <div className="flashcard-container">
        <div className="flashcard-header">
          <div className="set-title-on-card">{set.title}</div>
          <div className="flashcard-progress">
            {cardNumber + 1}/{set.length}
          </div>
        </div>
        <div className="flashcard-text">{cardText}</div>
        <div className="flashcard-btns">
          <button
            onClick={
              () => prevCard()
              // cardNumber !== 0
              //   ? () => {
              //       setCardNumber(cardNumber - 1);
              //       setCardFront(true);
              //     }
              //   : () => setCardNumber(cardNumber)
            }
            className="flashcard-btn"
            id="prev"
          >
            <HiArrowLeft style={{ height: "2.3rem", width: "2rem" }} />
          </button>
          <button
            onClick={() => setCardFront(!cardFront)}
            className="flashcard-btn"
            id="flip"
          >
            <FiRotateCcw style={{ height: "1rem", width: "1rem" }} />
          </button>
          <button
            onClick={
              () => nextCard()
              // cardNumber !== set.length - 1
              //   ? () => {
              //       setCardNumber(cardNumber + 1);
              //       setCardFront(true);
              //     }
              //   : () => setCardNumber(cardNumber)
            }
            className="flashcard-btn"
            id="next"
          >
            <HiArrowRight style={{ height: "2.3rem", width: "2rem" }} />
          </button>
        </div>
      </div>
    );
  }
}

export default Flashcard