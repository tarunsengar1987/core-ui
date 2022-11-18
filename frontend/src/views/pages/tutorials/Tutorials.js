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
  CButton,
  CCol,
  CForm,
  CFormInput,
  CFormSwitch,
  CInputGroup,
  CInputGroupText,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { AppSidebar, AppFooter, AppHeader } from '../../../components/index'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'datatables.net-dt/css/jquery.dataTables.min.css'
import Pagination from '../pagination/Pagination'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'
import Alert from '../alert/Alert'
import Loader from '../loader/Loader'

export default function Tutorials() {
  const [visible, setVisible] = useState(false)
  const [loader, setLoader] = useState(false)
  const [toggle, setToggle] = useState(false)
  const [validated, setValidated] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [tutorialsData, setTutorialsData] = useState({ name: '', descriptions: '', status: '' })
  const [userData, setUserData] = useState([])
  const [filteredResults, setFilteredResults] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [recordsPerPage] = useState(10)
  const [isFilter, setIsFilter] = useState(false)
  const [assending, setAssending] = useState(false)
  const [sortValue, setSortValue] = useState('')
  const indexOfLastRecord = currentPage * recordsPerPage
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage
  const navigate = useNavigate()
  const currentRecords = userData.slice(indexOfFirstRecord, indexOfLastRecord)
  const nPages = Math.ceil(userData.length / recordsPerPage)
  const [user, setUser] = useState({})
  const [deletePopup, setDeletePopup] = useState(false)
  const [alert, setAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  const [modalPopup, setModalPopup] = useState('')
  const [deleteData, setDeleteData] = useState()
  useEffect(() => {
    getTutorials()
    const data = JSON.parse(localStorage.getItem('userData'))
    setUser(data)
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

  const getTutorials = () => {
    axios.get(`${process.env.REACT_APP_API_URL}/tutorials`).then((res) => {
      setLoader(true)
      setTimeout(() => {
        setLoader(false)
      }, 2000)
      setUserData(res.data)
      setFilteredResults(res.data)
    })
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setTutorialsData({
      ...tutorialsData,
      [name]: value,
    })
  }

  const handleBlockUser = (data) => {
    if (data.status === 'active') {
      setToggle(true)
      axios
        .put(`${process.env.REACT_APP_API_URL}/tutorial/` + data.id, {
          status: 'inactive',
        })
        .then((res) => {
          setLoader(true)
          getTutorials()
          setTimeout(() => {
            setLoader(false)
            setAlert(true)
            setAlertMessage('Totorial is inactived')
          }, 2000)
          setTimeout(() => {
            setAlert(false)
          }, 4000)
        })
    } else {
      setToggle(false)
      axios
        .put(`${process.env.REACT_APP_API_URL}/tutorial/` + data.id, {
          status: 'active',
        })
        .then((res) => {
          setLoader(true)
          setTimeout(() => {
            setLoader(false)
            setAlert(true)
            setAlertMessage('Totorial is actived')
          }, 2000)
          getTutorials()
          setTimeout(() => {
            setAlert(false)
          }, 4000)
        })
    }
  }

  const handleClose = () => {
    setVisible(false)
    setValidated(false)
    setTutorialsData({})
    setIsEdit(false)
  }

  const handleDelete = () => {
    axios.delete(`${process.env.REACT_APP_API_URL}/tutorial/` + deleteData).then((res) => {
      setDeletePopup(false)
      getTutorials()
      setLoader(true)
      setTimeout(() => {
        setLoader(false)
        setAlert(true)
        setAlertMessage('Successfully Deleted')
      }, 2000)
      setTimeout(() => {
        setAlert(false)
      }, 4000)
    })
  }

  const handleEdit = (data) => {
    setIsEdit(true)
    setVisible(!visible)
    setTutorialsData(data)
    handleSubmit()
  }

  const handleSubmit = (event) => {
    if (isEdit) {
      event.preventDefault()
      if (
        Object.values(tutorialsData).length === 0 ||
        tutorialsData.name === '' ||
        tutorialsData.descriptions === ''
      ) {
        setValidated(true)
      } else {
        axios
          .put(`${process.env.REACT_APP_API_URL}/tutorial/` + tutorialsData.id, tutorialsData)
          .then((res) => {
            setLoader(true)
            setVisible(false)
            getTutorials()
            setTutorialsData({})
            setTimeout(() => {
              setLoader(false)
              setAlert(true)
              setAlertMessage('Successfully Updated')
            }, 2000)
            setTimeout(() => {
              setAlert(false)
            }, 4000)
          })
      }
      // }
    } else {
      event.preventDefault()
      if (
        Object.values(tutorialsData).length === 0 ||
        tutorialsData.name === '' ||
        tutorialsData.descriptions === ''
      ) {
        setValidated(true)
      } else {
        setLoader(true)
        tutorialsData.status = 'active'
        axios.post(`${process.env.REACT_APP_API_URL}/tutorial/`, tutorialsData).then((res) => {
          setVisible(false)
          getTutorials()
          setTutorialsData({})
          setTimeout(() => {
            setLoader(false)
          }, 2000)
          setTimeout(() => {
            setAlert(true)
            setAlertMessage('Successfully Add')
          }, 2000)
          setTimeout(() => {
            setAlert(false)
          }, 4000)
        })
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

  const handleSearchItems = (searchValue) => {
    setIsFilter(true)
    if (searchValue !== '') {
      const filteredData = userData
        .slice(indexOfFirstRecord, indexOfLastRecord)
        .filter(
          (item) =>
            item.name.toLowerCase().includes(searchValue.toLowerCase()) ||
            item.descriptions.toLowerCase().includes(searchValue.toLowerCase()) ||
            item.status.toLowerCase().includes(searchValue.toLowerCase()),
        )
      setFilteredResults(filteredData)
    } else {
      setFilteredResults(currentRecords)
    }
  }

  const handleView = (data) => {
    axios.get(`${process.env.REACT_APP_API_URL}/class/` + data.id).then((res) => {
      navigate('/tutorial/tutorial-details', {
        state: { classdata: res.data, tutorialData: data },
      })
    })
  }

  const checkClsses = (id) => {
    axios.get(`${process.env.REACT_APP_API_URL}/class/` + id).then((res) => {
      if (res.data.length > 0) {
        setDeletePopup(true)
        setModalPopup(
          'This tutorial is assosicated with classes ! Are you sure want to delete this ? ',
        )
        set
      } else {
        setDeletePopup(true)
        setModalPopup('Are you sure want to delete this tutorial ?')
      }
    })
  }

  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
        <Loader isLoader={loader} />
        <Alert isVisible={alert} message={alertMessage} />
        <div className="dashboardPage__inner">
          <div className="dashboardPage__head">
            <h1 className="dashboardPage__title">Tutorial List</h1>
            <div>
              {user?.role === '1' ? (
                <CButton
                  className="bg-darkGreen border-darkGreen"
                  onClick={() => setVisible(!visible)}
                >
                  Add Tutorial
                </CButton>
              ) : (
                ''
              )}
              <CModal alignment="center" visible={visible} onClose={() => handleClose()}>
                <CModalHeader>
                  <CModalTitle>{isEdit ? 'Edit Tutorial' : 'Create Tutorial'}</CModalTitle>
                </CModalHeader>
                <CModalBody>
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
                          feedbackInvalid="Please provide a valid name."
                          id="validationCustom03"
                          name="name"
                          required
                          placeholder="Name"
                          onChange={handleChange}
                          value={tutorialsData.name || ''}
                        />
                      </CInputGroup>
                    </CCol>
                    <CCol md={12}>
                      <CInputGroup className="has-validation">
                        <CInputGroupText>@</CInputGroupText>
                        <CFormInput
                          type="text"
                          aria-describedby="validationCustom03Feedback"
                          feedbackInvalid="Please provide a valid Description."
                          id="validationCustom03"
                          name="descriptions"
                          placeholder="Descriptions"
                          required
                          onChange={handleChange}
                          value={tutorialsData.descriptions || ''}
                        />
                      </CInputGroup>
                    </CCol>
                    {/* {!isEdit? <CCol md={12}>
                      <span className="tutorialDetailsList__title">status:</span>
                      <CFormSwitch
                        className="backgroundswitch"
                        name="status"
                        defaultChecked={true}
                        id="formSwitchCheckDefault"
                        // onClick={(e) => handleBlockUser(e)}
                      />
                    </CCol> : "" } */}

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
                  Name
                  <CIcon
                    icon={assending ? cilArrowTop : cilArrowBottom}
                    onClick={() => handleSort('name')}
                  />
                </CTableHeaderCell>
                {/* <CTableHeaderCell scope="col">
                  Descriptions
                  <CIcon
                    icon={assending ? cilArrowTop : cilArrowBottom}
                    onClick={() => handleSort('descriptions')}
                  />
                </CTableHeaderCell> */}
                <CTableHeaderCell scope="col">
                  Status
                  <CIcon
                    icon={assending ? cilArrowTop : cilArrowBottom}
                    onClick={() => handleSort('status')}
                  />
                </CTableHeaderCell>
                {user.role !== '2' ? (
                  <CTableHeaderCell scope="col">Active/Inactive</CTableHeaderCell>
                ) : (
                  ''
                )}
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
                <CTableHeaderCell scope="col">View Classes</CTableHeaderCell>
                {user.role === '1' ? <CTableHeaderCell scope="col">Actions</CTableHeaderCell> : ''}
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {isFilter
                ? filteredResults.map((data,index) => (
                    <React.Fragment key={index}>
                      <CTableRow>
                        <CTableDataCell>{data.name}</CTableDataCell>
                        {/* <CTableDataCell>{data.descriptions}</CTableDataCell> */}
                        <CTableDataCell>{data.status}</CTableDataCell>

                        <>
                          {user.role === '1' ? (
                            <CTableDataCell>
                              <CFormSwitch
                                className="backgroundswitch"
                                defaultChecked={data.status === 'active' ? true : false}
                                id="formSwitchCheckDefault"
                                onClick={() => handleBlockUser(data)}
                              />
                            </CTableDataCell>
                          ) : (
                            ''
                          )}
                        </>

                        <CTableDataCell>
                          {moment(data?.createdAt).format('MM/DD/YYYY')}
                        </CTableDataCell>
                        <CTableDataCell>
                          {moment(data?.updatedAt).format('MM/DD/YYYY')}
                        </CTableDataCell>
                        <CTableDataCell>
                          <div className="actionIconBtn">
                            <span onClick={() => handleView(data)}>
                              <CIcon icon={cilViewColumn} />
                            </span>
                          </div>
                        </CTableDataCell>

                        {user.role === '1' ? (
                          <CTableDataCell>
                            <div className="actionIconBtn">
                              <span
                                onClick={() => {
                                    setDeleteData(data.id)
                                    checkClsses(data.id)
                                  //  setDeletePopup(!deletePopup)
                                }}
                              >
                                <CIcon icon={cilDelete} />
                              </span>

                              <span onClick={() => handleEdit(data)}>
                                <CIcon icon={cilPencil} />
                              </span>
                            </div>
                          </CTableDataCell>
                        ) : (
                          ''
                        )}
                      </CTableRow>
                    </React.Fragment>
                  ))
                : currentRecords.map((data,index) => (
                    <React.Fragment key={index}>
                      <CTableRow>
                        <CTableDataCell>{data.name}</CTableDataCell>
                        {/* <CTableDataCell>{data.descriptions}</CTableDataCell> */}
                        <CTableDataCell>{data.status}</CTableDataCell>
                        {user.role === '1' ? (
                          <CTableDataCell>
                            <CFormSwitch
                              className="backgroundswitch"
                              defaultChecked={data.status === 'active' ? true : false}
                              id="formSwitchCheckDefault"
                              onClick={() => handleBlockUser(data)}
                            />
                          </CTableDataCell>
                        ) : (
                          ''
                        )}

                        <CTableDataCell>
                          {moment(data?.createdAt).format('MM/DD/YYYY')}
                        </CTableDataCell>
                        <CTableDataCell>
                          {moment(data?.updatedAt).format('MM/DD/YYYY')}
                        </CTableDataCell>
                        <CTableDataCell>
                          <div className="actionIconBtn">
                            <span onClick={() => handleView(data)}>
                              <CIcon icon={cilViewColumn} />
                            </span>
                          </div>
                        </CTableDataCell>

                        {user.role === '1' ? (
                          <CTableDataCell>
                            <>
                              <div className="actionIconBtn">
                                <span
                                  onClick={() => {
                                    setDeleteData(data.id)
                                    checkClsses(data.id)
                                  }}
                                >
                                  <CIcon icon={cilDelete} />
                                </span>
                                <span onClick={() => handleEdit(data)}>
                                  <CIcon icon={cilPencil} />
                                </span>
                              </div>
                            </>
                          </CTableDataCell>
                        ) : (
                          ''
                        )}
                      </CTableRow>
                    </React.Fragment>
                  ))}
            </CTableBody>
          </CTable>

          <CModal visible={deletePopup} onClose={() => setDeletePopup(false)}>
            <CModalBody>{modalPopup}</CModalBody>
            <CModalFooter>
              <CButton color="secondary" onClick={() => setDeletePopup(false)}>
                Close
              </CButton>
              <CButton color="primary" onClick={() => handleDelete()}>
                Delete
              </CButton>
            </CModalFooter>
          </CModal>
          <Pagination nPages={nPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
        </div>
      </div>
    </div>
  )
}
