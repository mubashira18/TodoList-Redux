import {
  ADD_TODO,
  DELETE_ALL,
  REMOVE_TODO,
  UPDATE_CHECKBOX,
  UPDATE_TODO,
} from "../actions";

const loadState = () => {
  try {
    const serializedState = localStorage.getItem("todos");
    if (serializedState === null) {
      return [
        { id: 1, todo: "Wake Up", completed: false },
        { id: 2, todo: "Complete Stats Theory", completed: false },
        { id: 3, todo: "Practice Probabilty", completed: true },
      ];
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("todos", serializedState);
  } catch (err) {
    // Ignore write errors
  }
};

const initialState = loadState();

export const operationsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case ADD_TODO:
      newState = [...state, action.payload];
      saveState(newState);
      return newState;
    case DELETE_ALL:
      newState = [];
      saveState(newState);
      return newState;
    case REMOVE_TODO:
      newState = state.filter((todo) => todo.id !== action.payload);
      saveState(newState);
      return newState;
    case UPDATE_TODO:
      newState = state.map((item) =>
        item.id === action.payload.id ? { ...item, ...action.payload } : item
      );
      saveState(newState);
      return newState;
    case UPDATE_CHECKBOX:
      newState = state.map((item) =>
        item.id === action.payload
          ? { ...item, completed: !item.completed }
          : item
      );
      saveState(newState);
      return newState;
    default:
      return state;
  }
};
