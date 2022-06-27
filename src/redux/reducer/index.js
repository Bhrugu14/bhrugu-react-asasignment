import { combineReducers } from "redux";
import { productsData, users } from "../../Data";
const initialData = {
  productsListData: productsData,
  users: users,
  currentUser: "no data found",
};
const allReducers = (state = initialData, action) => {
  switch (action.type) {
    case "ADD_PRODUCT": {
      return {
        ...state,
        productsListData: action.payload,
      };
    }
    case "ADD_USER": {
      return {
        ...state,
        users: [...state.users, ...action.payload],
      };
    }
    case "CURRENT_USER": {
      console.log("CURRENT_USER", action);
      return {
        ...state,
        currentUser: action.payload,
      };
    }
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  allReducers,
});
export default rootReducer;
