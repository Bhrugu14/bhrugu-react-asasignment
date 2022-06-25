import { combineReducers } from "redux";

const initialData = {
  productsListData: [],
  users: [],
  currentUser: "no data found",
};
const allReducers = (state = initialData, action) => {
  switch (action.type) {
    case "ADD_PRODUCT": {
      const { data } = action.payload;
      return {
        ...state,
        productsListData: data,
      };
    }
    case "ADD_USER": {
      const { data } = action.payload;
      return {
        ...state,
        users: data,
      };
    }
    case "CURRENT_USER": {
      const { data } = action.payload;
      console.log("reducerData", action);
      return {
        ...state,
        currentUser: data,
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
