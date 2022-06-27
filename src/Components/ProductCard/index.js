import { useState } from "react";
import { Card } from "react-bootstrap";
import { IcDelete } from "../../Assets";

import styles from "./productCard.module.css";

export const ProductCard = (props) => {
  const [desVisible, setDesVisible] = useState(false);

  const { data, clickDelete } = props;
  const { name, price, des } = data;

  return (
    <Card
      onClick={() => setDesVisible(!desVisible)}
      onMouseEnter={() => setDesVisible(true)}
      onMouseLeave={() => setDesVisible(false)}
      {...props}
      className={styles.cardContainer}
    >
      <Card.Body style={{ display: "flex", flexDirection: "column" }}>
        <div className={styles.cardBody}>
          <label className={styles.productName}>{name}</label>
          <img
            onClick={(e) => {
              e.stopPropagation();
              clickDelete();
            }}
            src={IcDelete}
            className={styles.like}
          />
        </div>
        <label className={styles.productName}>Rs.{price}</label>
        {desVisible && <label className={styles.productName}>{des}</label>}
      </Card.Body>
    </Card>
  );
};
