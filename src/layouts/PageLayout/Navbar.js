import { useContext } from "react";
import { Col, Container, Dropdown, Nav, Navbar, NavDropdown, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";
import SettingsContext from '../../contexts/SettingsContext';

const PageHeader = () => {
  const { settings } = useContext(SettingsContext);
  const { user, setUser } = useContext(AuthContext);

  const handleLogout = () => {
    const uri = process.env.REACT_APP_API_URL;
    fetch(`${uri}/users/logout`).then((res) => {
      setUser(null);
    })
  }

  return (
    <>
      <Container fluid>
        <Row className="d-none d-lg-block">
          <Col>
            <Navbar bg="white" expand="lg" fixed="top">
              <Navbar.Brand href="#home">
                <img src={settings.logo} alt="" />
              </Navbar.Brand>
              <Nav className="ms-auto">
                <Link to={`/`} className={'nav-link'}>Home</Link>
                <Link to={`/report`} className={'nav-link'}>Report</Link>
                {user && <NavDropdown title="User" id="basic-nav-dropdown" align="end">
                  <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                </NavDropdown>}
              </Nav>
            </Navbar>
          </Col>
        </Row>
        <Row className="d-block d-lg-none">
          <Col>
          {/* navbar navbar-expand-lg navbar-light bg-white fixed-top */}
            <div className="navbar navbar-expand-lg fixed-top justify-content-center" style={{ backgroundColor: 'white' }}>
              <div>
                <img src={settings.logo} alt="" />
              </div>
            </div>
            <div className="navbar fixed-top text-end" style={{ marginTop: '150px' }}>
              <div className="ms-auto"></div>
              <NavDropdown className="navbar-toggler collapsed" title={<span className="navbar-toggler-icon"></span>}>
                <Link to={`/`} className={'dropdown-item'}>Home</Link>
                <Link to={`/report`} className={'dropdown-item'}>Report</Link>
                {user && <NavDropdown.Item onClick={handleLogout}>
                  Logout
                </NavDropdown.Item>}
              </NavDropdown>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default PageHeader;