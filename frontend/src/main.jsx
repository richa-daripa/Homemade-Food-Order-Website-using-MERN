
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router} from 'react-router-dom';
import StoreProvider from './contexts/ContextAPI.jsx';
import './index.css'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import AuthProvider from './contexts/AuthContext.jsx';


createRoot(document.getElementById('root')).render(
  <Router>
    <AuthProvider>
      <StoreProvider>
        <App />
      </StoreProvider>
    </AuthProvider>
  </Router>
)
