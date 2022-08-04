import uuid from "react-uuid";
import { useState } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import Flashcard from "./Flashcard";
import { RiEditLine } from "react-icons/ri";
import { FiTrash2 } from "react-icons/fi"

function Main({ activeSet, updateSet, sets, active, setActive, deleteSet, setActiveSet }) {
  const [cards, setCards] = useState([]);
  const [isDisabled, setIsDisabled] = useState(true);
  const [activeCard, setActiveCard] = useState({});
  const [onEdit, setOnEdit] = useState(false);

  // add a new card to current set
  const addCard = () => {
    const newCard = {
      id: uuid(),
      front: prompt("Enter term"),
      back: prompt("Enter definition"),
    };
    if (newCard.front === "" || newCard.front === null) {
      newCard.front = "No term entered";
    }
    if (newCard.back === "" || newCard.back === null) {
      newCard.back = "No definition entered";
    }
    setCards([...cards, newCard]);
    activeSet?.cards?.push(newCard);
    activeSet.length++;
    updateSet(activeSet);
  };

  // save set when done adding cards
  const saveSet = () => {
    setActive(false);
    setCards([]);
    setOnEdit(false);
    setActiveCard(null);
  };

  // update title
  const handleChange = (title) => {
    activeSet.title = title;
    updateSet({
      ...activeSet,
      title: title,
    });
  };

  // update front
  const handleChangeFront = (front) => {
    activeCard.front = front;
    updateCard({
      ...activeCard,
      front: front,
    });
  };

  // update back
  const handleChangeBack = (back) => {
    activeCard.back = back;
    updateCard({
      ...activeCard,
      back: back,
    });
  };

  // general updating card
  const updateCard = (updatedCard) => {
    const updatedCardArr = cards?.map((card) => {
      if (card.id === activeCard) {
        return updatedCard;
      }
      return card;
    });
    setCards(updatedCardArr);
  };

  // called when edit button pressed; allows text input to be edited
  const editCard = (card) => {
    setIsDisabled(!isDisabled);
    setActiveCard(card);
  };

  // deletes card from set
  const deleteCard = (cardToDelete) => {
    const updatedCards =  activeSet.cards.filter((card) => card.id !== cardToDelete)
    setCards(updatedCards);
    activeSet.cards = updatedCards;
    activeSet.length--;
     updateSet({
       ...activeSet,
       cards: updatedCards,
     });
  }

  // when edit set button clicked
  const editSet = (set) => {
    const curset = set;
    setActive(true);
    setActiveSet(curset);
    setCards(curset.cards);
    setOnEdit(true);
  };

  // prompt user to make sure they want to delete set
  const confirmDelete = (setToDelete, titleOfSettoDelete) => {
    const userConfirm = window.confirm(`Are you sure you want to delete "${titleOfSettoDelete}?"`);
    if (userConfirm){
      deleteSet(setToDelete);
    } 
  };

 
  // Render New Set Page if there is an Active Set
  if (active) {
    return (
      <div className="app-main">
        <div className="current-set">
          <div className="header-container">
            {" "}
            <input
              type="text"
              id="title"
              value={activeSet.title}
              onChange={(e) => handleChange(e.target.value)}
            />
            <button id="add-btn" onClick={addCard}>
              Add Card
            </button>
          </div>
          <div className="list-of-cards">
            {cards.map((card) => (
              <div className="card">
                <div className="text-edit">
                  <input
                    type="text"
                    id="card-front"
                    value={card.front}
                    disabled={activeCard !== card}
                    onChange={(e) => handleChangeFront(e.target.value)}
                  ></input>
                  <div className="card-btns">
                    <button
                      onClick={() => {
                        !activeCard ? editCard(card) : setActiveCard(null);
                      }}
                      className="edit-btn"
                    >
                      <RiEditLine style={{ height: "1.3rem", width: "2rem" }} />
                    </button>
                    <button
                      onClick={() => deleteCard(card.id)}
                      className="del-btn"
                    >
                      <FiTrash2 style={{ height: "1.3rem", width: "2rem" }} />
                    </button>
                  </div>
                </div>
                <div className="text-edit">
                  {" "}
                  <textarea
                    type="text"
                    id="card-back"
                    value={card.back}
                    disabled={activeCard !== card}
                    onChange={(e) => handleChangeBack(e.target.value)}
                  ></textarea>
                </div>
              </div>
            ))}
          </div>
          <div className="card-btns">
            <button className="card-btn" onClick={saveSet}>
              Save Set
            </button>
            {!onEdit ? (
              <button
                onClick={() => {
                  deleteSet(activeSet.id);
                  setActive(false);
                  window.location.reload();
                }}
                className="card-btn"
              >
                Cancel
              </button>
            ) : null}
          </div>
        </div>
      </div>
    );

    // Render Sets Page if No Active Set (default)
    
  } else {
    if (sets.length === 0){
      return (
        <div className="app-main">
          <div className="error-no-sets">
            click "Create New Set" to make your first Study Set
          </div>
        </div>
      );
    } else {
    return (
      <div className="set-page">
        <div className="my-sets">
          {sets?.map((set) => (
            <div className="set-card">
                <div className="set-title">{set.title}</div>
              <div className="set-length">{set.length} terms</div>
              <div className="set-btns">
                <Popup
                  trigger={
                    <button className="set-btn" id="study-btn">
                      Study
                    </button>
                  }
                  modal
                >
                  <Flashcard set={set} />
                </Popup>
                <button
                  onClick={() => editSet(set)}
                  className="set-btn"
                  id="edit-set-btn"
                >
                  Edit
                </button>
                <button
                  onClick={() => confirmDelete(set.id, set.title)}
                  className="set-btn"
                  id="delete-set-btn"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
    }
  }
}

export default Main;
