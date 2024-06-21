import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import generateRoutes from './routes';
import NotFound from './components/NotFound';
import { createContext, useContext, useReducer } from 'react';
import { initialState, reducer } from './service/authReducer';
import Login from './pages/Login';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      <Router>
        <div className="App">
          <Routes>
            {generateRoutes(state.isAuthenticated)}
            <Route path='/' element={<Login />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
