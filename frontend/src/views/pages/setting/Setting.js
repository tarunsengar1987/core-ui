import CIcon from '@coreui/icons-react'
import { CButton, CCol, CForm, CFormInput, CInputGroup, CInputGroupText } from '@coreui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../../../components/index'
import Alert from '../alert/Alert'

const Setting = () => {
  const [settingData, setSettingData] = useState({ smtp: '', username: '', port: '', password: '' })
  const [validated, setValidated] = useState(false)
  const [alert, setAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  const [settingApiData, setSettingApiData] = useState(false)

  useEffect(() => {
    getSetting()
  }, [])

  const getSetting = () => {
    axios.get(`${process.env.REACT_APP_API_URL}/setting`).then((res) => {
      setSettingData(res.data[0])
      if (res.data[0] == undefined) {
        setSettingApiData(true)
      }
    })
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setSettingData({
      ...settingData,
      [name]: value,
    })
  }
  console.log(settingData, 'setting')

  const handleSubmit = (event) => {
    event.preventDefault()
    if (
      Object.values(settingData).length === 0 ||
      settingData.username === '' ||
      settingData.password === '' ||
      settingData.port === '' ||
      settingData.smtp === ''
    ) {
      setValidated(true)
    } else {
      if (settingApiData == true) {
        axios
          .post(`${process.env.REACT_APP_API_URL}/setting`, settingData)
      } else {
        axios
          .put(`${process.env.REACT_APP_API_URL}/setting/` + settingData.id, settingData)
          .then((res) => {
            setAlertMessage('Successfully Updated')
            setAlert(true)
            getSetting()
            setTimeout(() => {
              setAlert(false)
            }, 3000)
          })
      }
    }
  }

  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <div className="dashboardPage__root">
          <AppHeader />
          <Alert isVisible={alert} message={alertMessage} />
          <div className="dashboardPage__inner">
            <div className="dashboardPage__head">
              <div>
                <CForm
                  className="row g-3 needs-validation"
                  noValidate
                  validated={validated}
                  onSubmit={handleSubmit}
                >
                  <CCol md={6}>
                    <CInputGroup className="has-validation">
                      <CInputGroupText>SMTP</CInputGroupText>
                      <CFormInput
                        type="text"
                        aria-describedby="validationCustom03Feedback"
                        feedbackInvalid="Please provide a valid Username."
                        id="validationCustom03"
                        placeholder="SMTP"
                        onChange={handleChange}
                        value={settingData?.smtp}
                        name="smtp"
                      />
                    </CInputGroup>
                  </CCol>
                  <CCol md={6}>
                    <CInputGroup className="has-validation">
                      <CInputGroupText>Username</CInputGroupText>
                      <CFormInput
                        type="taxt"
                        aria-describedby="validationCustom03Feedback"
                        feedbackInvalid="Please provide a valid Email."
                        id="validationCustom03"
                        placeholder="Username"
                        onChange={handleChange}
                        value={settingData?.username}
                        name="username"
                      />
                    </CInputGroup>
                  </CCol>
                  <CCol md={6}>
                    <CInputGroup className="has-validation">
                      <CInputGroupText>Port</CInputGroupText>
                      <CFormInput
                        type="text"
                        aria-describedby="validationCustom05Feedback"
                        feedbackInvalid="Please provide a valid Password."
                        id="validationCustom05"
                        placeholder="Port"
                        onChange={handleChange}
                        value={settingData?.port}
                        name="port"
                      />
                    </CInputGroup>
                  </CCol>
                  <CCol md={6}>
                    <CInputGroup className="has-validation">
                      <CInputGroupText>Password</CInputGroupText>
                      <CFormInput
                        type="password"
                        aria-describedby="validationCustom05Feedback"
                        feedbackInvalid="Please provide a valid Password."
                        id="validationCustom05"
                        placeholder="Password"
                        onChange={handleChange}
                        value={settingData?.password}
                        name="password"
                      />
                    </CInputGroup>
                  </CCol>
                  <CCol xs={6}>
                    <CButton className="bg-darkGreen border-darkGreen" type="submit">
                      Save
                    </CButton>
                  </CCol>
                </CForm>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Setting
