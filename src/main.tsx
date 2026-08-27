//   import { StrictMode } from 'react';
//   import { createRoot } from 'react-dom/client';
//   import App from './App.js';
//   import './index.css';
//   import { Provider } from 'react-redux';
//   import store from './store.js';
// import { BrowserRouter } from 'react-router-dom';
// import { AuthProvider } from "./Context/AuthContext";
//   createRoot(document.getElementById('root')!).render(
//     <Provider store={store}>
//       <AuthProvider>
//       <BrowserRouter>
//       <App />
//       </BrowserRouter>
//       </AuthProvider>
//     </Provider>,
//   );






import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.js';
import './index.css';
import { Provider } from 'react-redux';
import store from './store.js';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from "./Context/AuthContext";
import { GoogleOAuthProvider } from '@react-oauth/google';

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <GoogleOAuthProvider clientId={clientId}>
        <AuthProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </AuthProvider>
      </GoogleOAuthProvider>
    </Provider>
  </StrictMode>
);
