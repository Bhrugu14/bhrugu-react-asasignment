import { Card } from "react-bootstrap";

import { IcLike } from "../../Assets";

import styles from "./productCard.module.css";

export const ProductCard = (props) => {
  const { data, clickLike } = props;
  const { name, liked } = data;
  return (
    <Card {...props} className={styles.cardContainer}>
      <Card.Body>
        <div className={styles.cardBody}>
          <label className={styles.productName}>{name}</label>
          <img
            alt={"like"}
            onClick={() => clickLike()}
            src={IcLike}
            className={liked ? styles.like : styles.unLike}
          />
        </div>
      </Card.Body>
    </Card>
  );
};
