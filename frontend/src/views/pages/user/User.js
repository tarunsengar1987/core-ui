import {
  cilArrowBottom,
  cilArrowTop,
  cilDelete,
  cilLockLocked,
  cilPencil,
  cilSearch,
  cilUser,
  cilViewColumn,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import {
  CAlert,
  CButton,
  CCol,
  CForm,
  CFormInput,
  CFormSwitch,
  CInputGroup,
  CInputGroupText,
  CLink,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CPopover,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CTooltip,
} from '@coreui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../../../components/index'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'datatables.net-dt/css/jquery.dataTables.min.css'
import Pagination from '../pagination/Pagination'
import moment from 'moment'
import Alert from '../alert/Alert'
import Loader from '../loader/Loader'
export default function User() {
  const [visible, setVisible] = useState(false)
  const [toggle, setToggle] = useState(false)
  const [validated, setValidated] = useState(false)
  const [deletePopup, setDeletePopup] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [registerData, setRegisterData] = useState({ username: '', email: '', password: '' })
  const [userData, setUserData] = useState([])
  const [filteredResults, setFilteredResults] = useState([])
  const [loader, setLoader] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [recordsPerPage] = useState(10)
  const [isFilter, setIsFilter] = useState(false)
  const [assending, setAssending] = useState(false)
  const [sortValue, setSortValue] = useState('')
  const [alert, setAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  const indexOfLastRecord = currentPage * recordsPerPage
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage

  const currentRecords = userData.slice(indexOfFirstRecord, indexOfLastRecord)
  const nPages = Math.ceil(userData.length / recordsPerPage)

  useEffect(() => {
    getUsers()
  }, [])

  useEffect(() => {
    if (currentPage > 1) {
      setIsFilter(false)
    } else {
      setIsFilter(false)
    }
  }, [currentPage])

  useEffect(() => {
    if (assending) {
      setFilteredResults(
        userData
          .slice(indexOfFirstRecord, indexOfLastRecord)
          .sort((a, b) => (a[sortValue] < b[sortValue] ? -1 : 1)),
      )
    } else {
      setFilteredResults(
        userData
          .slice(indexOfFirstRecord, indexOfLastRecord)
          .sort((a, b) => (a[sortValue] > b[sortValue] ? -1 : 1)),
      )
    }
  }, [assending])

  const getUsers = () => {
    axios.get(`${process.env.REACT_APP_API_URL}/users`).then((res) => {
      setUserData(res.data)
      setFilteredResults(res.data)
    })
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setRegisterData({
      ...registerData,
      [name]: value,
    })
  }

  const handleBlockUser = (data) => {
    if (data.status === 'active') {
      setToggle(true)
      axios
        .put(`${process.env.REACT_APP_API_URL}/user/` + data.id, {
          status: 'blocked',
        })
        .then((res) => {
          setDeletePopup(false)
          setLoader(true)
          getUsers()
          setTimeout(() => {
            setLoader(false)
            setAlert(true)
            setAlertMessage('User is blocked')
          }, 2000)
          setTimeout(() => {
            setAlert(false)
          }, 4000)
        })
    } else {
      setToggle(false)
      axios
        .put(`${process.env.REACT_APP_API_URL}/user/` + data.id, {
          status: 'active',
        })
        .then((res) => {
          setDeletePopup(false)
          setLoader(true)
          setTimeout(() => {
            setLoader(false)
            setAlert(true)
            setAlertMessage('User is Activated')
          }, 2000)
          getUsers()
          setTimeout(() => {
            setAlert(false)
          }, 4000)
        })
    }
  }

  const handleClose = () => {
    setVisible(false)
    setValidated(false)
    setRegisterData({})
    setIsEdit(false)
  }

  const handleDelete = (data) => {
    if (data.is_active) {
      setToggle(true)
      axios
        .put(`${process.env.REACT_APP_API_URL}/user/` + data.id, {
          is_active: false,
        })
        .then((res) => {
          setLoader(true)
          setDeletePopup(false)
          setTimeout(() => {
            setLoader(false)
            setAlert(true)
            setAlertMessage('Successfully Deleted')
          }, 2000)

          getUsers()
          setTimeout(() => {
            setAlert(false)
          }, 4000)
        })
    }
    // setVisible(false)
    // setValidated(false)
    // setRegisterData({})
  }

  const handleEdit = (data) => {
    setIsEdit(true)
    setVisible(!visible)
    setRegisterData(data)
    handleSubmit()
  }

  const handleSubmit = (event) => {
    if (isEdit) {
      event.preventDefault()
      if (
        Object.values(registerData).length === 0 ||
        registerData.username === '' ||
        registerData.password === '' ||
        registerData.email === ''
      ) {
        setValidated(true)
      } else {
        axios
          .put(`${process.env.REACT_APP_API_URL}/user/` + registerData.id, registerData)
          .then((res) => {
            setLoader(true)
            setTimeout(() => {
              setLoader(false)
              setAlert(true)
              setAlertMessage('Successfully Updated')
            }, 2000)
            setVisible(false)
            getUsers()
            setRegisterData({})
            setTimeout(() => {
              setAlert(false)
            }, 4000)
          })
      }
    } else {
      event.preventDefault()
      console.log('registerData.email', registerData.email)
      if (
        Object.values(registerData).length === 0 ||
        registerData.username === '' ||
        registerData.password === '' ||
        registerData.email === ''
      ) {
        setValidated(true)
      } else {
        console.log('validated', validated)

        if (!validated) {
          axios.post(`${process.env.REACT_APP_API_URL}/createuser`, registerData).then((res) => {
            setLoader(true)
            setTimeout(() => {
              setLoader(false)
              setAlert(true)
              setAlertMessage('Successfully Add')
            }, 2000)
            setVisible(false)
            getUsers()
            setRegisterData({})
            setTimeout(() => {
              setAlert(false)
            }, 4000)
          })
        }
      }
    }
  }

  const handleSort = (value) => {
    setIsFilter(true)
    setAssending(true)
    setSortValue(value)
    if (assending) setAssending(false)
    else setAssending(true)
  }

  const handleUserInvite = (data) => {
    if (data.status === 'Awaiting approval') {
      axios
        .put(`${process.env.REACT_APP_API_URL}/user/` + data.id, {
          status: 'active',
        })
        .then((res) => {
          setLoader(true)
          setTimeout(() => {
            setLoader(false)
            setAlert(true)
            setAlertMessage('User is active')
          }, 2000)
          getUsers()
          setTimeout(() => {
            setAlert(false)
          }, 4000)
        })
    } else {
      axios.post(`${process.env.REACT_APP_API_URL}/sendmail`, data).then((res) => {
        setLoader(true)
        setTimeout(() => {
          setLoader(false)
          setAlert(true)
          setAlertMessage('Invitation sended successfully')
        }, 2000)
        getUsers()
        setTimeout(() => {
          setAlert(false)
        }, 4000)
      })
    }
  }

  const handleSearchItems = (searchValue) => {
    setIsFilter(true)
    if (searchValue !== '') {
      const filteredData = userData
        .slice(indexOfFirstRecord, indexOfLastRecord)
        .filter(
          (item) =>
            item.username.toLowerCase().includes(searchValue.toLowerCase()) ||
            item.email.toLowerCase().includes(searchValue.toLowerCase()) ||
            item.status.toLowerCase().includes(searchValue.toLowerCase()),
        )
      setFilteredResults(filteredData)
    } else {
      setFilteredResults(currentRecords)
    }
  }

  return (
    <div>
      <AppSidebar />
      <Loader isLoader={loader} />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light dashboardPage">
        <div className="dashboardPage__root">
          <AppHeader />
          <Alert isVisible={alert} message={alertMessage} />

          <div className="dashboardPage__inner">
            <div className="dashboardPage__head">
              <h1 className="dashboardPage__title">Users List</h1>
              <div>
                <CButton
                  onClick={() => setVisible(!visible)}
                  className="bg-darkGreen border-darkGreen"
                >
                  Add User
                </CButton>
                <CModal alignment="center" visible={visible} onClose={() => handleClose()}>
                  <CModalHeader>
                    <CModalTitle>{isEdit ? 'Edit User' : 'Create user'}</CModalTitle>
                  </CModalHeader>
                  <CModalBody>
                    <CForm
                      className="row g-3 needs-validation"
                      // noValidate
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
                            placeholder="Name"
                            onChange={handleChange}
                            value={registerData.username}
                          />
                        </CInputGroup>
                      </CCol>
                      <CCol md={12}>
                        <CInputGroup className="has-validation">
                          <CInputGroupText>@</CInputGroupText>
                          <CFormInput
                            type="email"
                            aria-describedby="validationCustom03Feedback"
                            feedbackInvalid="Please provide a valid Email."
                            id="validationCustom03"
                            name="email"
                            placeholder="Email"
                            required
                            onChange={handleChange}
                            value={registerData.email || ''} 
                          />
                        </CInputGroup>
                      </CCol>
                      <CCol md={12}>
                        <CInputGroup className="has-validation">
                          <CInputGroupText>
                            <CIcon icon={cilLockLocked} />
                          </CInputGroupText>
                          <CFormInput
                            disabled={isEdit ? true : false}
                            type="password"
                            aria-describedby="validationCustom05Feedback"
                            feedbackInvalid="Please provide a valid Password."
                            id="validationCustom05"
                            name="password"
                            placeholder="Password"
                            required
                            onChange={handleChange}
                            value={registerData.password || ''}
                          />
                        </CInputGroup>
                      </CCol>
                      <CCol xs={12}>
                        <CButton className="bg-darkGreen border-darkGreen" type="submit">
                          Save
                        </CButton>
                      </CCol>
                    </CForm>
                  </CModalBody>
                </CModal>
              </div>
            </div>
            <CCol xs={12}>
              <CInputGroup className="has-validation">
                <CInputGroupText>
                  <CIcon icon={cilSearch} />
                </CInputGroupText>
                <CFormInput
                  type="text"
                  aria-describedby="validationCustom03Feedback"
                  feedbackInvalid="Please provide a valid email."
                  id="validationCustom03"
                  required
                  placeholder="Search"
                  onChange={(e) => handleSearchItems(e.target.value)}
                  name="email"
                />
              </CInputGroup>
            </CCol>
            <CTable>
              <CTableHead>
                <CTableRow color="dark">
                  <CTableHeaderCell scope="col">
                    Name{' '}
                    <CIcon
                      icon={assending ? cilArrowTop : cilArrowBottom}
                      onClick={() => handleSort('username')}
                    />
                  </CTableHeaderCell>
                  <CTableHeaderCell scope="col">
                    Email
                    <CIcon
                      icon={assending ? cilArrowTop : cilArrowBottom}
                      onClick={() => handleSort('email')}
                    />
                  </CTableHeaderCell>
                  <CTableHeaderCell scope="col">
                    Status
                    <CIcon
                      icon={assending ? cilArrowTop : cilArrowBottom}
                      onClick={() => handleSort('status')}
                    />
                  </CTableHeaderCell>
                  <CTableHeaderCell scope="col">Block/Unblock</CTableHeaderCell>
                  <CTableHeaderCell scope="col">
                    Created At
                    <CIcon
                      icon={assending ? cilArrowTop : cilArrowBottom}
                      onClick={() => handleSort('createdAt')}
                    />
                  </CTableHeaderCell>
                  <CTableHeaderCell scope="col">
                    Updated At
                    <CIcon
                      icon={assending ? cilArrowTop : cilArrowBottom}
                      onClick={() => handleSort('updatedAt')}
                    />
                  </CTableHeaderCell>

                  <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {isFilter
                  ? filteredResults.map((data) => (
                      <>
                        <CTableRow>
                          <CTableDataCell>{data.username}</CTableDataCell>
                          <CTableDataCell>{data.email}</CTableDataCell>
                          <CTableDataCell>{data.status}</CTableDataCell>
                          <CTableDataCell>
                            <CFormSwitch
                              className="backgroundswitch"
                              disabled={data.status === 'Invited' ? true : false}
                              defaultChecked={data.status === 'blocked' ? true : false}
                              id="formSwitchCheckDefault"
                              onClick={() => handleBlockUser(data)}
                            />
                          </CTableDataCell>
                          <CTableDataCell>
                            {moment(data?.createdAt).format('MM/DD/YYYY')}
                          </CTableDataCell>
                          <CTableDataCell>
                            {moment(data?.updatedAt).format('MM/DD/YYYY')}
                          </CTableDataCell>
                          <CTableDataCell>
                            <div className="actionIconBtn">
                              {/* <span onClick={() => setDeletePopup(!deletePopup)}>
                                  <CIcon icon={cilDelete} />
                                </span> */}
                              <span onClick={() => handleEdit(data)}>
                                <CIcon icon={cilPencil} />
                              </span>
                              {data.status === 'active' ? (
                                <></>
                              ) : (
                                <>
                                  {' '}
                                  <CButton
                                    onClick={() => handleUserInvite(data)}
                                    className="bg-darkGreen border-darkGreen"
                                  >
                                    {data.status === 'active' ? (
                                      <></>
                                    ) : (
                                      <>
                                        {data.status === 'Awaiting approval' ? 'Approve' : 'Invite'}
                                      </>
                                    )}
                                  </CButton>{' '}
                                </>
                              )}
                            </div>
                          </CTableDataCell>
                          {/* <CTableDataCell>Cell</CTableDataCell> */}
                        </CTableRow>
                        <CModal visible={deletePopup} onClose={() => setDeletePopup(false)}>
                          <CModalBody>Are you sure want to delete?</CModalBody>
                          <CModalFooter>
                            <CButton color="secondary" onClick={() => setDeletePopup(false)}>
                              Close
                            </CButton>
                            <CButton color="primary" onClick={() => handleDelete(data)}>
                              Delete
                            </CButton>
                          </CModalFooter>
                        </CModal>
                      </>
                    ))
                  : currentRecords.map((data) => (
                      <>
                        <CTableRow>
                          <CTableDataCell>{data.username}</CTableDataCell>
                          <CTableDataCell>{data.email}</CTableDataCell>
                          <CTableDataCell>{data.status}</CTableDataCell>
                          <CTableDataCell>
                            <CFormSwitch
                              className="backgroundswitch"
                              disabled={
                                data.status === 'Invited' || data.status === 'Awaiting approval'
                                  ? true
                                  : false
                              }
                              defaultChecked={data.status === 'blocked' ? true : false}
                              id="formSwitchCheckDefault"
                              onClick={() => handleBlockUser(data)}
                            />
                          </CTableDataCell>
                          <CTableDataCell>
                            {moment(data?.createdAt).format('MM/DD/YYYY')}
                          </CTableDataCell>
                          <CTableDataCell>
                            {moment(data?.updatedAt).format('MM/DD/YYYY')}
                          </CTableDataCell>

                          <CTableDataCell>
                            <div className="actionIconBtn">
                              {/* <span onClick={() => setDeletePopup(!deletePopup)}>
                                  <CIcon icon={cilDelete} />
                                </span> */}
                              <span onClick={() => handleEdit(data)}>
                                <CIcon icon={cilPencil} />
                              </span>
                              {data.status === 'active' ? (
                                <></>
                              ) : (
                                <>
                                  {' '}
                                  <CButton
                                    onClick={() => handleUserInvite(data)}
                                    className="bg-darkGreen border-darkGreen"
                                  >
                                    {data.status === 'active' ? (
                                      <></>
                                    ) : (
                                      <>
                                        {data.status === 'Awaiting approval' ? 'Approve' : 'Invite'}
                                      </>
                                    )}
                                  </CButton>{' '}
                                </>
                              )}
                            </div>
                          </CTableDataCell>
                        </CTableRow>
                        <CModal visible={deletePopup} onClose={() => setDeletePopup(false)}>
                          <CModalBody>Are you sure want to delete?</CModalBody>
                          <CModalFooter>
                            <CButton color="secondary" onClick={() => setDeletePopup(false)}>
                              Close
                            </CButton>
                            <CButton color="primary" onClick={() => handleDelete(data)}>
                              Delete
                            </CButton>
                          </CModalFooter>
                        </CModal>
                      </>
                    ))}
              </CTableBody>
            </CTable>
            <Pagination nPages={nPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
          </div>
        </div>
      </div>
    </div>
  )
}
