import {
  // createElement,
  // useEffect,
  useState
} from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { fakeReportData } from "../../fake";

const Report = () => {
  const [numberValue, setNumberValue] = useState(1);
  const [file, setFile] = useState();
  const [fileData, setFileData] = useState();
  const [result, setResult] = useState();

  const parser = new DOMParser();

  const showFile = async (e) => {
    e.preventDefault()
    const that = e.target.files[0]
    setFile(e.target.value)
    const reader = new FileReader()
    reader.readAsDataURL(that);
    reader.onload = function () {
      setFileData({
        name: that.name,
        size: that.size,
        type: that.type,
        data: reader.result
      })
    };
  }

  const handleGenerate = () => {
    // const uri = process.env.REACT_APP_API_URL;
    // const data = {
    //   number_value: numberValue,
    //   jpgFILE: fileData
    // }
    // fetch(`${uri}/app/report`, {
    //   method: 'POST',
    //   headers: {
    //     "Content-Type": "application/json"
    //   },
    //   body: JSON.stringify(data)
    // }).then((res) => {
    //   return res.json()
    // }).then((res) => {
    //   console.log(res)
    // })
    console.log(fileData);
    setResult(fakeReportData.report_html);
  }

  const renderResult = () => {
    const element = parser.parseFromString(result, "text/html")
    return (element.firstChild.textContent)
  }

  return (
    <div className="vw-100 vh-100 d-flex bg-light">
    <Container fluid style={{ marginTop: '150px' }}>
      <Row>
        <Col>
          <h2>Report</h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col xs={12} sm={6} md={4}>
          <Form className="text-center">
            <Form.Group className="mb-3 text-start">
              <Form.Label>Enter a value between 1 and 10</Form.Label>
              <Form.Control placeholder="Value" type="number" min={1} max={10} value={numberValue} onChange={(e) => setNumberValue(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3 text-start">
              <Form.Label>Attach a JPG image</Form.Label>
              <Form.Control placeholder="File" type="file" accept="image/*" value={file} onChange={(event) => { showFile(event) }} onClick={(event) => { event.target.value = null }} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Button onClick={handleGenerate}>Generate Report</Button>
            </Form.Group>
          </Form>
        </Col>
      </Row>
      {result !== undefined && <Row className="justify-content-center">
        <Col xs={12} className="text-center">
          {renderResult()}
        </Col>
      </Row>}
    </Container>
    </div>
  );
}

export default Report;