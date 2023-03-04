import React, { useContext, useEffect, useState } from 'react';
import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import SettingsContext from './contexts/SettingsContext';
import router from './routes';

function App() {
  const { saveSettings } = useContext(SettingsContext);
  const [pageLoad, setPageLoad] = useState(false);

  useEffect(() => {
    const handleSettings = (data) => {
      saveSettings(data)
    }

    if (!pageLoad) {
      const uri = process.env.REACT_APP_API_URL
      fetch(`${uri}/app/settings`)
        .then((res) => {
          return res.json()
        }).then(res => {
          handleSettings(res)
          setPageLoad(true)
          return res
        });
    }
  }, [pageLoad, saveSettings])

  return (
    <React.Fragment>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </React.Fragment>
  );
}

export default App;
