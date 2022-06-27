import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import { persistor, store } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";

import Main from "./main";

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <BrowserRouter>
          <Main />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
};

export default App;
