import { createContext, useState } from "react"

const defaultUser = {
}

const AuthContext = createContext({
  user: defaultUser,
  setUser: () => {}
})

export const AuthProvider = ({ user, children }) => {
  const [currentUser, setCurrentUser] = useState(defaultUser);

  const handleSaveSettings = (update) => {
    if (update !== undefined && update !== null) {
      const merged = { ...update };
      setCurrentUser(merged);
    } else {
      setCurrentUser(null)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user: currentUser,
        setUser: handleSaveSettings
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const AuthConsumer = AuthContext.Consumer;

export default AuthContext;
