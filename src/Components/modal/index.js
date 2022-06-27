import { useState } from "react";
import { FloatingLabel, Form, Button, Modal } from "react-bootstrap";

import styles from "./modalStyles.module.css";

export const CustomModal = (props) => {
  const [productObj, setProductObj] = useState({
    des: "",
    name: "",
    price: "",
  });
  const [extra, setExtra] = useState(0);
  return (
    <Modal
      onExit={() =>
        setProductObj({
          des: "",
          name: "",
          price: "",
        })
      }
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Add Product details
        </Modal.Title>
        <h3 className={styles.close} onClick={props.OnClose}>
          x
        </h3>
      </Modal.Header>
      <Modal.Body>
        <div className={styles.modalBody}>
          <FloatingLabel label="Product Name" className={styles.inputStyle}>
            <Form.Control
              type="text"
              placeholder="name"
              value={productObj.name}
              onChange={(e) => {
                setProductObj({ ...productObj, name: e.target.value });
                setExtra(extra + 1);
              }}
            />
          </FloatingLabel>
          <FloatingLabel label="Product price" className={styles.inputStyle}>
            <Form.Control
              type="text"
              placeholder="Rs.22"
              value={productObj.price}
              onChange={(e) => {
                setProductObj({ ...productObj, price: e.target.value });
                setExtra(extra + 1);
              }}
            />
          </FloatingLabel>
          <FloatingLabel
            label="Product Description"
            className={styles.inputStyle}
          >
            <Form.Control
              as="textarea"
              placeholder="description"
              value={productObj.des}
              className={styles.textArea}
              onChange={(e) => {
                setProductObj({ ...productObj, des: e.target.value });
                setExtra(extra + 1);
              }}
            />
          </FloatingLabel>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          disabled={
            productObj.name === "" ||
            productObj.price === "" ||
            productObj.des === ""
          }
          onClick={() => props.OnAdd(productObj)}
        >
          Add Product
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
