import { fakeSessionData } from "../fake";

export async function loader() {
  const uri = process.env.REACT_APP_API_URL
  const newSettings = await fetch(`${uri}/app/settings`)
    .then((res) => {
      return res.json()
    }).then(res => {
      return res
    });
  // const user = await fetch(`${uri}/users/session`, {
  //   method: "GET",
  //   credentials: "same-origin",
  // })
  //   .then((res) => {
  //     if (res.status === 200) {
  //       return res.json()
  //     }
  //   }).then((res) => {
  //     if (res !== undefined) {
  //       return res
  //     }
  //   })
  const check = Math.random()
  let user = null;
  if (check > 0.5) {
    user = fakeSessionData
  }
  return { newSettings, newUser: user }
}
