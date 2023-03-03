import { useContext, useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import AuthContext from "../../contexts/AuthContext";
import { fakeTableData } from "../../fake";

const Home = () => {
  const { user } = useContext(AuthContext);
  const [tableData, setTableData] = useState([]);
  const [tableHeader, setTableHeader] = useState([]);

  useEffect(() => {
    // const fetchData = () => {
    //   const uri = process.env.REACT_APP_API_URL;
    //   fetch(`${uri}/app/tabledata`)
    //   .then((res) => res.json)
    //   .then((res) => {
    //     console.log(res);
    //     return res;
    //   })
    // }
    if (user !== null) {
      const data = fakeTableData.tabledata;
      const headers = data[0]
      setTableHeader(headers);
      setTableData(data.filter((_, index) => index > 0));
      // setTableData(fetchData().tableData);
    }
  }, [user])

  return (
    <div className="vw-100 vh-100 d-flex bg-light">
      <Container fluid style={{ marginTop: '150px' }}>
        <Row>
          <Col>
            <h2>Home</h2>
          </Col>
        </Row>
        <Row>
          <Col>
            <table>
              <thead>
                <tr>
                  {tableHeader.map((row, idx) => (<th key={`head_${idx}`}>{row}</th>))}
                </tr>
              </thead>
              <tbody>
                {tableData.map((row, rowIndex) => {
                  return (<tr key={`row_${rowIndex}`}>
                    {row.map((cell, idx) => {
                      return (<td key={`cell_${rowIndex}_${idx}`}>{cell}</td>)
                    })}
                  </tr>)
                })}
              </tbody>
            </table>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Home;
