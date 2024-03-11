import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Page404 from './components/404Page/Page404'
import Singup from './components/Auth/Singup'
import Login from './components/Auth/Login'
import Profile from './components/Profile/Profile'
import UserContext from './Context/UserContext'

function App() {

  return (
    <>
      <UserContext>
        <Router>
          <Routes>
            <Route path='/' element={ <Singup /> } />
            <Route path='/signup' element={ <Singup /> } />
            <Route path='/login' element={ <Login /> } />
            <Route path='/profile' element={ <Profile />} />
            <Route path='*' element={ <Page404 />} />
          </Routes>
        </Router>
      </UserContext>
    </>
  )
}

export default App
