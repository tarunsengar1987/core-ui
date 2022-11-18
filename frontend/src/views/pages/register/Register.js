import React from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CFormLabel,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Loader from '../loader/Loader'
import Alert from '../alert/Alert'

const Register = () => {
  const [validated, setValidated] = useState(false)
  const [registerData, setRegisterData] = useState({ username: '', email: '', password: '' })
  const [alert, setAlert] = useState(false)
  const [loader, setLoader] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  const navigate = useNavigate()
  const handleChange = (event) => {
    const { name, value } = event.target
    setRegisterData({
      ...registerData,
      [name]: value,
    })
  }

  const handleSubmit = (event) => {
    debugger
    if (registerData.username === '' || registerData.password === '' || registerData.email === '') {
      const form = event.currentTarget
      if (form.checkValidity() === false) {
        event.preventDefault()
        event.stopPropagation()
      }
      setValidated(true)
    } else {
      event.preventDefault()
      axios.post(`${process.env.REACT_APP_API_URL}/auth/signup`, registerData).then((res) => {
        debugger
        setAlert(true)
        setAlertMessage('SuccessFully Login')                            
        localStorage.setItem('userData', JSON.stringify(res.data))
        setTimeout(() => {
          setLoader(false)
          setAlert(false)
          navigate('/')
        }, 3000)
        
      })
    }
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center register-page">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
          <Loader isLoader={loader} />
            <Alert isVisible={alert} message={alertMessage} />
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <h1 className="cardTitle">Register</h1>
                <p className="text-medium-emphasis">Create your account</p>
                <CForm
                  className="row g-3 needs-validation"
                  noValidate
                  validated={validated}
                  onSubmit={handleSubmit}
                >
                  <CCol md={12}>
                    <CInputGroup className="has-validation">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        type="text"
                        aria-describedby="validationCustom03Feedback"
                        feedbackInvalid="Please provide a valid Username."
                        id="validationCustom03"
                        name="username"
                        required
                        placeholder="Username"
                        onChange={handleChange}
                        value={registerData.username}
                      />
                    </CInputGroup>
                  </CCol>
                  <CCol md={12}>
                    <CInputGroup className="has-validation">
                      <CInputGroupText>@</CInputGroupText>
                      <CFormInput
                        type="text"
                        aria-describedby="validationCustom03Feedback"
                        feedbackInvalid="Please provide a valid Email."
                        id="validationCustom03"
                        name="email"
                        placeholder="Email"
                        required
                        onChange={handleChange}
                        value={registerData.email}
                      />
                    </CInputGroup>
                  </CCol>
                  <CCol md={12}>
                    <CInputGroup className="has-validation">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="text"
                        aria-describedby="validationCustom05Feedback"
                        feedbackInvalid="Please provide a valid Password."
                        id="validationCustom05"
                        name="password"
                        placeholder="Password"
                        required
                        onChange={handleChange}
                        value={registerData.password}
                      />
                    </CInputGroup>
                  </CCol>
                  <CCol xs={12} style={{textAlign: "right"}}>
                    <CButton color="primary" type="submit">
                      Submit form
                    </CButton>
                  </CCol>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register
