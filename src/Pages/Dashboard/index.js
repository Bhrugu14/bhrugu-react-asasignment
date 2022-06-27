import { useSelector } from "react-redux";

import { Layout } from "../../Components";

import styles from "./dashboardStyles.module.css";

const Dashboard = () => {
  const currentUser = useSelector((state) => state.allReducers.currentUser);
  return (
    <Layout>
      <div className={styles.container}>
        <h1 className={styles.label}>Welcome!</h1>
        <h2 className={styles.label}>{currentUser.name}</h2>
      </div>
    </Layout>
  );
};
export default Dashboard;
