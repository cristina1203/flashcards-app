function Navbar({ createSet, active }) {
  return (
    <div className="app-navbar">
      <h1 onClick={() => window.location.reload()}>Study Sets</h1>
      <div>
        <button onClick={!active ? createSet : null} className="nav-btn">
          Create New Set
        </button>
      </div>
    </div>
  );
}

export default Navbar;
