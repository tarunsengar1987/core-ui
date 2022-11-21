import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import axios from 'axios'
import Alert from '../alert/Alert'
import Loader from '../loader/Loader'
// import Loader from '../loader/Loader'

const Login = () => {
  const [validated, setValidated] = useState(false)
  const [loader, setLoader] = useState(false)
  const [loginData, setLoginData] = useState({ email: '', password: '' })
  const [alert, setAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  const navigate = useNavigate()
  const handleChange = (event) => {
    const { name, value } = event.target
    setLoginData({
      ...loginData,
      [name]: value,
    })
  }
  const handleSubmit = (event) => {
    if (loginData.email === '' || loginData.password === '') {
      const form = event.currentTarget
      if (form.checkValidity() === false) {
        event.preventDefault()
        event.stopPropagation()
      }
      setValidated(true)
    } else {
      event.preventDefault()
      axios.post(`${process.env.REACT_APP_API_URL}/auth/signin`, loginData).then((res) => {
        setLoader(true)
        if (res.data.status === 'active') {

          localStorage.setItem('userData', JSON.stringify(res.data))
          setTimeout(() => {
            setLoader(false)
            setAlert(true)
            setAlertMessage('SuccessFully Login')
          }, 2000)
          setTimeout(() => {
            setAlert(false)
            navigate('/dashboard')
          }, 3000)
        }  else {
          if(res.data.status === 'Awaiting approval'){
            setAlert(true)
            setAlertMessage('This user is waiting for admin approval')
            setTimeout(() => {
              setAlert(false)
              setLoader(false)
              setLoginData({ email: '', password: '' })
            }, 3000)

          }else{
            setAlert(true)
            setAlertMessage('Invalid creadentials')
            setTimeout(() => {
              setAlert(false)
              setLoader(false)
              navigate('/')
              setLoginData({ email: '', password: '' })
            }, 3000)
          }
         
          // navigate('/')
        }
      })
    }
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center login-page">
      {/* <Loader isLoader={true}/> */}
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7}>
            <Loader isLoader={loader} />
            <Alert isVisible={alert} message={alertMessage} />
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <h1 className="cardTitle">Login</h1>
                  <p className="text-medium-emphasis">Sign In to your account</p>
                  <CForm
                    className="row g-3 needs-validation"
                    noValidate
                    validated={validated}
                    onSubmit={handleSubmit}
                  >
                    <CCol xs={12}>
                      <CInputGroup className="has-validation">
                        <CInputGroupText>
                          <CIcon icon={cilUser} />
                        </CInputGroupText>
                        <CFormInput
                          type="text"
                          aria-describedby="validationCustom03Feedback"
                          feedbackInvalid="Please provide a valid email."
                          id="validationCustom03"
                          required
                          placeholder="Email"
                          onChange={handleChange}
                          value={loginData.email}
                          name="email"
                        />
                      </CInputGroup>
                    </CCol>
                    <CCol xs={12}>
                      <CInputGroup className="has-validation">
                        <CInputGroupText>
                          <CIcon icon={cilLockLocked} />
                        </CInputGroupText>
                        <CFormInput
                          type="password"
                          aria-describedby="validationCustom05Feedback"
                          feedbackInvalid="Please provide a valid Password."
                          id="validationCustom05"
                          required
                          placeholder="Password"
                          name="password"
                          onChange={handleChange}
                          value={loginData.password}
                        />
                      </CInputGroup>
                    </CCol>
                    <CCol xs={12} lg={6} style={{ textAlign: 'left' }}>
                      <Link to="/forgotpassword">
                        <CButton
                          color="primary"
                          active
                          tabIndex={-1}
                          className="bg-white border-white text-darkGreen px-0"
                        >
                          Forget password
                        </CButton>
                      </Link>
                    </CCol>
                    <CCol xs={12} lg={6} style={{ textAlign: 'right' }}>
                      <CButton
                        type="submit"
                        style={{ backgroundColor: '#227081 ' }}
                        className="border-darkGreen"
                      >
                        Login
                      </CButton>
                    </CCol>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard style={{ width: '44%', backgroundColor: '#227081' }}>
                <CCardBody
                  className="text-center"
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  <div>
                    <h2 className="text-white">Lorem ipsum</h2>
                    <p className="text-offWhite">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                      tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                    <Link to="/register">
                      <CButton
                        color="primary"
                        className="mt-3 bg-white border-white text-darkGreen font-bold"
                        active
                        tabIndex={-1}
                      >
                        Register Now!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
