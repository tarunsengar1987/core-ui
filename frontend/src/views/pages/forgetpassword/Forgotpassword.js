import React, { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
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

export default function Forgotpassword() {
  const [validated, setValidated] = useState(false)
  const [loader, setLoader] = useState(false)
  const [resetPasswordata, setResetPasswordata] = useState({ password: '', confirmpassword: '' })
  const [alert, setAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  let { id } = useParams()

  const handleChange = (event) => {
    if(event.target.name === 'confirmpassword'){
      if(resetPasswordata.password !== event.target.value ){
        setError('Password and confirm password are not match')
      }else{
        const { name, value } = event.target
        setResetPasswordata({
          ...resetPasswordata,
          [name]: value,
        })
      }
    }
    const { name, value } = event.target
      setResetPasswordata({
        ...resetPasswordata,
        [name]: value,
      })
  
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (resetPasswordata.password === '' || resetPasswordata.password !== resetPasswordata.confirmpassword) {
      const form = event.currentTarget
      if (form.checkValidity() === false) {
        event.preventDefault()
        event.stopPropagation()
      }
      setValidated(true)
    } else {
      event.preventDefault()
      axios
        .put(`${process.env.REACT_APP_API_URL}/forgetpassword/` + id, {
          password: resetPasswordata.password,
        })
        .then((res) => {
          setLoader(true)
          setAlert(true)
          setAlertMessage(res.data.message)
          setTimeout(() => {
            setLoader(false)
            setAlert(false)
            setResetPasswordata({ password: '' })
            navigate('/')
          }, 3000)
        })
    }
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center login-page">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={5}>
            <Loader isLoader={loader} />
            <Alert isVisible={alert} message={alertMessage} />
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <h1 className="cardTitle mb-4">Reset password</h1>
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
                          type="password"
                          aria-describedby="validationCustom03Feedback"
                          feedbackInvalid="Please provide a valid password."
                          id="validationCustom03"
                          required
                          placeholder="Password"
                          onChange={handleChange}
                          value={resetPasswordata.password}
                          name="password"
                        />
                      </CInputGroup>
                    </CCol>
                    <CCol xs={12}>
                      <CInputGroup className="has-validation">
                        <CInputGroupText>
                          <CIcon icon={cilUser} />
                        </CInputGroupText>
                        <CFormInput
                          type="password"
                          aria-describedby="validationCustom03Feedback"
                          feedbackInvalid="Please provide a valid confirmpassword."
                          id="validationCustom03"
                          required
                          placeholder="Confirmpassword"
                          onChange={handleChange}
                          value={resetPasswordata.confirmpassword}
                          name="confirmpassword"
                        />
                      </CInputGroup>
                    </CCol>
                    {resetPasswordata.password === resetPasswordata.confirmpassword ? <></>  :<div className='errorMsg'>{error}</div>}
                   
                    <CCol xs={12} style={{ textAlign: 'right' }}>
                      <CButton
                        type="submit"
                        style={{ backgroundColor: '#227081 ' }}
                        className="border-darkGreen"
                      >
                        Submit
                      </CButton>
                    </CCol>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}
