import React from 'react'
import { AppHeader, AppSidebar } from 'src/components'
import {
  CAccordion,
  CButton,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
} from '@coreui/react'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import Alert from '../alert/Alert'
import Loader from '../loader/Loader'
import '../../../scss/_custom.scss'

const Profile = () => {
  const [oldPassword, setOldPassword] = useState('')
  const [changePassword, setChangePassword] = useState({ new_password: '', c_password: '' })
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState(false)
  const [validated, setValidated] = useState(false)
  const [userData, setUserData] = useState()
  const [alert, setAlert] = useState(false)
  const [loader, setLoader] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('userData'))
    setUserData(data)
  }, [])

  const handleChangeOldPassword = (event) => {
    setOldPassword(event.target.value)
  }
  const handleChange = (event) => {
    const { name, value } = event.target

    setChangePassword({
      ...changePassword,
      [name]: value,
    })
    setError(false)
    if (event.target.name === 'c_password') {
      if (changePassword.new_password !== event.target.value) {
        setError(true)
        setErrorMessage('Please Enter Valid confirm Password')
      } else {
        setError(false)
        const { name, value } = event.target
        setChangePassword({
          ...changePassword,
          [name]: value,
        })
      }
    }
  }
  const handleSubmit = (event) => {
    if (
      oldPassword === '' ||
      changePassword.new_password === '' ||
      changePassword.c_password === ''
    ) {
      const form = event.currentTarget
      if (form.checkValidity() === false) {
        event.preventDefault()
        event.stopPropagation()
      }
      setValidated(true)
    } else {
      if (userData.password == oldPassword) {
        if (changePassword.new_password == changePassword.c_password) {
          try {
            axios
              .put(`${process.env.REACT_APP_API_URL}/forgetpassword/` + userData.id, {
                password: changePassword.new_password,
              })
              .then((res) => {
                setLoader(true)
                setTimeout(() => {
                  setLoader(false)
                  setAlert(true)
                  setAlertMessage('Password Update Successfully')
                }, 2000)
                setTimeout(() => {
                  setAlert(false)
                }, 3000)
              })
              .catch((error) => {
                setLoader(true)
                setTimeout(() => {
                  setLoader(false)
                  setAlert(true)
                  setAlertMessage(error.response.data.message)
                }, 2000)
                setTimeout(() => {
                  setAlert(false)
                }, 3000)
              })
          } catch {
            console.log("can't get data from server please try again ")
          }
        } else {
          setErrorMessage('Please Enter Valid confirm Password')
        }
      } else {
        event.preventDefault()
        // setError(true)
        setLoader(true)
        setTimeout(() => {
          setAlert(true)
          setAlertMessage('old password wrong ')
          setLoader(false)
        }, 2000)
        setTimeout(() => {
          setAlert(false)
        }, 4000)
        setErrorMessage('Please Enter Valid Old Password')
      }
    }
  }
  return (
    <div>
      <AppSidebar />
      <Loader isLoader={loader} />
      <Alert isVisible={alert} message={alertMessage} />

      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
        <h5 className="text-center my-4">Change Password</h5>
        <CForm
          className="needs-validation password-form bg-white rounded"
          //   noValidate
          validated={validated}
          onSubmit={handleSubmit}
        >
          <CCol>
            <CInputGroup className="has-validation">
              <CInputGroupText>Old Password</CInputGroupText>
              <CFormInput
                type="text"
                aria-describedby="validationCustom03Feedback"
                feedbackInvalid="Please provide a valid Username."
                id="validationCustom03"
                placeholder="Please Ender Old Password"
                onChange={handleChangeOldPassword}
                // value={settingData?.smtp}
                name="old_password"
              />
            </CInputGroup>
            {error == true ? <div className="errorMsg">{errorMessage}</div> : ''}
          </CCol>
          <CCol>
            <CInputGroup className="has-validation">
              <CInputGroupText>New Password</CInputGroupText>
              <CFormInput
                type="text"
                aria-describedby="validationCustom03Feedback"
                feedbackInvalid="Please provide a valid Username."
                id="validationCustom03"
                placeholder="Please Ender New Password"
                onChange={handleChange}
                // value={settingData?.smtp}
                name="new_password"
              />
            </CInputGroup>
          </CCol>
          <CCol>
            <CInputGroup className="has-validation">
              <CInputGroupText>Confirm Password</CInputGroupText>
              <CFormInput
                type="text"
                aria-describedby="validationCustom03Feedback"
                feedbackInvalid="Please provide a valid Username."
                id="validationCustom03"
                placeholder="Please Ender Confirm  Password"
                onChange={handleChange}
                // value={settingData?.smtp}
                name="c_password"
              />
            </CInputGroup>
          </CCol>
          <CCol className="text-center">
            <CButton className="bg-darkGreen border-darkGreen" type="submit">
              Change Password
            </CButton>
          </CCol>
        </CForm>
      </div>
    </div>
  )
}

export default Profile
