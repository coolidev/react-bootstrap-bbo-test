import { useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";
import { fakeSessionData } from "../../fake";
import SignIn from "../../pages/signin";
import PageHeader from "./Navbar";

const PageLayout = () => {
  const { user, setUser } = useContext(AuthContext);

  const [pageLoad, setPageLoad] = useState(false);

  useEffect(() => {
    const handleSettings = (data) => {
      setUser(data)
    }
      const uri = process.env.REACT_APP_API_URL
      fetch(`${uri}/users/session`, {
        method: "GET",
        credentials: "omit",
        mode: "no-cors",
        headers: {
          "Access-Control-Allow-Origin": "GET"
        }
      }).then((res) => {
        console.log(res)
      })

    if (!pageLoad) {
      //   .then((res) => {
      //     if (res.status === 200) {
      //       return res.json()
      //     }
      //   }).then((res) => {
      //     if (res !== undefined) {
      //       return res
      //     }
      //   })
      const check = Math.random();
      let newUser = null;
      if (check > 0.5) {
        newUser = fakeSessionData;
      }
      handleSettings(newUser);
      setPageLoad(true)
    }
  }, [pageLoad, setUser])

  return (
    <>
      <PageHeader />
      <div id="main">
        {user ? <Outlet /> : <SignIn />}
      </div>
    </>
  );
}

export default PageLayout;