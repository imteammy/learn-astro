import React, { useReducer, useState, type ChangeEvent } from "react";

// Define types for the state
interface State {
  query: string;
  options: string[];
}

// Define action types
interface Action {
  type: "SET_QUERY" | "CLEAR_QUERY";
  payload?: string;
}

// Initial state for the reducer
const initialState: State = {
  query: "",
  options: ["Apple", "Banana", "Orange", "Grapes", "Pineapple", "Strawberry"],
};

// Reducer function to handle state changes
const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_QUERY":
      return {
        ...state,
        query: action.payload || "",
      };
    case "CLEAR_QUERY":
      return {
        ...state,
        query: "",
      };
    default:
      return state;
  }
};

const Dropdown: React.FC = () => {
  // Using useReducer for state management
  const [state, dispatch] = useReducer(reducer, initialState);

  // Local state for handling dropdown visibility
  const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false);

  // Handle input changes
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    dispatch({ type: "SET_QUERY", payload: value });
    setIsDropdownVisible(value !== "");
  };

  // Clear search input
  const clearSearch = () => {
    dispatch({ type: "CLEAR_QUERY" });
    setIsDropdownVisible(false);
  };

  // Handle selection of an option
  const handleOptionSelect = (option: string) => {
    dispatch({ type: "SET_QUERY", payload: option });
    setIsDropdownVisible(false);
  };

  return (
    <div style={{ width: "250px", position: "relative" }}>
      <input
        type="text"
        value={state.query}
        onChange={handleInputChange}
        placeholder="Search..."
        style={{ width: "100%", padding: "8px" }}
      />
      {state.query && (
        <button
          onClick={clearSearch}
          style={{ position: "absolute", right: "10px", top: "10px" }}
        >
          X
        </button>
      )}
      {isDropdownVisible && state.options.length > 0 && (
        <ul
          style={{
            listStyleType: "none",
            padding: "0",
            marginTop: "4px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            backgroundColor: "white",
            position: "absolute",
            width: "100%",
            zIndex: 1,
          }}
        >
          {state.options.map((option, index) => (
            <li
              key={index}
              onClick={() => handleOptionSelect(option)}
              style={{
                padding: "8px",
                cursor: "pointer",
                backgroundColor: "#f9f9f9",
                borderBottom: "1px solid #ddd",
              }}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
