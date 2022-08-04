import Main from "./Main";
import "./App.css";
import uuid from "react-uuid";
import { useState, useEffect } from "react";
import Navbar from "./Navbar";


function App() {
  const [sets, setListOfSets] = useState(
    localStorage.sets ? JSON.parse(localStorage.sets) : []
  );
  const [activeSet, setActiveSet] = useState([]);
  const [active, setActive] = useState(false);

  const updateSet = (updatedSet) => {
    const updatedSetArr = sets?.map((set) => {
      if (set.id === activeSet) {
        return updatedSet;
      }
      return set;
    });
    setListOfSets(updatedSetArr);
  };

  // save set to local storage
  useEffect(() => {
    localStorage.setItem("sets", JSON.stringify(sets));
  }, [sets]);

  // create new set
  const createSet = () => {
    const newSet = {
      id: uuid(),
      title: "Untitled Set",
      cards: [],
      length: 0,
    };
    const activeSet = newSet;
    setActiveSet(newSet);
    setListOfSets([newSet, ...sets]);
    setActive(true);
  };

  const getActiveSet = () => {
    return activeSet;
  };

  const deleteSet = (setToDelete) => {
    setListOfSets(sets.filter((set) => set.id !== setToDelete));
  };

  return (
    <div className="App">
      <Navbar createSet={createSet} setActive={setActive} active={active} />
      <Main
        activeSet={getActiveSet()}
        updateSet={updateSet}
        sets={sets}
        active={active}
        setActive={setActive}
        deleteSet={deleteSet}
        setActiveSet={setActiveSet}
      />
    </div>
  );
}

export default App;
