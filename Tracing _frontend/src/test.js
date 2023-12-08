import React, { useRef } from "react";

function Test() {
  const inputRef = useRef(null);

  const handleClick = () => {
    // Accessing the input element
    inputRef.current.focus();
  };

  return (
    <div>
      <input
        style={{ position: "absolute", left: "50px" }}
        type="text"
        ref={inputRef}
      />
      <button
        style={{ position: "absolute", left: "400px" }}
        onClick={handleClick}
      >
        Focus Input
      </button>
    </div>
  );
}

export default Test;
