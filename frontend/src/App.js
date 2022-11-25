import React, { Component, Suspense } from 'react'
import { HashRouter, Route, Routes, BrowserRouter } from 'react-router-dom'
import './scss/style.scss'
import Dashboard from './views/dashboard/Dashboard'
import Class from './views/pages/classes/Class'
import Confirm from './views/pages/confirmpage/Confirm'
import Forgotpassword from './views/pages/forgetpassword/Forgotpassword'
import Resetpassword from './views/pages/resetpassword/Resetpassword'
import PrivateRoutes from './views/pages/routes/PrivateRoute'
import Setting from './views/pages/setting/Setting'
import TutorialClassDetails from './views/pages/tutorialclassDetails/TutorialClassDetails'
import Tutorials from './views/pages/tutorials/Tutorials'
import User from './views/pages/user/User'
import Profile from './views/pages/profile/Profile'
import Message from './views/pages/message/Message'
import UserProgress from './views/pages/user/UserProgress'
const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Suspense fallback={loading}>
          <Routes>
          <Route element={<PrivateRoutes />}>
            <Route element={<Dashboard/>} path="/dashboard" />
            <Route exact path="/profile" name="Profile Page" element={<Profile />} />
            <Route exact path="/user" name="User Page" element={<User />} />
            <Route exact path="/classes" name="Classes Page" element={<Class />} />
            <Route exact path="/tutorial" name="Tutorials Page" element={<Tutorials />} />
            <Route exact path="/setting" name="Setting Page" element={<Setting />} />
            <Route exact path="/message" name="Message Page" element={<Message />} />
            <Route exact path="/tutorial/tutorial-details" name="Details Page" element={<TutorialClassDetails/>} />
            {/* <Route exact path="/tutorial/tutorial-details/:id" name="Details Page" element={<TutorialClassDetails/>} /> */}
            <Route exact path="/userprogress" name="Userprogress Page" element={<UserProgress />} />
            </Route>
            <Route exact path="/confirm/:id" name="Confirm Page" element={<Confirm />} />
            <Route exact path="/forgotpassword" name="Reset Page" element={<Resetpassword />} />
            <Route exact path="/resetpassword/:id" name="Forgot Page" element={<Forgotpassword />} />
            {/* <Route exact path="/" name="Login Page" element={<Login />} /> */}
            <Route exact path="/register" name="Register Page" element={<Register />} />
            <Route exact path="/404" name="Page 404" element={<Page404 />} />
            <Route exact path="/500" name="Page 500" element={<Page500 />} />
            <Route path="/" name="Login Page" element={<Login />} />
            <Route path="*" name="Home" element={<DefaultLayout />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    )
  }
}

export default App
