import { Navbar, Nav, Container } from "react-bootstrap";
import { useDispatch } from "react-redux";

import { IcLogout } from "../../Assets";
import { CurrentUser } from "../../redux/action";

import styles from "./layoutStyles.module.css";

export const Layout = ({ children }) => {
  const dispatch = useDispatch();

  const Logout = () => {
    dispatch(CurrentUser("data not found"));
  };

  return (
    <div className={styles.container}>
      <Navbar
        className={styles.header}
        collapseOnSelect
        expand="lg"
        variant="dark"
      >
        <Container>
          <Navbar.Brand href="/">React Assignment</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link className={styles.headerNav} href="/productList">
                Products
              </Nav.Link>
            </Nav>
            <Nav>
              <img
                onClick={() => Logout()}
                alt="LogOut"
                src={IcLogout}
                className={styles.logout}
              />
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container>{children}</Container>
    </div>
  );
};
