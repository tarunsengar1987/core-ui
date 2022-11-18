import { cilDelete, cilPencil, cilUser } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import {
  CAccordion,
  CAccordionBody,
  CAccordionHeader,
  CAccordionItem,
  CButton,
  CCol,
  CForm,
  CFormInput,
  CFormSwitch,
  CInputGroup,
  CInputGroupText,
  CModal,
  CModalBody,
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
import 'bootstrap/dist/css/bootstrap.min.css'
import 'datatables.net-dt/css/jquery.dataTables.min.css'
import ReactAudioPlayer from 'react-audio-player'
import ReactPlayer from 'react-player'
import Loader from '../loader/Loader'

export default function Classes({ classdata, tutorialData, setAlertMessage, setAlert }) {
  const [visible, setVisible] = useState(false)
  const [visibleLesson, setVisibleLesson] = useState(false)
  const [loader, setLoader] = useState(false)
  const [classData, setClassData] = useState([])
  console.log('classData: ', classData)
  const [lessonData, setLessonData] = useState([])
  const [classId, setClassId] = useState()
  const [toggle, setToggle] = useState(false)
  const [validated, setValidated] = useState(false)
  const [validatedLesson, setValidatedLesson] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [isEditLesson, setIsEditLesson] = useState(false)
  const [classesData, setClassesData] = useState({ name: '', descriptions: '', status: '' })
  const [lessonFormData, setLessonFormData] = useState({
    name: '',
    order: '',
  })
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
  const currentRecords = userData.slice(indexOfFirstRecord, indexOfLastRecord)
  const nPages = Math.ceil(userData.length / recordsPerPage)
  const tutorialId = tutorialData?.id
  const [user, setUser] = useState({})
  const [fileData, setFileData] = useState({})
  const [playingIndex, setPlayingIndex] = useState(0)
  const [audioOnPuase, setAudioOnPuase] = useState([0])
  useEffect(() => {
    setClassData(classdata)
    getClasses()
    const data = JSON.parse(localStorage.getItem('userData'))
    setUser(data)
  }, [])

  useEffect(() => {
    getLessons()
  }, [classId])

  const getLessons = () => {
    axios.get(`${process.env.REACT_APP_API_URL}/lesson/` + classId).then((res) => {
      const numAscending = [...res.data].sort((a, b) => JSON.parse(a.order) - JSON.parse(b.order))
      setLessonData(numAscending)
    })
  }

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

  const getClasses = () => {
    axios.get(`${process.env.REACT_APP_API_URL}/class/` + tutorialId).then((res) => {
      setClassData(res.data)
    })
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setClassesData({
      ...classesData,
      [name]: value,
    })
  }

  const handleChangeLesson = (event) => {
    if (event.target.name === 'audio') {
      setFileData(event.target?.files[0])
    } else {
      const { name, value } = event.target
      setLessonFormData({
        ...lessonFormData,
        [name]: value,
      })
    }
  }

  const handleSwitch = (e) => {
    console.log('eeeee true', e.target.name)
    const { name, checked } = e.target
    setClassesData({ ...classesData, [name]: checked })
  }

  const handleSwitchLesson = (e) => {
    const { name, checked } = e.target
    setLessonFormData({ ...lessonFormData, [name]: checked })
  }

  const handleClose = () => {
    setVisible(false)
    setValidated(false)
    setClassesData({})
    setIsEdit(false)
  }

  const handleCloseLesson = () => {
    setVisibleLesson(false)
    setValidatedLesson(false)
    setLessonFormData({})
    setIsEditLesson(false)
  }

  const handleDelete = (data) => {
    axios.delete(`${process.env.REACT_APP_API_URL}/class/` + data.id).then((res) => {
      setLoader(true)
      getClasses()
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

  const handleDeleteLesson = (data) => {
    axios.delete(`${process.env.REACT_APP_API_URL}/lesson/` + data.id).then((res) => {
      getLessons()
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
    setClassesData(data)
  }

  const handleEditLesson = (data) => {
    setIsEditLesson(true)
    setLessonFormData(data)
  }

  const handleSubmitLesson = (event) => {
    if (
      Object.values(lessonFormData).length === 0 ||
      lessonFormData.name === '' ||
      lessonFormData.order === ''
    ) {
      setValidatedLesson(true)
      event.preventDefault()
    } else {
      event.preventDefault()
      const data = new FormData()
      data.append('name', lessonFormData.name)
      data.append('audio', fileData)
      data.append('order', lessonFormData.order)
      data.append('status', (lessonFormData.status = 'active'))
      data.append('class_id', (lessonFormData.class_id = classId))

      axios.post(`${process.env.REACT_APP_API_URL}/lesson`, data).then((res) => {
        setLoader(true)
        setVisibleLesson(false)
        getLessons()
        setLessonFormData({})
        setTimeout(() => {
          setLoader(false)
          setAlert(true)
          setAlertMessage('Successfully Added')
        }, 2000)
        setTimeout(() => {
          setAlert(false)
        }, 4000)
      })
    }
  }

  const handleSubmit = (event) => {
    if (isEdit) {
      event.preventDefault()
      if (
        Object.values(classesData).length === 0 ||
        classesData.name === '' ||
        classesData.descriptions === '' ||
        classesData.status === ''
      ) {
        setValidated(true)
      } else {
        event.preventDefault()
        console.log('classesData', classesData)
        if (!classesData.status) {
          classesData.status = 'inactive'
        } else {
          classesData.status = 'active'
        }
        axios
          .put(`${process.env.REACT_APP_API_URL}/class/` + classesData.id, classesData)
          .then((res) => {
            setLoader(true)
            setIsEdit(false)
            getClasses()
            setClassesData({})
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
    } else {
      if (
        Object.values(classesData).length === 0 ||
        classesData.name === '' ||
        classesData.descriptions === '' ||
        classesData.status === ''
      ) {
        setValidated(true)
        event.preventDefault()
      } else {
        event.preventDefault()
        classesData.status = 'active'
        classesData.tutorial_id = tutorialId
        axios.post(`${process.env.REACT_APP_API_URL}/class`, classesData).then((res) => {
          setVisible(false)
          setLoader(true)
          getClasses()
          setClassesData({})
          setTimeout(() => {
            setLoader(false)
            setAlertMessage('Successfully Added')
            setAlert(true)
          }, 2000)
          setTimeout(() => {
            setAlert(false)
          }, 4000)
        })
      }
      // }
    }
  }

  const handleAdd = () => {
    setClassesData({})
    setVisible(!visible)
    setIsEdit(false)
    setValidated(false)
  }

  const handleAddLesson = (id) => {
    setLessonFormData({})
    setVisibleLesson(!visible)
    setIsEditLesson(false)
    setValidatedLesson(false)
  }
  const handlePlayAudio = (index) => {
    if (playingIndex == index) {
      setPlayingIndex(index + 1)
      audioOnPuase.push(index + 1)
    }
  }


  return (
    <>
      <div className="dashboardPage__head">
        {/* <TutorialClassDetails isVisible={alert} message={alertMessage} /> */}
        <Loader isLoader={loader} />
        {user.role === '1' ? (
          <CButton
            onClick={() => handleAdd()}
            className="bg-darkGreen border-darkGreen"
            style={{ marginRight: 0, marginLeft: 'auto' }}
          >
            Add Class
          </CButton>
        ) : (
          ''
        )}

        <CModal alignment="center" visible={visible} onClose={() => handleClose()}>
          <CModalHeader>
            <CModalTitle>{isEdit ? 'Edit Class' : 'Create Class'}</CModalTitle>
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
                    value={classesData.name || ''}
                  />
                </CInputGroup>
              </CCol>
              <CCol md={12}>
                <CInputGroup className="has-validation">
                  <CInputGroupText>@</CInputGroupText>
                  <CFormInput
                    type="text"
                    aria-describedby="validationCustom03Feedback"
                    feedbackInvalid="Please provide a valid description."
                    id="validationCustom03"
                    name="descriptions"
                    placeholder="Description"
                    required
                    onChange={handleChange}
                    value={classesData.descriptions}
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
      <div>
        <CAccordion>
          {classData.length > 0
            ? classData.map((data, index) => (
                <CAccordionItem
                  className="tutorialDetailsCard"
                  onClick={() => {
                    setClassId(data.id)
                  }}
                  key={index}
                >
                  <CAccordionHeader onClick={() => setIsEdit(false)}>{data.name} </CAccordionHeader>
                  <CAccordionBody>
                    {isEdit ? (
                      <CForm
                        className="needs-validation"
                        noValidate
                        validated={validated}
                        onSubmit={handleSubmit}
                      >
                        <div className="tutorialDetailsList__item">
                          <span className="tutorialDetailsList__title">name:</span>
                          <CInputGroup className="has-validation">
                            <CFormInput
                              type="text"
                              aria-describedby="validationCustom03Feedback"
                              feedbackInvalid="Please provide a valid Username."
                              id="validationCustom03"
                              name="name"
                              required
                              placeholder="Name"
                              onChange={handleChange}
                              value={classesData.name || ''}
                            />
                          </CInputGroup>
                        </div>
                        <div className="tutorialDetailsList__item">
                          <span className="tutorialDetailsList__title">description:</span>
                          <CInputGroup className="has-validation">
                            <CFormInput
                              type="text"
                              aria-describedby="validationCustom03Feedback"
                              feedbackInvalid="Please provide a valid Email."
                              id="validationCustom03"
                              name="descriptions"
                              placeholder="Description"
                              required
                              onChange={handleChange}
                              value={classesData.descriptions}
                            />
                          </CInputGroup>
                        </div>
                        <div className="tutorialDetailsList__item">
                          <span className="tutorialDetailsList__title">status:</span>
                          <CInputGroup className="has-validation">
                            <CFormSwitch
                              className="backgroundswitch"
                              defaultChecked={data.status === 'active' ? true : false}
                              id="formSwitchCheckDefault"
                              onClick={(e) => handleSwitch(e)}
                              name="status"
                            />
                          </CInputGroup>
                        </div>

                        <div className="classFormBtn">
                          <CButton
                            color="primary"
                            type="submit"
                            className="bg-darkGreen border-darkGreen"
                          >
                            Save
                          </CButton>
                        </div>
                      </CForm>
                    ) : (
                      <>
                        <div className="tutorialDetailsList__item">
                          <span className="tutorialDetailsList__title">name:</span> {data.name}
                        </div>
                        <div className="tutorialDetailsList__item">
                          <span className="tutorialDetailsList__title">description:</span>{' '}
                          {data.descriptions}
                        </div>
                        <div className="tutorialDetailsList__item">
                          <span className="tutorialDetailsList__title">status:</span> {data.status}
                        </div>
                        {user?.role !== '2' ? (
                          <div className="actionIconBtn">
                            <span onClick={() => handleEdit(data)}>
                              <CIcon icon={cilPencil} />
                            </span>
                            <span onClick={() => handleDelete(data)}>
                              <CIcon icon={cilDelete} />
                            </span>
                          </div>
                        ) : (
                          ''
                        )}

                        {console.log}
                        {data.id === classId ? (
                          <CModal
                            alignment="center"
                            visible={visibleLesson}
                            onClose={() => handleCloseLesson()}
                          >
                            <CModalHeader>
                              <CModalTitle>Create Lesson</CModalTitle>
                            </CModalHeader>
                            <CModalBody>
                              <CForm
                                className="row g-3 needs-validation"
                                noValidate
                                validated={validatedLesson}
                                onSubmit={handleSubmitLesson}
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
                                      onChange={handleChangeLesson}
                                      value={lessonFormData.name || ''}
                                    />
                                  </CInputGroup>
                                </CCol>
                                <CCol md={12}>
                                  <CInputGroup className="has-validation">
                                    <CInputGroupText>@</CInputGroupText>
                                    <CFormInput
                                      type="number"
                                      aria-describedby="validationCustom03Feedback"
                                      feedbackInvalid="Please provide a valid description."
                                      id="validationCustom03"
                                      name="order"
                                      placeholder="Order"
                                      required
                                      onChange={handleChangeLesson}
                                      value={lessonFormData.order || ''}
                                    />
                                  </CInputGroup>
                                </CCol>
                                <input
                                  id="contained-button-file"
                                  type="file"
                                  onChange={handleChangeLesson}
                                  value={lessonFormData.audio}
                                  name="audio"
                                />
                                <CCol xs={12}>
                                  <CButton className="bg-darkGreen border-darkGreen" type="submit">
                                    Save lesson
                                  </CButton>
                                </CCol>
                              </CForm>
                            </CModalBody>
                          </CModal>
                        ) : (
                          ''
                        )}
                        {user?.role !== '2' ? (
                          <div className="lassonList-head">
                            <CButton
                              onClick={() => {
                                handleAddLesson(data.id)
                              }}
                              className="bg-darkGreen border-darkGreen"
                              style={{ marginRight: 0, marginLeft: 'auto' }}
                            >
                              Add Lesson
                            </CButton>
                          </div>
                        ) : (
                          ''
                        )}
                        <div className="lassonList">
                          {/* {console.log('lessonDatalessonData', lessonData)}
                      {data.id === classId
                        ? 
                        : ''} */}
                          {/* {console.log('lessonData', lessonData)} */}
                          {data.id === classId && (
                            <CTable>
                              <CTableHead>
                                <CTableRow color="dark">
                                  {lessonData.length > 0 ? (
                                    <>
                                      <CTableHeaderCell scope="col">Order No.</CTableHeaderCell>
                                      <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                                      <CTableHeaderCell scope="col">Audio</CTableHeaderCell>
                                      {user?.role !== '2' ? (
                                        <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
                                      ) : (
                                        ''
                                      )}
                                    </>
                                  ) : (
                                    ''
                                  )}
                                </CTableRow>
                              </CTableHead>
                              {/* <CTableBody>
                                {console.log('lessonData', lessonData)}
                                {lessonData.length > 0
                                  ? lessonData.map((item) => {
                                      return (
                                        <CTableRow>
                                          <>
                                            <CTableDataCell>
                                              <div className="tutorialDetailsList__item">
                                                {item.order}
                                              </div>
                                            </CTableDataCell>
                                            <CTableDataCell>
                                              <div className="tutorialDetailsList__item">
                                                {item.name}
                                              </div>
                                            </CTableDataCell>
                                            <CTableDataCell>
                                              <div className="tutorialDetailsList__item">
                                                <ReactPlayer
                                                  url={item?.audio_url}
                                                  width="400px"
                                                  height="30px"
                                                  playing={false}
                                                  controls={true}
                                                />
                                              </div>
                                            </CTableDataCell>
                                            {user?.role !== '2' ? (
                                              <CTableDataCell style={{ position: 'relative' }}>
                                                <div className="actionIconBtn">
                                                  <span onClick={() => handleDeleteLesson(item)}>
                                                    <CIcon icon={cilDelete} />
                                                  </span>
                                                </div>
                                              </CTableDataCell>
                                            ) : (
                                              ''
                                            )}
                                          </>
                                        </CTableRow>
                                      )
                                    })
                                  : 'Lessons not found'}
                              </CTableBody> */}

                              <CTableBody>
                                {console.log('lessonData', lessonData)}
                                {lessonData.length > 0
                                  ? lessonData.map((item, index) => {
                                      return (
                                        <CTableRow>
                                          <>
                                            <CTableDataCell>
                                              <div className="tutorialDetailsList__item">
                                                {item.order}
                                              </div>
                                            </CTableDataCell>
                                            <CTableDataCell>
                                              <div className="tutorialDetailsList__item">
                                                {item.name}
                                              </div>
                                            </CTableDataCell>
                                            <CTableDataCell>
                                              <div className="tutorialDetailsList__item">
                                                <ReactPlayer
                                                  url={item?.audio_url}
                                                  width="400px"
                                                  height="30px"
                                                  playing={false}
                                                  controls={true}
                                                  // style={index == playingIndex ?"":{ pointerEvents: 'none' }}
                                                  style={
                                                    index == playingIndex ||
                                                    audioOnPuase.includes(index) ||
                                                    user.role == '1'
                                                      ? ''
                                                      : { pointerEvents: 'none' }
                                                  }
                                                  onPlay={() => handlePlayAudio(index)}
                                                />
                                              </div>
                                            </CTableDataCell>
                                            {user?.role !== '2' ? (
                                              <CTableDataCell style={{ position: 'relative' }}>
                                                <div className="actionIconBtn">
                                                  <span onClick={() => handleDeleteLesson(item)}>
                                                    <CIcon icon={cilDelete} />
                                                  </span>
                                                </div>
                                              </CTableDataCell>
                                            ) : (
                                              ''
                                            )}
                                          </>
                                        </CTableRow>
                                      )
                                    })
                                  : 'Lessons not found'}
                              </CTableBody>
                            </CTable>
                          )}
                        </div>
                      </>
                    )}
                  </CAccordionBody>
                </CAccordionItem>
              ))
            : 'Classes Not Found'}
        </CAccordion>
      </div>
    </>
  )
}