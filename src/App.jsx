import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Page404 from './components/404Page/Page404'
import Signup from './components/Auth/Signup'
import Login from './components/Auth/Login'
import Profile from './components/Profile/Profile'
import UserContext from './Context/UserContext'
import Private from './components/Private/Private'
import OTP from './components/Auth/OTP'
import ForgotPassword from './components/Auth/ForgotPassword'
import ResetPassword from './components/Auth/ResetPassword'

function App() {

  return (
    <>
      <UserContext>
        <Router>
          <Routes>
            <Route path='/' element={ <Signup /> } />
            <Route path='/signup' element={ <Signup /> } />
            <Route path='/login' element={ <Login /> } />
            <Route path='/login/otp' element={ <OTP /> } />
            <Route path='/login/forgot-password' element={ <ForgotPassword /> } />
            <Route path='/reset-password/:token' element={ <ResetPassword /> } />
            <Route element={<Private />} >
              <Route path='/profile' element={ <Profile />} />
            </Route>
            <Route path='*' element={ <Page404 />} />
          </Routes>
        </Router>
      </UserContext>
    </>
  )
}

export default App
