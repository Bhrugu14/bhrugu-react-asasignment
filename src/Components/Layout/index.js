import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";

import { IcLogout } from "../../Assets";
import { AuthContext } from "../../main";
import { CurrentUser } from "../../redux/action";

import styles from "./layoutStyles.module.css";

export const Layout = ({ children }) => {
  const { setModalShow } = useContext(AuthContext);
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.allReducers.currentUser);

  const Logout = () => {
    dispatch(CurrentUser("data not found"));
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <label>{currentUser.email}</label>
        <img
          onClick={() => Logout()}
          alt="LogOut"
          src={IcLogout}
          className={styles.logout}
        />
      </div>
      {children}
    </div>
  );
};
