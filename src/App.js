// import './App.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from './pages/login/Login'
import Signup from './pages/signup/Signup'
import Home from './pages/home/Home'
import Navbar from './components/Navbar';
import { useAuthContext } from './hooks/useAuthContext';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';

function App() {
  const {authIsReady} = useAuthContext();
  
  return (
    <div className="App">
      {authIsReady && (
      <Router>
        <Navbar/>
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route path='/' exact element={<Home/>} />
          </Route>
          <Route element={<PublicRoute />}>
            <Route path='/login' element={<Login/>} />
            <Route path='/signup' element={<Signup/>} />
          </Route>
        </Routes>
      </Router>
      )}
    </div>
  );
}

export default App