//ProductsData
export const AddProduct = (data) => async (dispatch) => {
  dispatch({
    type: "ADD_PRODUCT",
    payload: data,
  });
  return data;
};

//userData
export const AddUser = (data) => async (dispatch) => {
  dispatch({
    type: "ADD_USER",
    payload: data,
  });
  return data;
};

//userData
export const CurrentUser = (data) => async (dispatch) => {
  console.log("data", data);
  return dispatch({
    type: "CURRENT_USER",
    payload: { data },
  });
};
