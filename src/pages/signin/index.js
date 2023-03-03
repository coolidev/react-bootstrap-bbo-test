import { useContext, useState } from "react";
import { Button, Form, FormControl, Modal } from "react-bootstrap";
import AuthContext from "../../contexts/AuthContext";

const SignIn = () => {
  const { setUser } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [openAlert, setOpenAlert] = useState(false);
  const [alert, setAlert] = useState('');

  const handleClose = () => setOpenAlert(false);
  const handleShow = () => setOpenAlert(true);

  const handleEmail = (value) => {
    setEmail(value)
  }
  const handlePassword = (value) => {
    setPassword(value)
  }
  const handleLogIn = () => {
    const uri = process.env.REACT_APP_API_URL;
    const data = {
      username: email,
      password: password
    }
    fetch(`${uri}/users/login`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }).then((res) => {
      return res.json()
    }).then((res) => {
      if (res.user !== undefined) {
        setUser(res.user);
      } else {
        setAlert(res.error);
        handleShow();
      }

      // fetch(`${uri}/users/session`)
      //   .then((res) => {
      //     console.log('sessin', res)
      //     return res.json
      //   }).then((res) => { console.log('session json', res)})
    })
  }

  return (
    <>
      <div className="vw-100 vh-100 d-flex align-items-center justify-content-center bg-light">
        <Form className="text-center">
          <Form.Group className="mb-3">
            <FormControl type="email" placeholder="Email" value={email} onChange={(e) => {handleEmail(e.target.value)}} />
          </Form.Group>
          <Form.Group className="mb-3">
            <FormControl type="password" placeholder="Password" value={password} onChange={(e) => {handlePassword(e.target.value)}} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Button onClick={handleLogIn}>Sign In</Button>
          </Form.Group>
        </Form>
      </div>
      <Modal
        show={openAlert}
        onHide={handleClose}
        className="text-center"
        backdrop="static"
      >
        <Modal.Header>
          <Modal.Title>Error - Sign In Failed</Modal.Title>
        </Modal.Header>
        <Modal.Body>{alert}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default SignIn;
