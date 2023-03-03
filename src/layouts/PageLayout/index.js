import { useContext, useEffect } from "react";
import { Col, Container, Dropdown, Nav, Navbar, NavDropdown, Row } from "react-bootstrap";
import { Link, Outlet, useLoaderData } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";
import SettingsContext from '../../contexts/SettingsContext';
import SignIn from "../../pages/signin";

const PageLayout = () => {
  const { newSettings, newUser } = useLoaderData();
  const { saveSettings } = useContext(SettingsContext);
  const { user, setUser } = useContext(AuthContext);

  useEffect(() => {
    saveSettings(newSettings);
    setUser(newUser)
  }, [newSettings]);

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
                <img src={newSettings.logo} alt="" />
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-auto">
                  <Link to={`/`} className={'nav-link'}>Home</Link>
                  <Link to={`/report`} className={'nav-link'}>Report</Link>
                  <NavDropdown title="User" id="basic-nav-dropdown" align="end">
                    <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
          </Col>
        </Row>
        <Row className="d-block d-lg-none">
          <Col>
          {/* navbar navbar-expand-lg navbar-light bg-white fixed-top */}
            <div className="navbar navbar-expand-lg fixed-top justify-content-center" style={{ backgroundColor: 'white' }}>
              <div>
                <img src={newSettings.logo} alt="" />
              </div>
            </div>
            <div className="fixed-top text-end" style={{ marginTop: '150px' }}>
              <Dropdown align="end">
                <Dropdown.Toggle aria-label="Toggle navigation" class="navbar-toggler collapsed">
                  <span class="navbar-toggler-icon"></span>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item><Link to={`/`} className={'nav-link'}>Home</Link></Dropdown.Item>
                  <Dropdown.Item><Link to={`/report`} className={'nav-link'}>Report</Link></Dropdown.Item>
                  {user && <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>}
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </Col>
        </Row>
      </Container>
      <div id="main">
        {user ? <Outlet /> : <SignIn />}
      </div>
    </>
  );
}

export default PageLayout;