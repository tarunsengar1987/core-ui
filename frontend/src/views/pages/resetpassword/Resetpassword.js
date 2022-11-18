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

export default function Resetpassword() {
  const [validated, setValidated] = useState(false)
  const [loader, setLoader] = useState(false)
  const [emaildata, setEmaildata] = useState({ email: '' })
  const [alert, setAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  const navigate = useNavigate()

  const handleChange = (event) => {
    const { name, value } = event.target
    setEmaildata({
      ...emaildata,
      [name]: value,
    })
  }

  const handleSubmit = (event) => {
    if (emaildata.email === '') {
      const form = event.currentTarget
      if (form.checkValidity() === false) {
        event.preventDefault()
        event.stopPropagation()
      }
      setValidated(true)
    } else {
      event.preventDefault()
      axios.post(`${process.env.REACT_APP_API_URL}/resetpassword`, emaildata).then((res) => {
        setLoader(true)
        setAlert(true)
        setAlertMessage(res.data.message)
        setTimeout(() => {
          setLoader(false)
          setAlert(false)
          setEmaildata({ email: '' })
        }, 3000)
      })
    }
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center login-page">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7}>
            <Loader isLoader={loader} />
            <Alert isVisible={alert} message={alertMessage} />
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <h1 className="cardTitle">Forget password</h1>
                  <p className="text-medium-emphasis">Enter your email </p>
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
                          value={emaildata.email}
                          name="email"
                        />
                      </CInputGroup>
                    </CCol>
                    <CCol xs={12} style={{ textAlign: 'right' }}>
                      <CButton type="submit" style={{ backgroundColor: '#227081 ' }} className="border-darkGreen">
                        Submit
                      </CButton>
                    </CCol>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard style={{ width: '44%', backgroundColor: '#227081' }}>
                <CCardBody className="text-center" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div>
                    <h2 className='text-white'>Lorem ipsum</h2>
                    <p className='text-offWhite'>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                      tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                    <Link to="/">
                      <CButton color="primary" className="mt-3 bg-white border-white text-darkGreen font-bold" active tabIndex={-1}>
                        Login Now!
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
